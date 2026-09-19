import type {MetadataRoute} from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:'Living Yearbooks',
    short_name:'Yearbooks',
    description:'Digital school yearbooks for Zambia.',
    start_url:'/',
    display:'standalone',
    background_color:'#F6F1E7',
    theme_color:'#701D33',
    icons:[
      {src:'/icon-192.png',sizes:'192x192',type:'image/png'},
      {src:'/icon-512.png',sizes:'512x512',type:'image/png'},
    ],
  };
}
