import test from 'node:test'
import assert from 'node:assert/strict'
import {documents,validate,migrate} from './demo.mjs'
const assets=Object.fromEntries(['hero-class-2026.webp','students-camera-football.webp','cultural-day.webp'].map((f,i)=>[f,`image-test-${i}`]))
test('seed has complete references, image descriptions and all demo records',()=>{
  const docs=documents(assets);validate(docs,Object.values(assets));assert.equal(docs.length,19)
  assert.equal(docs.filter(d=>d._type==='studentProfile').length,4)
  assert.equal(docs.filter(d=>d._type==='galleryPhoto').length,6)
  const broken=structuredClone(docs);broken.find(d=>d._type==='studentProfile').yearbook._ref='missing';assert.throws(()=>validate(broken,Object.values(assets)),/Broken reference/)
  const noAlt=structuredClone(docs);noAlt[0].coverImage.alt='';assert.throws(()=>validate(noAlt,Object.values(assets)),/alt text/)
})
test('rerunning preserves editorial changes and creates no duplicate records',async()=>{
  const db=new Map();const client={transaction(){const pending=[];return {createIfNotExists(d){pending.push(d);return this},async commit(){for(const d of pending)if(!db.has(d._id))db.set(d._id,structuredClone(d))}}},async fetch(q,{ids}){return ids.filter(id=>db.has(id)).map(_id=>({_id}))}}
  await migrate(client,assets);db.get('demo.student.chanda-mwansa').quote='Edited by Emmanuel'
  await migrate(client,assets);assert.equal(db.size,19);assert.equal(db.get('demo.student.chanda-mwansa').quote,'Edited by Emmanuel')
})
test('migration does not depend on credentials being exposed in client config',async()=>{
  const db=new Map();const client={config:()=>({token:undefined}),transaction(){const pending=[];return {createIfNotExists(d){pending.push(d);return this},async commit(){for(const d of pending)if(!db.has(d._id))db.set(d._id,structuredClone(d))}}},async fetch(q,{ids}){return ids.filter(id=>db.has(id)).map(_id=>({_id}))}}
  assert.equal(await migrate(client,assets),19)
})
