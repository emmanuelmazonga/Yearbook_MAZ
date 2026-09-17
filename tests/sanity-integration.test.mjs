import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {documents} from '../studio/migrations/demo.mjs';

test('published CMS content drives pages, filters, images and new slugs', async () => {
  const fixture=process.env.SANITY_TEST_FIXTURE
    ? JSON.parse(await readFile(process.env.SANITY_TEST_FIXTURE,'utf8'))
    : {result: JSON.parse(JSON.stringify(documents(Object.fromEntries(['hero-class-2026.webp','students-camera-football.webp','cultural-day.webp'].map(f=>[f,'image-0123456789abcdef-1536x1024-webp'])))).replaceAll('demo.','demo-').replaceAll('school.','school-').replaceAll('yearbook.','yearbook-').replaceAll('student.','student-').replaceAll('photo.','photo-').replaceAll('memory.','memory-'))};
  const realFetch=globalThis.fetch;
  let requests=0;
  globalThis.fetch=async (url,options)=>{
    if(String(url).startsWith('https://3yrbpvzl.apicdn.sanity.io/')) {
      assert.equal(new URL(url).searchParams.get('perspective'),'published');
      assert.equal(options.cache,'no-store'); assert.equal(options.headers?.Authorization,undefined);
      requests++; return Response.json(fixture);
    }
    return realFetch(url,options);
  };
  try {
    const {default:worker}=await import('../dist/server/index.js');
    const render=async(path)=>{
      const response=await worker.fetch(new Request('https://yearbook.test'+path),{ASSETS:{fetch:async()=>new Response('',{status:404})}},{waitUntil(){},passThroughOnException(){}});
      return {status:response.status,html:await response.text()};
    };
    const school=fixture.result.find(d=>d._type==='school' && d.slug?.current==='copperview-secondary');
    const gallery=fixture.result.find(d=>d._type==='galleryPhoto');
    school.branding={primaryColor:'#123A70',secondaryColor:'#F7F7F7',accentColor:'#E9B949'};
    school.principal={name:'Dr Test Principal',role:'Principal',message:'A test message.',portrait:gallery.image};
    school.schoolPhotos=[{...gallery.image,_key:'campus-test'}];
    school.socialLinks=[{_key:'social-test',label:'School news',url:'https://example.com/news'}];
    for(const path of ['/','/schools','/schools/copperview-secondary','/yearbooks/copperview-2026','/photography','/contact','/about','/for-schools']) {
      const {status,html}=await render(path); assert.equal(status,200,path); assert(!html.includes('temporarily unavailable'),path);
    }
    const landing=await render('/schools/copperview-secondary');
    assert.match(landing.html,/#123A70/); assert.match(landing.html,/#E9B949/); assert.match(landing.html,/Dr Test Principal/); assert.match(landing.html,/School news/);
    const initial=await render('/yearbooks/copperview-2026');
    assert.match(initial.html,/Chanda Mwansa/); assert.match(initial.html,/cdn.sanity.io/); assert.match(initial.html,/rect=/);
    const student=fixture.result.find(d=>d._type==='studentProfile'); student.fullName='CMS update verified';
    assert.match((await render('/yearbooks/copperview-2026')).html,/CMS update verified/);
    const book=fixture.result.find(d=>d._type==='yearbook'); book.slug.current='new-edition';
    assert.equal((await render('/yearbooks/new-edition')).status,200);
    const missing=await render('/yearbooks/copperview-2026'); assert(missing.status===404 || missing.html.includes('NEXT_HTTP_ERROR_FALLBACK;404'));
    fixture.result=fixture.result.filter(d=>d._type!=='studentProfile');
    assert.match((await render('/yearbooks/new-edition')).html,/No published student profiles yet/);
    assert(requests>0);
  } finally {globalThis.fetch=realFetch;}
});
