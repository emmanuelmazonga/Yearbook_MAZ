import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';

test('keeps public content tokenless and protects hosted responses',async()=>{
  const sanity=await readFile(new URL('../lib/sanity.ts',import.meta.url),'utf8');
  const worker=await readFile(new URL('../worker/index.ts',import.meta.url),'utf8');
  const ignore=await readFile(new URL('../.gitignore',import.meta.url),'utf8');
  assert.doesNotMatch(sanity,/Authorization|token\s*:/i);
  assert.match(ignore,/\.env\*/);
  assert.match(worker,/Strict-Transport-Security/);
  assert.match(worker,/Content-Security-Policy/);
  assert.match(worker,/X-Content-Type-Options/);
  assert.match(worker,/url\.protocol='https:'/);
});
