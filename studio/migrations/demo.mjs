import {readFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {createHash} from 'node:crypto'
import assert from 'node:assert/strict'
const root = new URL('../../', import.meta.url)
const source = JSON.parse(await readFile(new URL('./demo-source.json', import.meta.url), 'utf8'))
const ref = _ref => ({_type: 'reference', _ref})
const slug = current => ({_type: 'slug', current})
const yearbook = ref('demo.yearbook.copperview-2026')
const files = ['hero-class-2026.webp', 'students-camera-football.webp', 'cultural-day.webp']
export function documents(assets) {
  const image = (file, alt, position) => {
    const value = {_type: 'editorialImage', asset: ref(assets[file]), alt, photographer: 'AI-generated fictional demo imagery'}
    if (position !== undefined) {
      const width = 1 / 4.2, left = (1 - width) * parseFloat(position) / 100
      value.crop = {_type: 'sanity.imageCrop', left, right: Math.max(0, 1 - width - left), top: 0, bottom: 0}
    }
    return value
  }
  const schools = [
    ['copperview-secondary', 'Copperview Secondary School', 'Kitwe', files[0]],
    ['mopane-hills-academy', 'Mopane Hills Academy', 'Ndola', files[1]],
    ['kalundu-park-school', 'Kalundu Park School', 'Lusaka', files[2]],
  ].map(([id, name, city, file], displayOrder) => ({_id: `demo.school.${id}`, _type: 'school', name, slug: slug(id), city, country: 'Zambia', description: 'Fictional demonstration school.', coverImage: image(file, `Fictional ${name} school community`), displayOrder, featured: displayOrder === 0}))
  schools[0].motto = 'Knowledge · Character · Service'
  schools[0].description = 'Copperview Secondary is a fictional demonstration school created to show how a real school’s identity can live inside a growing digital archive. Its colours, voices and graduating classes remain distinct while sharing one reliable platform.'
  const book = {_id: yearbook._ref, _type: 'yearbook', title: 'The Copper Chapter', slug: slug('copperview-2026'), school: ref(schools[0]._id), graduationYear: 2026, volume: '01', studentCount: 186,
    introduction: '186 students. One final year. Thousands of moments worth keeping.', heroImage: image(files[0], 'Fictional Copperview Class of 2026 students celebrating together'),
    headteacherMessage: {_type: 'object', name: 'Mrs. Ruth Mumba', quote: 'Carry your curiosity with you. It will open more doors than certainty ever could.', message: 'Dear Class of 2026, you leave Copperview as thinkers, teammates and citizens ready to serve. We have watched you turn setbacks into lessons and classrooms into communities.\n\nMay this yearbook remind you not only of where you sat, but of who sat beside you—and how much you helped one another become.', portrait: image(files[1], 'Fictional Copperview school community')},
    schoolLife: [['14 clubs','From JETS and Debate to Photography, Drama and Scripture Union.'],['7 sports','Football, netball, athletics, basketball, volleyball, chess and table tennis.'],['24 leaders','Prefects, club captains and house leaders who served the school community.'],['31 awards','Academic, sporting, cultural and service achievements celebrated this year.']].map(([title,description],i)=>({_type:'highlight',_key:`highlight${i}`,title,description})),
    printOptions: [['Hardcover edition','Premium cloth-touch cover · 120 pages'],['Softcover edition','Lightweight matte cover · 96 pages']].map(([title,description],i)=>({_type:'printOption',_key:`print${i}`,title,description,priceLabel:'Price confirmed with school'})), displayOrder:0,featured:true}
  const students=source.students.map((s,i)=>({_id:`demo.student.${s.name.toLowerCase().replaceAll(' ','-')}`,_type:'studentProfile',fullName:s.name,nickname:s.nickname,yearbook,classGroup:s.group,quote:s.quote,activity:s.activity,favouriteMemory:s.memory,ambition:s.ambition,portrait:image(files[1],`Fictional demo portrait for ${s.name}`,s.position),displayOrder:i,featured:false}))
  const photos=source.photos.map((p,i)=>({_id:`demo.photo.${i+1}`,_type:'galleryPhoto',title:p.title,yearbook,category:p.category,image:{...image(p.image.split('/').at(-1),`Fictional yearbook photograph: ${p.title}`),caption:p.title},displayOrder:i,featured:i===0}))
  const memories=[['Funniest moment','The microphone staying on during assembly rehearsal.'],['Advice to Grade 8','Ask questions early. Join at least one club.'],['In ten years','Still in the group chat, but hopefully replying faster.'],['Most unforgettable','The rain starting exactly as Cultural Day ended.']].map(([title,body],i)=>({_id:`demo.memory.${i+1}`,_type:'memory',title,body,yearbook,displayOrder:i,featured:false}))
  return [...schools,book,...students,...photos,...memories,{_id:'siteSettings',_type:'siteSettings',siteTitle:'Copperview Living Yearbooks',tagline:'The years pass. The story stays.',introduction:'Beautiful photography, timeless stories, and a living digital yearbook for every graduating class.',heroImage:image(files[0],'Fictional Copperview graduating class'),featuredYearbook:yearbook,footerText:'© 2026 Copperview Living Yearbooks. Prototype content is fictional.'}]
}
export function validate(docs,assetIds){
  const ids=new Set(docs.map(d=>d._id));assert.equal(ids.size,docs.length,'Duplicate document IDs')
  const required={school:['name','slug','city','country'],yearbook:['title','slug','school','graduationYear','heroImage'],studentProfile:['fullName','yearbook','classGroup','portrait'],galleryPhoto:['title','yearbook','image','category'],memory:['title','yearbook','body'],siteSettings:['siteTitle']}
  function walk(v){
    if(!v||typeof v!=='object')return
    if(v._type==='reference')assert(ids.has(v._ref)||assetIds.includes(v._ref),`Broken reference: ${v._ref}`)
    if(v._type==='editorialImage')assert(v.asset?._ref&&v.alt?.trim(),'Image requires asset and alt text')
    if(v._type==='sanity.imageCrop')assert(v.left>=0&&v.right>=0&&v.left+v.right<1,'Invalid crop')
    if(Array.isArray(v)&&v.some(x=>x&&typeof x==='object')){v.forEach(x=>assert(x._key,'Array object requires _key'));assert.equal(new Set(v.map(x=>x._key)).size,v.length,'Duplicate array keys')}
    Object.values(v).forEach(walk)
  }
  for(const d of docs){assert(required[d._type],`Unknown type ${d._type}`);for(const f of required[d._type])assert(d[f]!==undefined&&d[f]!=='',`${d._id}: missing ${f}`);if(d.slug)assert(d.slug.current,'Missing slug');walk(d)}
}
export async function migrate(client,assets){
  const docs=documents(assets);validate(docs,Object.values(assets))
  let transaction=client.transaction()
  for(const doc of docs)transaction=transaction.createIfNotExists(doc)
  await transaction.commit({visibility:'sync'})
  const existing=await client.fetch('*[_id in $ids]{_id}',{ids:docs.map(d=>d._id)})
  assert.equal(new Set(existing.map(d=>d._id)).size,docs.length,'Post-import record verification failed')
  return docs.length
}
async function main(){
  const apply=process.argv.includes('--apply');assert(process.argv.slice(2).every(a=>a==='--apply'),'Usage: node migrations/demo.mjs [--apply]')
  const buffers=Object.fromEntries(await Promise.all(files.map(async f=>[f,await readFile(new URL(`public/images/${f}`,root))])))
  const placeholders=Object.fromEntries(files.map((f,i)=>[f,`dry-run-asset-${i}`]));const docs=documents(placeholders);validate(docs,Object.values(placeholders))
  console.log(JSON.stringify({target:'3yrbpvzl/production',mode:apply?'apply':'dry-run',documents:docs.length,types:Object.fromEntries([...new Set(docs.map(d=>d._type))].map(t=>[t,docs.filter(d=>d._type===t).length])),assets:files.map(f=>({file:f,bytes:buffers[f].length}))},null,2))
  if(!apply)return
  const {getCliClient}=await import('sanity/cli');const client=getCliClient({apiVersion:'2026-09-17'}).withConfig({useCdn:false,perspective:'raw'})
  assert.equal(client.config().projectId,'3yrbpvzl','Refusing unexpected project');assert.equal(client.config().dataset,'production','Refusing unexpected dataset')
  // Current Sanity CLI sessions may keep credentials outside client.config().
  // Verify the session with an authenticated request instead of inspecting it.
  try {
    await client.request({uri: '/users/me'})
  } catch (error) {
    throw new Error(`Sanity authentication failed. Run npx sanity login from studio, then retry. (${error.message})`)
  }
  const assets={}
  for(const file of files){const hash=createHash('sha1').update(buffers[file]).digest('hex');const existing=await client.fetch('*[_type == "sanity.imageAsset" && sha1hash == $hash][0]._id',{hash});assets[file]=existing||(await client.assets.upload('image',buffers[file],{filename:file,contentType:'image/webp'}))._id}
  console.log(`Verified ${await migrate(client,assets)} documents after migration.`)
}
if(process.argv[1]===fileURLToPath(import.meta.url))main().catch(e=>{console.error(e.message);process.exitCode=1})
