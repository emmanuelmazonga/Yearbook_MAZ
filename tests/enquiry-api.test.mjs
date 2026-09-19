import assert from 'node:assert/strict';
import test from 'node:test';

const handlerUrl=new URL('../lib/enquiry-handler.ts',import.meta.url);
handlerUrl.searchParams.set('enquiry-test',`${process.pid}-${Date.now()}`);
const {createEnquiryHandler}=await import(handlerUrl.href);
const valid={name:'John Banda',email:'john@example.com',phone:'+260 971 234 567',school:'Mukuba Secondary School',role:'Teacher',message:'We would like to discuss a digital yearbook for our graduating class.',consent:true,website:''};

function post(body,runtime={},options={}) {
  const handler=createEnquiryHandler({runtime,...options});
  return handler(new Request('https://yearbook.test/api/enquiry',{method:'POST',headers:{'content-type':'application/json','cf-connecting-ip':'203.0.113.42'},body:typeof body==='string'?body:JSON.stringify(body)}));
}

test('rejects invalid and oversized enquiries without exposing internals',async()=>{
  const invalid=await post({...valid,email:'not-an-email',consent:false});
  assert.equal(invalid.status,400);
  const invalidBody=await invalid.json();
  assert.equal(invalidBody.code,'VALIDATION_ERROR');
  assert.match(invalidBody.fields.email,/valid email/i);
  assert.match(invalidBody.fields.consent,/consent/i);

  const oversized=await post('x'.repeat(20_001));
  assert.equal(oversized.status,413);
  assert.equal((await oversized.json()).code,'REQUEST_TOO_LARGE');
});

test('silently accepts honeypot bots and keeps unconfigured delivery closed',async()=>{
  const bot=await post({...valid,website:'https://spam.example'});
  assert.equal(bot.status,200);
  assert.equal((await bot.json()).ok,true);

  const unavailable=await post(valid);
  assert.equal(unavailable.status,503);
  const body=await unavailable.json();
  assert.equal(body.code,'SERVICE_UNAVAILABLE');
  assert.doesNotMatch(JSON.stringify(body),/MAILJET_API_KEY|MAILJET_SECRET_KEY|stack|Error:/);
});

test('rate limits before delivering configured enquiries',async()=>{
  let delivered=false;
  const send=async(url)=>{
    if(String(url)==='https://api.mailjet.com/v3.1/send') { delivered=true; return Response.json({Messages:[{Status:'success'}]}); }
    throw new Error(`Unexpected URL: ${url}`);
  };
  const runtime={MAILJET_API_KEY:'server-only-test-key',MAILJET_SECRET_KEY:'server-only-test-secret',UPSTASH_REDIS_REST_URL:'https://redis.example',UPSTASH_REDIS_REST_TOKEN:'server-only-redis-token',ENQUIRY_TO_EMAIL:'owner@example.com',ENQUIRY_FROM_EMAIL:'enquiries@example.com',ENQUIRY_RATE_LIMIT_SALT:'test-salt-with-enough-entropy'};
  const response=await post(valid,runtime,{send,rateLimit:async()=>({allowed:false,remaining:0,retryAfter:600})});
  assert.equal(response.status,429);
  assert.equal(response.headers.get('x-ratelimit-remaining'),'0');
  assert.equal(delivered,false);
});

test('delivers through Mailjet with server-only credentials',async()=>{
  let request;
  const send=async(url,options)=>{ request={url:String(url),options}; return Response.json({Messages:[{Status:'success'}]}); };
  const runtime={MAILJET_API_KEY:'mailjet-key',MAILJET_SECRET_KEY:'mailjet-secret',UPSTASH_REDIS_REST_URL:'https://redis.example',UPSTASH_REDIS_REST_TOKEN:'redis-token',ENQUIRY_TO_EMAIL:'owner@example.com',ENQUIRY_FROM_EMAIL:'verified@example.com',ENQUIRY_RATE_LIMIT_SALT:'test-salt-with-enough-entropy'};
  const response=await post(valid,runtime,{send,rateLimit:async()=>({allowed:true,remaining:4,retryAfter:600}),randomUUID:()=> 'enquiry-reference'});
  assert.equal(response.status,200);
  assert.equal(request.url,'https://api.mailjet.com/v3.1/send');
  assert.equal(request.options.headers.Authorization,`Basic ${btoa('mailjet-key:mailjet-secret')}`);
  const payload=JSON.parse(request.options.body);
  assert.equal(payload.Messages[0].From.Email,'verified@example.com');
  assert.equal(payload.Messages[0].To[0].Email,'owner@example.com');
  assert.equal(payload.Messages[0].ReplyTo.Email,valid.email);
});
