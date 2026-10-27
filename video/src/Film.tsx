import React from 'react';
import {Composition, AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import {loadFont} from '@remotion/fonts';

loadFont({family:'FilmNewsreader',url:staticFile('newsreader.woff2'),weight:'400'});
loadFont({family:'FilmNewsreader',url:staticFile('newsreader-italic.woff2'),weight:'400',style:'italic'});
loadFont({family:'FilmManrope',url:staticFile('manrope.woff2'),weight:'400'});
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const soft={...clamp,easing:Easing.bezier(.22,1,.36,1)};
const ribbon='M 425 816 C 550 778 591 747 590 661 C 588 594 610 575 754 554 C 950 525 931 470 863 434 C 820 411 745 405 734 375 C 702 310 882 291 957 265 C 1033 239 1019 211 969 198';

function RibbonLight(){
  const frame=useCurrentFrame(); const {fps}=useVideoConfig();
  const progress=interpolate(frame,[1.15*fps,7.7*fps],[0,1],{...clamp,easing:Easing.inOut(Easing.sin)});
  const opacity=interpolate(frame,[.9*fps,1.4*fps,8.2*fps,9.7*fps],[0,.82,.82,.24],clamp);
  return <svg viewBox="0 0 1672 941" style={{position:'absolute',inset:0,width:'100%',height:'100%',overflow:'visible'}}>
    <defs><filter id="ribbon-bloom"><feGaussianBlur stdDeviation="5"/></filter></defs>
    <path d={ribbon} fill="none" stroke="#fff4ca" strokeWidth="24" strokeLinecap="round" pathLength="1" strokeDasharray={`${progress} 1`} opacity={opacity*.4} filter="url(#ribbon-bloom)"/>
    <path d={ribbon} fill="none" stroke="#fff7d9" strokeWidth="4" strokeLinecap="round" pathLength="1" strokeDasharray={`${progress} 1`} opacity={opacity*.72}/>
    <path d={ribbon} fill="none" stroke="#fffdf1" strokeWidth="12" strokeLinecap="round" pathLength="1" strokeDasharray=".014 .986" strokeDashoffset={-progress} opacity={progress<.99?opacity:0} filter="url(#ribbon-bloom)"/>
  </svg>;
}
function EvidenceHalo({x,y,at}:{x:number;y:number;at:number}){
  const frame=useCurrentFrame();const {fps}=useVideoConfig();
  const phase=interpolate(frame,[at*fps,(at+1.4)*fps],[0,1],clamp);
  return <div style={{position:'absolute',left:x-32,top:y-32,width:64,height:64,borderRadius:16,border:'2px solid #fff6d8',boxShadow:'0 0 28px 5px #fff0ce80',scale:1+phase*.48,opacity:frame<at*fps?0:Math.sin(phase*Math.PI)*.8}}/>;
}
function BuildingStage(){
  const frame=useCurrentFrame();const {fps}=useVideoConfig();
  return <AbsoluteFill style={{width:1672,height:941,scale:interpolate(frame,[0,9*fps],[1.025,1],soft),translate:`${interpolate(frame,[0,9*fps],[-12,0],soft)}px ${interpolate(frame,[0,1.8*fps],[18,0],soft)}px`,transformOrigin:'44% 90%'}}>
    <Img src={staticFile('building.png')} style={{position:'absolute',inset:0,width:'100%',height:'100%',filter:'drop-shadow(0 20px 22px #47503518)'}}/>
    <RibbonLight/>
    <EvidenceHalo x={591} y={641} at={2.5}/>
    <EvidenceHalo x={898} y={480} at={4.7}/>
    <EvidenceHalo x={829} y={290} at={6.25}/>
    <EvidenceHalo x={950} y={180} at={7.7}/>
  </AbsoluteFill>;
}
export function EvidenceRibbon({portrait=false}:{portrait?:boolean}){
  const frame=useCurrentFrame(); const {fps,width,height}=useVideoConfig();
  const scale=portrait?.91:width/1672;
  return <AbsoluteFill style={{background:'#d9e9e9',overflow:'hidden',color:'#26351e'}}>
    <Img src={staticFile('backdrop.png')} style={{position:'absolute',width:portrait?'auto':'104%',height:portrait?'100%':'104%',minWidth:'100%',objectFit:'cover',left:portrait?-900:-30,top:portrait?0:-20,translate:`${interpolate(frame,[0,10*fps],[0,22],clamp)}px 0px`}}/>
    <Img src={staticFile('cloud.png')} style={{position:'absolute',width:portrait?1350:1300,height:'auto',left:portrait?-350:1000,top:portrait?-270:-300,opacity:.6,filter:'blur(3px)',translate:`${interpolate(frame,[0,10*fps],[-115,105],clamp)}px 0px`}}/>
    <Img src={staticFile('cloud.png')} style={{position:'absolute',width:portrait?1250:1060,height:'auto',left:portrait?-600:-630,top:portrait?260:-110,opacity:.48,filter:'blur(6px)',translate:`${interpolate(frame,[0,10*fps],[70,-100],clamp)}px ${interpolate(frame,[0,10*fps],[0,-20],clamp)}px`}}/>
    <div style={{position:'absolute',left:portrait?-130:0,top:portrait?875:0,width:1672,height:941,scale,transformOrigin:'top left'}}><BuildingStage/></div>
    <AbsoluteFill style={{background:'linear-gradient(115deg,#fff4d61a,transparent 45%,transparent)',opacity:interpolate(frame,[0,5*fps,10*fps],[.1,.42,.18],clamp),pointerEvents:'none'}}/>
    <Img src={staticFile('logo.svg')} style={{position:'absolute',left:portrait?70:57,top:portrait?65:40,width:portrait?385:330,height:'auto',opacity:interpolate(frame,[0,.65*fps],[0,1],clamp)}}/>
    <div style={{position:'absolute',left:portrait?70:1290,top:portrait?235:300,width:portrait?930:595}}>
      <div style={{fontFamily:'FilmNewsreader',fontWeight:400,fontSize:portrait?133:96,letterSpacing:'-.045em',lineHeight:.96}}>
        <div style={{overflow:'hidden',paddingTop:12,paddingBottom:8}}><div style={{translate:`0px ${interpolate(frame,[.75*fps,1.85*fps],[155,0],soft)}px`,opacity:interpolate(frame,[.8*fps,1.6*fps],[0,1],clamp)}}>Follow</div></div>
        <div style={{overflow:'hidden',paddingBottom:15}}><div style={{translate:`0px ${interpolate(frame,[1.1*fps,2.25*fps],[150,0],soft)}px`,opacity:interpolate(frame,[1.1*fps,1.95*fps],[0,1],clamp),whiteSpace:'nowrap'}}>every handoff.</div></div>
      </div>
      <p style={{fontFamily:'FilmManrope',fontSize:portrait?37:32,letterSpacing:'-.025em',lineHeight:1.5,margin:'20px 0 0',maxWidth:580,opacity:interpolate(frame,[2.2*fps,3.2*fps],[0,1],clamp),translate:`0px ${interpolate(frame,[2.2*fps,3.2*fps],[16,0],soft)}px`}}>The final decision stays human.</p>
      <div style={{marginTop:portrait?35:20,display:'flex',alignItems:'center',gap:16,fontFamily:'FilmManrope',fontSize:portrait?20:17,letterSpacing:'.1em',textTransform:'uppercase',opacity:interpolate(frame,[7.7*fps,8.7*fps],[0,1],clamp)}}><span style={{display:'block',width:32,height:1,background:'#61734f'}}/>Evidence, carried through.</div>
    </div>
    <AbsoluteFill style={{background:'linear-gradient(0deg,#26351e40,transparent 15%)',pointerEvents:'none'}}/>
  </AbsoluteFill>;
}
export const Root=()=><><Composition id="EvidenceRibbon" component={EvidenceRibbon} width={1920} height={1080} fps={30} durationInFrames={300} defaultProps={{portrait:false}}/><Composition id="EvidenceRibbonMobile" component={EvidenceRibbon} width={1080} height={1920} fps={30} durationInFrames={300} defaultProps={{portrait:true}}/></>;

