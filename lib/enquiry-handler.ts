import {enquiryEmail,enquirySchema,fieldErrors,MAX_ENQUIRY_BYTES} from './enquiry.ts';
import {createUpstashRateLimiter,rateLimitKey,type EnquiryRateLimitChecker} from './enquiry-rate-limit.ts';

export type EnquiryEnvironment={
  MAILJET_API_KEY?:string;
  MAILJET_SECRET_KEY?:string;
  UPSTASH_REDIS_REST_URL?:string;
  UPSTASH_REDIS_REST_TOKEN?:string;
  ENQUIRY_TO_EMAIL?:string;
  ENQUIRY_FROM_EMAIL?:string;
  ENQUIRY_RATE_LIMIT_SALT?:string;
};

type EnquiryHandlerOptions={
  runtime:EnquiryEnvironment;
  send?:typeof fetch;
  rateLimit?:EnquiryRateLimitChecker;
  now?:()=>Date;
  randomUUID?:()=>string;
};

function json(body:unknown,status=200,headers:Record<string,string>={}) {
  return Response.json(body,{status,headers:{'Cache-Control':'no-store',...headers}});
}

export function createEnquiryHandler({runtime,send=fetch,rateLimit,now=()=>new Date(),randomUUID=()=>crypto.randomUUID()}:EnquiryHandlerOptions) {
  return async function handleEnquiry(request:Request) {
    const contentType=request.headers.get('content-type') || '';
    if(!contentType.toLowerCase().startsWith('application/json')) return json({ok:false,code:'UNSUPPORTED_MEDIA',message:'Send the enquiry as JSON.'},415);

    const declaredSize=Number(request.headers.get('content-length') || 0);
    if(Number.isFinite(declaredSize) && declaredSize>MAX_ENQUIRY_BYTES) return json({ok:false,code:'REQUEST_TOO_LARGE',message:'The enquiry is too large.'},413);

    let raw:string;
    try { raw=await request.text(); } catch { return json({ok:false,code:'INVALID_REQUEST',message:'We could not read this enquiry.'},400); }
    if(new TextEncoder().encode(raw).byteLength>MAX_ENQUIRY_BYTES) return json({ok:false,code:'REQUEST_TOO_LARGE',message:'The enquiry is too large.'},413);

    let input:unknown;
    try { input=JSON.parse(raw); } catch { return json({ok:false,code:'INVALID_JSON',message:'We could not read this enquiry.'},400); }
    const parsed=enquirySchema.safeParse(input);
    if(!parsed.success) return json({ok:false,code:'VALIDATION_ERROR',message:'Please check the highlighted fields.',fields:fieldErrors(parsed.error)},400);

    const {website,...enquiry}=parsed.data;
    if(website) return json({ok:true,message:'Thanks — your enquiry has been received.'});

    if(!runtime.MAILJET_API_KEY || !runtime.MAILJET_SECRET_KEY || !runtime.UPSTASH_REDIS_REST_URL || !runtime.UPSTASH_REDIS_REST_TOKEN || !runtime.ENQUIRY_TO_EMAIL || !runtime.ENQUIRY_FROM_EMAIL || !runtime.ENQUIRY_RATE_LIMIT_SALT) {
      console.error('Enquiry delivery is not configured');
      return json({ok:false,code:'SERVICE_UNAVAILABLE',message:'Online enquiries are not available yet. Please use the contact details shown on this page.'},503);
    }

    try {
      const key=await rateLimitKey(request,runtime.ENQUIRY_RATE_LIMIT_SALT);
      const checkLimit=rateLimit ?? createUpstashRateLimiter(runtime.UPSTASH_REDIS_REST_URL,runtime.UPSTASH_REDIS_REST_TOKEN);
      const limit=await checkLimit(key);
      if(!limit.allowed) return json({ok:false,code:'RATE_LIMITED',message:'You have sent several enquiries recently. Please try again in a few minutes.'},429,{'Retry-After':String(limit.retryAfter),'X-RateLimit-Remaining':'0'});

      const reference=randomUUID();
      const submittedAt=now().toISOString();
      const subjectSchool=enquiry.school.replace(/\s+/g,' ').slice(0,80);
      const credentials=btoa(`${runtime.MAILJET_API_KEY}:${runtime.MAILJET_SECRET_KEY}`);
      const delivery=await send('https://api.mailjet.com/v3.1/send',{
        method:'POST',
        headers:{Authorization:`Basic ${credentials}`,'Content-Type':'application/json'},
        body:JSON.stringify({
          Messages:[{
            From:{Email:runtime.ENQUIRY_FROM_EMAIL,Name:'Yearbook_MAZ'},
            To:[{Email:runtime.ENQUIRY_TO_EMAIL}],
            ReplyTo:{Email:enquiry.email,Name:enquiry.name},
            Subject:`New Yearbook_MAZ enquiry — ${subjectSchool}`,
            TextPart:enquiryEmail(enquiry,submittedAt,reference),
          }],
        }),
        signal:AbortSignal.timeout(10_000),
      });
      if(!delivery.ok) {
        console.error('Enquiry email delivery failed',delivery.status);
        return json({ok:false,code:'DELIVERY_FAILED',message:'We could not send your enquiry right now. Please try again.'},502);
      }
      return json({ok:true,message:'Thanks — your enquiry has been sent.',reference},200,{'X-RateLimit-Remaining':String(limit.remaining)});
    } catch(error) {
      console.error('Enquiry processing failed',error instanceof Error ? error.message : 'Unknown error');
      return json({ok:false,code:'INTERNAL_ERROR',message:'We could not send your enquiry right now. Please try again.'},500);
    }
  };
}
