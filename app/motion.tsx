'use client';
import {useEffect} from 'react';

export default function MotionEffects(){
 useEffect(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced)return;
  const revealTargets=document.querySelectorAll<HTMLElement>('.section-heading,.about-grid,.stats,.project-card,.plan,.process-grid>div,.contact-grid');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('motion-in');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px -25px 0px'});
  revealTargets.forEach(target=>observer.observe(target));
  if(!matchMedia('(pointer:fine)').matches)return()=>observer.disconnect();

  const root=document.documentElement;
  let frame=0;let px=0;let py=0;
  const move=(event:PointerEvent)=>{
   px=event.clientX;py=event.clientY;
   if(frame)return;
   frame=requestAnimationFrame(()=>{
    root.style.setProperty('--pointer-x',`${px}px`);
    root.style.setProperty('--pointer-y',`${py}px`);
    frame=0;
   });
   const tile=(event.target as Element).closest?.('.service-row,.project-card,.plan,.process-grid>div,.inquiry-form') as HTMLElement|null;
   if(tile){const r=tile.getBoundingClientRect();tile.style.setProperty('--tile-ry',`${((px-r.left-r.width/2)/r.width*8).toFixed(2)}deg`);tile.style.setProperty('--tile-rx',`${((r.top+r.height/2-py)/r.height*7).toFixed(2)}deg`)}
  };
  const leave=(event:PointerEvent)=>{const tile=(event.target as Element).closest?.('.service-row,.project-card,.plan,.process-grid>div,.inquiry-form') as HTMLElement|null;if(tile&&!tile.contains(event.relatedTarget as Node)){tile.style.setProperty('--tile-ry','0deg');tile.style.setProperty('--tile-rx','0deg')}};
  window.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerout',leave);
  return()=>{observer.disconnect();window.removeEventListener('pointermove',move);document.removeEventListener('pointerout',leave);cancelAnimationFrame(frame)};
 },[]);
 return <div className="pointer-light" aria-hidden="true"/>;
}
