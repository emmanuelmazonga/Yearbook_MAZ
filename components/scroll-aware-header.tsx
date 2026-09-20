"use client";

import {useEffect,useRef,useState,type ReactNode} from "react";

export function ScrollAwareHeader({children,className}: {children:ReactNode;className:string}) {
  const header=useRef<HTMLElement>(null);
  const [hidden,setHidden]=useState(false);

  useEffect(()=>{
    const mobile=window.matchMedia("(max-width: 1023px)");
    let lastY=window.scrollY;
    let travel=0;

    const onScroll=()=>{
      const y=window.scrollY;
      const change=y-lastY;
      lastY=y;
      if(!mobile.matches || y<76 || header.current?.querySelector("details[open]")) {
        travel=0;
        setHidden(false);
        return;
      }
      if((change>0 && travel<0) || (change<0 && travel>0)) travel=0;
      travel+=change;
      if(travel>12) { setHidden(true); travel=0; }
      if(travel< -12) { setHidden(false); travel=0; }
    };

    window.addEventListener("scroll",onScroll,{passive:true});
    mobile.addEventListener("change",onScroll);
    return ()=>{
      window.removeEventListener("scroll",onScroll);
      mobile.removeEventListener("change",onScroll);
    };
  },[]);

  return <header ref={header} className={`scroll-aware-header ${className}`} data-hidden={hidden} onFocusCapture={()=>setHidden(false)}>{children}</header>;
}
