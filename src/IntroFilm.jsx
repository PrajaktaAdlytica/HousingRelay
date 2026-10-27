import React,{useState,useEffect,useRef,useCallback} from 'react';
import {ArrowDown,Pause,Play,ArrowCounterClockwise} from '@phosphor-icons/react';

export function IntroFilm({motion,onHeroVisibility}){
  const section=useRef(null),video=useRef(null),manual=useRef(false),handoffing=useRef(false),ended=useRef(false),userPaused=useRef(false),wasPlaying=useRef(false);
  const [portrait,setPortrait]=useState(()=>window.matchMedia('(max-aspect-ratio: 1/1)').matches);
  const [playing,setPlaying]=useState(false),[complete,setComplete]=useState(false),[failed,setFailed]=useState(false),[time,setTime]=useState(0);
  const stem=portrait?'evidence-ribbon-mobile':'evidence-ribbon';
  const toHero=useCallback(()=>{
    manual.current=true;handoffing.current=true;video.current?.pause();
    const anchor=document.getElementById('home-hero-anchor');
    const finish=()=>{handoffing.current=false;if(section.current?.contains(document.activeElement))document.querySelector('.hero h1')?.focus({preventScroll:true});};
    if(motion&&document.documentElement.classList.contains('lenis'))window.dispatchEvent(new CustomEvent('housingrelay:hero',{detail:{onComplete:finish}}));
    else {window.scrollTo({top:anchor?.offsetTop||0,behavior:'instant'});finish();}
  },[motion]);
  useEffect(()=>{
    const media=window.matchMedia('(max-aspect-ratio: 1/1)');
    const resize=()=>setPortrait(media.matches);
    media.addEventListener('change',resize);
    return()=>media.removeEventListener('change',resize);
  },[]);
  useEffect(()=>{
    let raf;
    const position=()=>{
      if(!section.current)return;
      const bottom=section.current.getBoundingClientRect().bottom;
      onHeroVisibility(bottom<=85);
    };
    const scroll=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(position)};
    const interrupt=e=>{
      if(e.type==='keydown'&&!['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key))return;
      if(e.target.closest?.('button,a,input,select'))return;
      manual.current=true;
      if(handoffing.current){handoffing.current=false;window.dispatchEvent(new Event('housingrelay:cancel-handoff'));}
    };
    const visibility=()=>{
      if(document.hidden){wasPlaying.current=!!video.current&&!video.current.paused;video.current?.pause();}
      else if(wasPlaying.current&&!ended.current&&!userPaused.current&&motion&&window.scrollY<20)video.current?.play().catch(()=>setPlaying(false));
    };
    const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)video.current?.pause();},{threshold:.15});
    observer.observe(section.current);
    window.addEventListener('scroll',scroll,{passive:true});
    window.addEventListener('resize',scroll,{passive:true});
    window.addEventListener('wheel',interrupt,{passive:true});
    window.addEventListener('touchstart',interrupt,{passive:true});
    window.addEventListener('keydown',interrupt);
    document.addEventListener('visibilitychange',visibility);
    position();
    return()=>{cancelAnimationFrame(raf);observer.disconnect();window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll);window.removeEventListener('wheel',interrupt);window.removeEventListener('touchstart',interrupt);window.removeEventListener('keydown',interrupt);document.removeEventListener('visibilitychange',visibility);};
  },[motion,onHeroVisibility]);
  useEffect(()=>{if(!motion)video.current?.pause();},[motion]);
  function toggle(){
    const el=video.current;if(!el)return;
    if(el.paused){userPaused.current=false;el.play().catch(()=>setFailed(true));}
    else {userPaused.current=true;el.pause();}
  }
  function replay(){
    const el=video.current;if(!el)return;
    ended.current=false;manual.current=false;userPaused.current=false;setComplete(false);setTime(0);el.currentTime=0;el.play().catch(()=>setFailed(true));
  }
  function finish(){ended.current=true;setComplete(true);setPlaying(false);if(!manual.current&&!document.hidden&&window.scrollY<24)toHero();}
  return <section ref={section} className="intro-film" aria-labelledby="intro-title">
    <h2 className="sr-only" id="intro-title">Follow every handoff. The final decision stays human.</h2>
    <p className="sr-only">A ten-second concept film: clouds drift behind a pastel brick building while light follows the evidence ribbon up to a human reviewer. All records and people are illustrative.</p>
    <img className="intro-atmosphere" src={`/films/${stem}-poster.webp`} alt="" aria-hidden="true"/>
    {motion&&!failed?<video key={stem} ref={video} className="intro-film-media" src={`/films/${stem}.mp4`} poster={`/films/${stem}-poster.webp`} autoPlay muted playsInline preload="auto" aria-hidden="true" tabIndex={-1} onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onTimeUpdate={e=>setTime(e.currentTarget.currentTime)} onEnded={finish} onError={()=>setFailed(true)} onLoadedData={e=>{if(!document.hidden&&!manual.current&&!userPaused.current)e.currentTarget.play().catch(()=>setPlaying(false));}}/>:<img className="intro-film-media" src={`/films/${stem}-poster.webp`} alt="Pastel brick apartment building with a pink evidence ribbon leading to human review"/>}
    <div className="intro-controls">
      <span className="intro-caption">HousingRelay <span>—</span> Concept film</span>
      <div className="intro-progress" role="progressbar" aria-label="Intro playback" aria-valuemin={0} aria-valuemax={10} aria-valuenow={Math.min(10,Math.round(time))}><span style={{transform:`scaleX(${Math.min(time/10,1)})`}}/></div>
      <div className="intro-actions">
        {motion&&!failed&&(complete?<button onClick={replay}><ArrowCounterClockwise size={16}/>Replay</button>:<button onClick={toggle} aria-label={playing?'Pause intro':'Play intro'}>{playing?<Pause size={16}/>:<Play size={16}/>}<span>{playing?'Pause':'Play'}</span></button>)}
        <button onClick={toHero} className="intro-skip">{!motion||failed||complete?'Continue to website':'Skip intro'}<ArrowDown size={17}/></button>
      </div>
    </div>
  </section>;
}
