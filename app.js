/* THE STAGE / 02. Original content, newly designed views. No build required. */
const $=s=>document.querySelector(s), main=$('#main'), data=window.ROOF_CONTENT;
const projects=data.filter(p=>p.path.startsWith('project/'));
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clean=p=>p.text.split('\nFollow')[0].split('\n');
const imgs=p=>p.images.filter(i=>i.src&&i.src.startsWith('https://www.roofvideodesign.com/')&&!i.src.includes('ROOF-LOGO')).map(i=>i.src);
const mp4=p=>p.videos.filter(v=>v&&v.endsWith('.mp4'));
const slug=p=>p.path.split('/')[1], name=p=>clean(p)[0], url=p=>'#/project/'+slug(p);
const categories=['Live visuals','Live visuals','Interactive','Live visuals','3D & animation','XR & virtual','Live visuals','XR & virtual','3D & animation'];
const category=p=>categories[projects.indexOf(p)];
const brand='https://www.roofvideodesign.com/wp-content/uploads/2023/03/ROOF-Logo-Animation-Home-_small-short.mp4';
const mobile=matchMedia('(max-width:760px)').matches;
/* Images: resized WebP copies from the WordPress image CDN (i0.wp.com); the original is the fallback. */
const cdn=(src,w)=>src&&src.startsWith('https://www.roofvideodesign.com/')?`https://i0.wp.com/${src.slice(8)}?w=${w}&ssl=1`:src;
const posterOf=p=>imgs(p)[0]?cdn(imgs(p)[0],mobile?900:1600):'';
const pic=(src,alt,w,attrs='')=>`<img ${attrs} decoding="async" src="${esc(cdn(src,w))}" data-orig="${esc(src)}" alt="${esc(alt)}">`;
/* Videos are written as placeholders (data-src) and filled by hydrate(): one shared, already-buffered element per clip. */
const video=(src,poster='',cls='')=>`<video class="${cls}" data-src="${esc(src)}" ${poster?`poster="${esc(poster)}"`:''} muted playsinline loop preload="none" disablepictureinpicture disableremoteplayback></video>`;
const media=p=>mp4(p)[0]?video(mp4(p)[0],posterOf(p)):pic(imgs(p)[0],name(p),mobile?900:1600);
const paras=lines=>lines.map(t=>`<p>${esc(t)}</p>`).join('');
let current=0,cleanup=()=>{},videoObserver,nearObserver;
function motion(target,props={}){if(!reduce&&window.gsap)gsap.fromTo(target,{opacity:0,y:20},{opacity:1,y:0,duration:.55,ease:'power3.out',clearProps:'opacity,transform',...props});}
const pool=new Map();
function makeVideo(src,preload='metadata'){const v=document.createElement('video');v.muted=true;v.defaultMuted=true;v.loop=true;v.playsInline=true;['muted','playsinline','webkit-playsinline','disablepictureinpicture','disableremoteplayback'].forEach(a=>v.setAttribute(a,''));v.preload=preload;v.src=src;return v}
function pooled(src,preload){let v=pool.get(src);if(!v){v=makeVideo(src,preload);pool.set(src,v)}else if(preload==='auto')v.preload='auto';return v}
const inTransit=v=>!!v.closest('.opening-mosaic,.route-flight');
// Swap each placeholder for the shared element. Moving a playing <video> keeps its buffer and current time: no restart, no reload.
function hydrate(root=main){root.querySelectorAll('video[data-src]').forEach(ph=>{const src=ph.dataset.src;let v=pool.get(src);if(v&&v.isConnected){if(inTransit(v))return;v=makeVideo(src)}else if(!v)v=pooled(src,ph.closest('.extra-video')?'metadata':'auto');const playing=v.classList.contains('is-playing');v.className=ph.className;v.classList.toggle('is-playing',playing);const poster=ph.getAttribute('poster');v.removeAttribute('poster');const box=ph.parentElement;if(poster&&box){box.style.backgroundImage=`url("${poster}")`;box.classList.add('poster-bg')}ph.replaceWith(v)})}
function videos(){videoObserver?.disconnect();nearObserver?.disconnect();videoObserver=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(isIntersecting&&!reduce)target.play().catch(()=>{});else target.pause()}),{threshold:.15});nearObserver=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(isIntersecting){target.preload='auto';nearObserver.unobserve(target)}}),{rootMargin:'0px 0px 700px 0px'});main.querySelectorAll('video:not([data-src])').forEach(v=>{v.muted=true;nearObserver.observe(v);if(!v.closest('.film-layer'))videoObserver.observe(v)});}
// A clip stays invisible (poster, photo or dark background shows) until frames are really moving: no black or frozen first frame.
document.addEventListener('playing',e=>{if(e.target.tagName==='VIDEO')e.target.classList.add('is-playing')},true);
// Some phones block autoplay (e.g. iOS low-power mode): start the visible clips on the first touch.
['touchstart','pointerdown'].forEach(t=>addEventListener(t,()=>document.querySelectorAll('video').forEach(v=>{const r=v.getBoundingClientRect();if(v.paused&&!reduce&&r.bottom>0&&r.top<innerHeight&&getComputedStyle(v.closest('.film-layer')||v).opacity>.05)v.play().catch(()=>{})}),{passive:true,once:true}));
// Images fade in once fully downloaded, instead of painting progressively from the top.
new MutationObserver(records=>records.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType!==1)return;(n.tagName==='IMG'?[n]:n.querySelectorAll('img')).forEach(img=>{if(img.complete&&img.naturalWidth)return;img.classList.add('img-pending');const done=()=>img.classList.remove('img-pending');img.addEventListener('load',done,{once:true});img.addEventListener('error',()=>{if(img.dataset.orig&&img.src!==img.dataset.orig)img.src=img.dataset.orig;else done()})})}))).observe(document.body,{childList:true,subtree:true});
function headline(label,title){return `<div class="page-title"><span class="eyebrow">${label}</span><h1>${title}</h1></div>`;}
function home(){
 const selected=[projects[3],projects[0],projects[2],projects[4],projects[6]];
 main.innerHTML=`<section class="cinema-scroll"><div class="cinema-stage"><div class="film-layer brand-layer">${video(brand,'','brand-video')}</div><section class="film-layer statement"><span class="eyebrow">ROOF / DIGITAL CONTENT STUDIO</span><h1>We love<br><em>what we do.</em></h1><p>${esc(clean(data[2]).slice(0,2).join(" "))}</p></section>${selected.map((p,i)=>`<article class="film-layer case-layer"><a class="case-media" href="${url(p)}" aria-label="Explore ${esc(name(p))}">${media(p)}</a><div class="case-caption"><span class="eyebrow">SELECTED WORK / 0${i+1}</span><h2>${esc(name(p))}</h2><div><p>${esc(clean(p)[1])}</p><a class="action" href="${url(p)}">Explore project <span aria-hidden="true"><svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a></div></div></article>`).join('')}<div class="cinema-hud"><span class="cinema-count">ROOF / SHOWREEL</span><div class="cinema-track"><i></i></div><a href="#/works">All projects <span aria-hidden="true"><svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a></div></div></section><section class="spatial-scroll"><div class="spatial-stage"><div class="spatial-lines" aria-hidden="true"></div><article class="space-panel studio-panel"><div><span class="eyebrow">01 / THE STUDIO</span><h2>We are<br><em>ROOF.</em></h2><p>${esc(clean(data[2]).slice(0,2).join(' '))}</p><a href="#/about" class="action">Meet ROOF <span aria-hidden="true"><svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a></div>${video(data[2].videos[0])}</article><article class="space-panel services-panel"><span class="eyebrow">02 / WHAT WE DO</span><h2>Ideas into<br><em>experiences.</em></h2><div class="service-orbit">${servicesData().map((s,i)=>`<a href="#/services/${i}"><small>0${i+1}</small>${esc(s.name)}<span><svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a>`).join('')}</div></article><article class="space-panel contact-panel"><span class="eyebrow">03 / NEXT CHAPTER</span><h2>Let's make<br><em>something move.</em></h2><a class="action" href="#/contacts">Let's talk <span aria-hidden="true"><svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a><a href="#/works" class="action">What we create <span aria-hidden="true"><svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a></article><span class="spatial-label">ROOF / BEYOND THE SCREEN</span></div></section>`;
 const cinema=$('.cinema-scroll'),layers=[...main.querySelectorAll('.film-layer')],spatial=$('.spatial-scroll'),panels=[...main.querySelectorAll('.space-panel')];let raf=0;
 const clamp=v=>Math.max(0,Math.min(1,v));
 const finalFilm=layers[layers.length-1],shards=document.createElement('div');shards.className='film-shards';finalFilm.append(shards);for(let i=0;i<5;i++){const c=document.createElement('canvas');c.width=400;c.height=1000;c.style.left=(i*20)+'%';shards.append(c)}
 let shardFrame=0;function drawShards(){shardFrame=requestAnimationFrame(drawShards);const finalVideo=finalFilm.querySelector('video');if(!finalVideo||finalVideo.readyState<2||Number(shards.style.opacity)<.01)return;const vw=finalVideo.videoWidth,vh=finalVideo.videoHeight,ratio=innerWidth/innerHeight;let sw=vw,sh=vw/ratio;if(sh>vh){sh=vh;sw=vh*ratio}for(let i=0;i<5;i++){const c=shards.children[i];c.getContext('2d').drawImage(finalVideo,(vw-sw)/2+i*sw/5,(vh-sh)/2,sw/5,sh,0,0,400,1000)}}if(!reduce)drawShards();
 function paint(){raf=0;const h=innerHeight,f=clamp(-cinema.getBoundingClientRect().top/(cinema.offsetHeight-h)),T=8,t=mobile?(f<.06?f/.06*1.2:1.2+(f-.06)/.94*(T-1.2)):f*T;
 layers.forEach((el,i)=>{const incoming=i===0?1:clamp((t-i+.5)/.7),outgoing=i===layers.length-1?0:clamp((t-i-.5)/.7),opacity=incoming*(1-outgoing);el.style.opacity=opacity;el.style.visibility=opacity>.001?'visible':'hidden';const on=opacity>.55;if(el._on!==on){el._on=on;el.style.pointerEvents=on?'auto':'none';el.setAttribute('aria-hidden',!on);el.querySelectorAll('a').forEach(a=>a.tabIndex=on?0:-1)}el.style.transform=`translate3d(0,0,0) scale(${1+(1-incoming)*.16-outgoing*.07})`;el.querySelectorAll('video:not([data-src])').forEach(v=>{if(Math.abs(t-i)<1.6&&v.preload!=='auto')v.preload='auto';if(opacity>.05){if(v.paused)v.play().catch(()=>{})}else if(!v.paused)v.pause()})});
 const fracture=clamp((t-7.25)/.6);shards.style.opacity=fracture>0?1:0;finalFilm.querySelector('.case-media').style.opacity=1-fracture;[...shards.children].forEach((c,i)=>c.style.transform=`translate3d(${(i-2)*fracture*70}px,${(i%2?1:-1)*fracture*120}px,${-fracture*500}px) rotateY(${fracture*(i-2)*24}deg) rotateZ(${fracture*(i-2)*5}deg)`);$('.cinema-hud').style.opacity=t<.6?'0':'1';
 const n=Math.min(6,Math.round(t));$('.cinema-count').textContent=n<2?'ROOF / '+(n?'THE STUDIO':'SHOWREEL'):'0'+(n-1)+' / 05';$('.cinema-track i').style.transform=`scaleX(${clamp(t/T)})`;
 if(!mobile){const st=clamp((h*.65-spatial.getBoundingClientRect().top)/(spatial.offsetHeight-h+h*.65))*3;spatial.style.opacity=clamp((h-spatial.getBoundingClientRect().top)/(h*.85));panels.forEach((el,i)=>{const phase=st-i,entry=clamp(phase/.65),exit=clamp((phase-.85)/.45);el.style.opacity=entry*(1-exit);el.style.transform=`translate3d(${(i%2?1:-1)*(1-entry)*50}vw,0,${-(1-entry)*1200-exit*800}px) rotateY(${(i%2?1:-1)*((1-entry)*55+exit*65)}deg) rotateZ(${exit*-8}deg)`;const on=entry>.7&&exit<.3;if(el._on!==on){el._on=on;el.style.pointerEvents=on?'auto':'none';el.setAttribute('aria-hidden',!on);el.querySelectorAll('a').forEach(a=>a.tabIndex=on?0:-1)}})}
 }
 function tick(){if(!raf)raf=requestAnimationFrame(paint)}
 if(!reduce){addEventListener('scroll',tick,{passive:true});addEventListener('resize',tick);paint()}else{document.body.classList.add('reduced-cinema')}
 let ambientFrame=0;if(mobile&&!reduce){const layer=main.querySelector('.brand-layer'),amb=document.createElement('canvas');amb.className='brand-ambient';amb.width=18;amb.height=32;amb.setAttribute('aria-hidden','true');layer.prepend(amb);const ctx=amb.getContext('2d');let skip=0;
  const drawAmbient=()=>{ambientFrame=requestAnimationFrame(drawAmbient);if(++skip%2||+layer.style.opacity<.01)return;const v=layer.querySelector('video:not([data-src])');if(!v||v.readyState<2)return;const vw=v.videoWidth,vh=v.videoHeight,sw=vh*18/32;try{ctx.drawImage(v,(vw-sw)/2,0,sw,vh,0,0,18,32)}catch(_){}};drawAmbient()}
 let panelIO=null;if(mobile){panelIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in');panelIO.unobserve(e.target)}}),{threshold:.12});panels.forEach(p=>panelIO.observe(p))}
 cleanup=()=>{panelIO?.disconnect();cancelAnimationFrame(ambientFrame);cancelAnimationFrame(shardFrame);cancelAnimationFrame(raf);removeEventListener('scroll',tick);removeEventListener('resize',tick)};
}
/* Loader + opening mosaic.
   prepareBoot() runs before the first render: the nine mosaic clips start downloading at once (behind the loader),
   and the page takes these same elements over afterwards, already buffered and playing. */
const mosaicProjects=[projects[3],projects[0],projects[2],projects[4],null,projects[6],projects[1],projects[7],projects[8]];
let bootState=null;
function prepareBoot(){
 const page=(location.hash.replace(/^#\/?/,'').split('/')[0])||'home';
 const overlay=document.createElement('div');overlay.className='cinema-loader classic-loader';overlay.innerHTML='<img src="assets/roof-logo-yellow.png" alt="ROOF"><span>LOADING EXPERIENCE</span><div><i></i></div>';document.body.append(overlay);document.body.classList.add('booting');
 if(reduce){bootState={overlay,page,watch:[]};return}
 const mosaic=document.createElement('div');mosaic.className='opening-mosaic';mosaic.setAttribute('aria-hidden','true');mosaic.inert=true;
 mosaic.innerHTML=mosaicProjects.map((p,i)=>`<div class="mosaic-tile ${i===4?'mosaic-main':''}"></div>`).join('');document.body.append(mosaic);
 const tiles=[...mosaic.children],watch=[];
 tiles.forEach((tile,i)=>{const p=mosaicProjects[i];let el=null;
  if(i===4){if(page==='home')el=pooled(brand,'none')}
  else if(mp4(p)[0]){el=pooled(mp4(p)[0],'none');el.removeAttribute('poster');tile.style.backgroundImage=`url("${cdn(imgs(p)[0],mobile?500:800)}")`;tile.classList.add('poster-bg')}
  else if(imgs(p)[0]){tile.innerHTML=pic(imgs(p)[0],'',mobile?600:900);el=tile.firstChild}
  if(el){if(el.tagName==='VIDEO')tile.append(el);watch.push(el)}});
 // Clips download a few at a time, centre first, instead of nine at once splitting the bandwidth (much shorter loader on phones).
 const queue=watch.filter(e=>e.tagName==='VIDEO').sort((a,b)=>(b.parentElement.classList.contains('mosaic-main')?1:0)-(a.parentElement.classList.contains('mosaic-main')?1:0));
 let qi=0,live=0;const CONC=mobile?3:5;
 const pump=()=>{while(live<CONC&&qi<queue.length){const v=queue[qi++];live++;let over=false;const next=()=>{if(over)return;over=true;live--;pump()};v.addEventListener('canplay',next,{once:true});v.addEventListener('error',next,{once:true});setTimeout(next,mobile?2500:4000);v.preload='auto';v.play().catch(()=>{})}};
 pump();
 bootState={overlay,mosaic,tiles,watch,page};
}
function boot(){
 const {overlay,mosaic,tiles,watch,page}=bootState;
 if(reduce){hydrate();videos();overlay.remove();document.body.classList.remove('booting');return}
 // On inner pages the ninth clip is the first video of the page itself.
 const own=main.querySelector('video:not([data-src])');if(page!=='home'&&own){own.preload='auto';own.play().catch(()=>{});watch.push(own)}
 const bar=overlay.querySelector('i');overlay.classList.add('has-progress');
 const ready=el=>el.tagName==='IMG'?el.complete:(!!el.error||(el.readyState>=4&&(el.paused||el.currentTime>.15))||(el.readyState>=3&&!el.paused&&el.currentTime>.4)||(el.duration>0&&el.buffered.length&&el.buffered.end(el.buffered.length-1)>=el.duration-.3));
 let done=false;const started=performance.now();
 // The site opens only when every clip is ready (safety exit after 30 s, so a broken network never locks the visitor out).
 const poll=setInterval(()=>{const n=watch.filter(ready).length;bar.style.width=Math.max(8,watch.length?n/watch.length*100:100)+'%';if(n===watch.length||performance.now()-started>(mobile?9000:15000))finish()},150);
 function finish(){if(done)return;done=true;clearInterval(poll);bar.style.width='100%';overlay.classList.add('loaded');overlay.querySelector('span').textContent='READY TO EXPERIENCE';setTimeout(()=>{opening();overlay.classList.add('leaving');setTimeout(()=>overlay.remove(),1100)},450)}
 function opening(){
  const center=tiles[4];
  watch.forEach(v=>{if(v.tagName==='VIDEO')v.play().catch(()=>{})});
  let preview=null;
  if(page!=='home'){preview=document.createElement('div');preview.className='mosaic-page-preview';preview.style.width=innerWidth+'px';preview.style.height=innerHeight+'px';for(const source of [document.querySelector('header'),main]){const copy=source.cloneNode(true);const live=[...source.querySelectorAll('video')];copy.querySelectorAll('video').forEach((v,k)=>{v.removeAttribute('src');v.preload='none';
     // Clips visible in the first screen (e.g. the ROOF video on About) are the real, playing elements: moved into the preview, back on landing.
     const real=live[k];if(real&&!real.dataset.src&&real.getBoundingClientRect().top<innerHeight){const ph=document.createElement('video');ph.dataset.src=real.currentSrc||real.src;ph.className=real.className;if(real.getAttribute('poster'))ph.setAttribute('poster',real.getAttribute('poster'));real.replaceWith(ph);v.replaceWith(real);real.play().catch(()=>{})}});copy.removeAttribute('id');copy.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));copy.querySelectorAll('h1,.page-title,.studio-opening,.contact-card').forEach(n=>{n.style.opacity=1;n.style.transform='none'});preview.append(copy)}center.append(preview)}
  const fit=()=>{if(preview)preview.style.transform=`scale(${center.clientWidth/innerWidth},${center.clientHeight/innerHeight})`};fit();
  const directions=[[0,-180],[120,-140],[200,0],[-180,0],[0,100],[180,0],[-140,150],[0,180],[140,150]];
  const tl=gsap.timeline({defaults:{force3D:true}});
  tiles.forEach((tile,i)=>tl.fromTo(tile,{opacity:0,scale:.7,x:directions[i][0],y:directions[i][1],rotationX:i%2?12:-12,rotationY:i%2?-14:14},{opacity:1,scale:1,x:0,y:0,rotationX:0,rotationY:0,duration:1.25,ease:'power3.out'},.35+i*.1));
  tl.addLabel('expand','+=.5');
  // Side tiles leave, then their clips stop decoding: less work while the centre grows.
  tl.to(tiles.filter(t=>t!==center),{opacity:0,scale:.9,duration:.8,ease:'power2.inOut',onComplete(){tiles.forEach(t=>{if(t!==center)t.querySelectorAll('video').forEach(v=>v.pause())})}},'expand');
  tl.to(mosaic,{backgroundColor:'rgba(9,9,9,0)',duration:.3,ease:'power1.in'},'expand+=1.3');
  // The centre lands exactly where the page shows the same clip (full screen, or the framed hero on phones), without stretching it.
  tl.call(()=>{const r=center.getBoundingClientRect();gsap.set(center,{clearProps:'transform'});if(page==='home'&&mobile)center.classList.add('brand-mask');const spacer=document.createElement('div');spacer.className='mosaic-tile';spacer.style.visibility='hidden';center.after(spacer);Object.assign(center.style,{position:'fixed',left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px',margin:0,zIndex:3});
   const spot=page==='home'&&main.querySelector('.brand-layer video');const t=spot?spot.getBoundingClientRect():{left:0,top:0,width:innerWidth,height:innerHeight};
   gsap.to(center,{left:t.left,top:t.top,width:t.width,height:t.height,borderRadius:spot?getComputedStyle(spot).borderRadius:0,duration:1.6,ease:'power3.inOut',onUpdate:fit,onComplete:land})},null,'expand');
  function land(){
   // Same task: the clip leaves the mosaic and enters the page without pausing.
   mosaic.remove();hydrate();videos();document.body.classList.remove('booting');
   setTimeout(()=>[data[2].videos[0],brand].forEach(src=>{pooled(src,'auto')}),2500);
   requestAnimationFrame(()=>{dispatchEvent(new Event('scroll'));restoreScroll()});
  }
 }
}
/* Refresh in the middle of a page: after the opening, glide back to where the visitor was. */
try{history.scrollRestoration='manual'}catch(_){}
addEventListener('pagehide',()=>{try{sessionStorage.setItem('roof-scroll',JSON.stringify({h:location.hash,y:scrollY}))}catch(_){}});
function restoreScroll(){
 let saved=null;try{saved=JSON.parse(sessionStorage.getItem('roof-scroll')||'null');sessionStorage.removeItem('roof-scroll')}catch(_){}
 const nav=performance.getEntriesByType?.('navigation')[0];
 if(!saved||saved.h!==location.hash||saved.y<60||(nav&&nav.type!=='reload'))return;
 const target=Math.min(saved.y,document.documentElement.scrollHeight-innerHeight);
 if(reduce||!window.gsap){scrollTo(0,target);return}
 const pos={y:scrollY};
 const glide=gsap.to(pos,{y:target,duration:Math.min(4.2,Math.max(1.4,target/2300)),ease:'power2.inOut',delay:.35,onUpdate(){scrollTo(0,pos.y)}});
 const stop=()=>{glide.kill();['wheel','touchstart','keydown'].forEach(t=>removeEventListener(t,stop))};
 ['wheel','touchstart','keydown'].forEach(t=>addEventListener(t,stop,{passive:true}));
}

function works(){main.innerHTML=headline('THE PORTFOLIO / 09 PROJECTS','What we create.')+`<section class="archive"><div class="filters" role="group" aria-label="Filter projects">${['All projects','Live visuals','3D & animation','Interactive','XR & virtual'].map((t,i)=>`<button data-filter="${t}" aria-pressed="${i===0}">${t}</button>`).join('')}</div><div class="archive-grid"></div></section>`;function fill(filter){$('.archive-grid').innerHTML=projects.filter(p=>filter==='All projects'||category(p)===filter).map(p=>`<a class="archive-card" href="${url(p)}"><div class="archive-media">${media(p)}</div><div class="archive-info"><small>${String(projects.indexOf(p)+1).padStart(2,'0')}</small><div><h2>${esc(name(p))}</h2><span>${category(p)}</span></div><i aria-hidden="true"><svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></i></div></a>`).join('');motion('.archive-card',{stagger:.04});hydrate();videos()}fill('All projects');main.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{main.querySelectorAll('[data-filter]').forEach(el=>el.setAttribute('aria-pressed',el===b));fill(b.dataset.filter)});}
function servicesData(){const lines=clean(data[1]).slice(1),result=[];for(let i=0;i<lines.length;){const name=lines[i++],desc=lines[i++];const link=lines[i]?.startsWith('see our work')?lines[i++]:null;result.push({name,desc,link})}return result;}
function services(){const items=servicesData();main.innerHTML=headline('WHAT WE DO','Ideas into experiences.')+`<section class="service-console"><div class="service-nav" role="tablist" aria-label="Our services">${items.map((s,i)=>`<button role="tab" id="service-tab-${i}" aria-controls="service-panel" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-service="${i}"><small>0${i+1}</small><span>${esc(s.name)}</span><i aria-hidden="true"><svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></i></button>`).join('')}</div><article id="service-panel" role="tabpanel" aria-labelledby="service-tab-0" tabindex="0"></article></section><section class="service-reel"><span class="eyebrow">We love what we do.</span>${video(data[1].videos[0])}</section>`;
 function select(i,user){const s=items[i],p=projects.find(p=>slug(p)===['intelligent-music-project','salmo','be-you','solana','camst','thegiornalisti','solana-labs'][i]);const link=data[1].links.find(l=>l.text===s.link),dest=link?'#/project/'+link.url.split('/').filter(Boolean).pop():'#/works';main.querySelectorAll('[data-service]').forEach(b=>{b.setAttribute('aria-selected',+b.dataset.service===i);b.tabIndex=+b.dataset.service===i?0:-1});const panel=$('#service-panel');panel.querySelectorAll('video').forEach(v=>v.pause());panel.setAttribute('aria-labelledby','service-tab-'+i);panel.innerHTML=`<span class="service-number" aria-hidden="true">0${i+1}</span><h2>${esc(s.name)}</h2><p>${esc(s.desc)}</p>${p?`<div class="service-preview">${media(p)}</div>`:''}${s.link?`<a class="action" href="${dest}">${esc(s.link)} <i aria-hidden="true"><svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></i></a>`:''}`;if(!reduce){gsap.killTweensOf(panel.querySelectorAll('*'));const title=panel.querySelector('h2');title.classList.add("service-word");gsap.fromTo(panel.querySelector('.service-preview'),{x:-65,scale:.82,opacity:0},{x:0,scale:1,opacity:1,duration:.85,ease:'power3.out'});gsap.fromTo(panel.querySelectorAll('.service-word'),{y:25,opacity:0},{y:0,opacity:1,duration:.5,stagger:.045,ease:'power3.out'});gsap.fromTo(panel.querySelectorAll('p,.action'),{y:20,opacity:0},{y:0,opacity:1,duration:.65,delay:.18,stagger:.08});}hydrate(panel);videos();if(user&&mobile)scrollTo({top:panel.getBoundingClientRect().top+scrollY-20,behavior:reduce?'instant':'smooth'})}
 main.querySelectorAll('[data-service]').forEach(b=>{b.onclick=()=>select(+b.dataset.service,true);b.onkeydown=e=>{if(!['ArrowDown','ArrowUp','Home','End'].includes(e.key))return;e.preventDefault();let i=e.key==='Home'?0:e.key==='End'?items.length-1:(+b.dataset.service+(e.key==='ArrowDown'?1:-1)+items.length)%items.length;select(i);$('#service-tab-'+i).focus()}});// #/services/3 (from What we do on the home page) opens that service already expanded and brings it into view.
 const part=location.hash.split('/')[2],wanted=part?+part:-1;
 if(wanted>=0&&wanted<items.length){select(wanted);requestAnimationFrame(()=>requestAnimationFrame(()=>{const target=mobile?$('#service-panel'):$('.service-console');scrollTo({top:target.getBoundingClientRect().top+scrollY-(mobile?20:30),behavior:reduce?'instant':'smooth'})}))}else select(0);}
function about(){const lines=clean(data[2]);main.innerHTML=`<section class="studio-opening"><div><span class="eyebrow">THE STUDIO</span><h1>We are ROOF.</h1><p>${esc(lines.slice(0,2).join(' '))}</p><span class="eyebrow">BOLOGNA, ITALY — WORLDWIDE</span></div><div class="studio-identity">${video(brand)}<span>CREATIVE MINDS. SHARED VISION.</span></div></section><section class="studio-story"><div class="story-manifesto"><span class="eyebrow">OUR APPROACH</span><h2>We love<br>what we do.</h2><p>Digital content.<br>Live experiences.</p></div><div>${paras(lines.slice(2))}</div></section><section class="studio-film"><div class="studio-film-intro"><h2>Beyond the screen.</h2><p>Video content. 3D environments. Live experiences.<br>We bring imagination to the stage.</p></div>${video(data[2].videos[0])}</section><section class="clients"><div class="studio-principle"><div class="principle-track"><div class="principle-group"><span>Digital content.</span><svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg><span>Physical impact.</span><svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg><span>Experiences that stay.</span><svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></div><div class="principle-group" aria-hidden="true"><span>Digital content.</span><svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg><span>Physical impact.</span><svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg><span>Experiences that stay.</span><svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></div></div></div><span class="eyebrow">PART OF US</span>${pic(imgs(data[2])[0],'Original ROOF client and collaborator logos',mobile?900:1600)}</section>`;}
function contact(){const lines=clean(data[3]);main.innerHTML=`<section class="contact-scene"><div class="contact-film">${video(data[3].videos[0])}</div><div class="contact-card"><span class="eyebrow">CONTACT</span><h1>Great things<br>start with a hello.</h1><p>${esc(lines[1].replace(/^5/,''))}</p><a class="contact-email" href="mailto:info@roofvideodesign.com">info@roofvideodesign.com <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a><p>${esc(lines[3])}</p><div class="address-row"><address>Roof Videodesign<br>Via Rizzoli 4<br>40125 Bologna, Italy</address><a class="action" href="https://maps.app.goo.gl/zQqFZyZ3rt3q23di9" target="_blank" rel="noopener">Find us on the map <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a></div></div><div class="contact-description">${esc(lines[0])}</div></section>`;}
function project(id){const p=projects.find(p=>slug(p)===id);if(!p){main.innerHTML=headline('404','Project not found.')+'<a class="action" href="#/works">Back to projects</a>';return}const lines=clean(p),ci=lines.findIndex(t=>t.toLowerCase()==='credits'),body=lines.slice(2,ci<0?undefined:ci),credits=ci<0?[]:lines.slice(ci+1).filter(t=>t.toLowerCase()!=='credits'),next=projects[(projects.indexOf(p)+1)%projects.length];main.innerHTML=`<section class="project-cover"><div class="project-cover-media">${media(p)}</div><a class="project-back" href="#/works">← All projects</a><div class="project-cover-caption"><span class="eyebrow">${category(p)}</span><h1>${esc(name(p))}</h1><p>${esc(lines[1])}</p></div><a href="#project-details" class="read-project" aria-label="PROJECT NOTES">↓</a></section><section class="project-content" id="project-details"><aside><span class="eyebrow">PROJECT NOTES</span><h2>${esc(body.shift()||category(p))}</h2><div class="credits"><span class="eyebrow">CREDITS</span>${paras(credits)}</div></aside><div class="project-narrative">${paras(body)}${id==='bosch'?`<a class="action" href="${esc(p.links.find(l=>l.text==='Click Here')?.url)}" target="_blank" rel="noopener">Visit the virtual tour <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a>`:''}<div class="project-gallery">${imgs(p).map((src,i)=>`<button data-image="${esc(src)}" aria-label="Enlarge ${esc(name(p))} image ${i+1}">${pic(src,name(p)+' — image '+(i+1),mobile?800:1400,'loading="lazy"')}</button>`).join('')}</div>${mp4(p).slice(1).map(src=>`<div class="extra-video">${video(src)}</div>`).join('')}${p.videos.filter(v=>v&&v.includes('youtube.com')).map(src=>{const id=(src.match(/embed\/([\w-]{6,})/)||[])[1];return id?`<a class="embed-button yt-link" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener"><span class="yt-inner">Play original YouTube video <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg><small>Opens the video on YouTube in a new tab.</small></span></a>`:''}).join('')}</div></section><a class="next-project" href="${url(next)}"><span class="eyebrow">NEXT PROJECT</span><span>${esc(name(next))}</span><i aria-hidden="true"><svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></i></a>`;$('.read-project').onclick=e=>{e.preventDefault();$('#project-details').scrollIntoView({behavior:reduce?'instant':'smooth'})};main.querySelectorAll('[data-image]').forEach(b=>b.onclick=()=>openLightbox(b));}
function render(){if(location.hash==='#main'&&main.children.length){main.focus();return}if(location.hash==='#project-details'&&$('#project-details')){$('#project-details').scrollIntoView({behavior:reduce?'instant':'smooth'});return}cleanup();if(!routeFlight)document.body.classList.remove('from-services');main.querySelectorAll('video').forEach(v=>v.pause());const path=location.hash.replace(/^#\/?/,'').split('/');if(path[0]==='main'||path[0]==='project-details')path[0]='';$('nav').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');document.body.dataset.page=path[0]||'home';if(!path[0])home();else if(path[0]==='works')works();else if(path[0]==='services')services();else if(path[0]==='about')about();else if(path[0]==='contacts')contact();else if(path[0]==='project')project(path[1]);else main.innerHTML=headline('404','Page not found.');$('nav').querySelectorAll('a').forEach(a=>{if(a.hash===(location.hash||'#/')||(path[0]&&path[0]!=='project'&&a.hash==='#/'+path[0]))a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});hydrate();videos();scrollTo({top:0,behavior:'instant'});dispatchEvent(new Event('scroll'));dispatchEvent(new Event('scroll'));motion('.page-title,.studio-opening,.contact-card');main.focus({preventScroll:true});}
$('.skip').onclick=e=>{e.preventDefault();main.focus()};$('nav').id='navigation';$('#menu').onclick=()=>{const open=$('nav').classList.toggle('open');$('#menu').setAttribute('aria-expanded',open)};document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('nav').classList.remove('open');$('#menu').setAttribute('aria-expanded','false')}});let routeFlight=null;
/* Lightbox: the photo grows out of its thumbnail into a framed viewer, and shrinks back into it on close. */
const lb=$('#lightbox'),lbFrame=lb.querySelector('.lb-frame'),lbImg=lbFrame.querySelector('img');let lbThumb=null,lbBusy=false;
// Locking the page scroll must not change its width (the scrollbar gap is kept), or the thumbnail would move under the closing photo.
function lockScroll(on){const html=document.documentElement;if(on){html.style.paddingRight=(innerWidth-html.clientWidth)+'px';html.classList.add('lb-lock')}else{html.classList.remove('lb-lock');html.style.paddingRight=''}}
function lbRect(el){const r=el.getBoundingClientRect();return{left:r.left,top:r.top,width:r.width,height:r.height}}
function openLightbox(button){
 if(lbBusy||lb.open)return;const thumb=button.querySelector('img');lbThumb=button;
 const ratio=(thumb.naturalWidth&&thumb.naturalHeight)?thumb.naturalWidth/thumb.naturalHeight:1.5;
 const maxW=innerWidth*(mobile?.92:.84),maxH=innerHeight*(mobile?.7:.78);let w=maxW,h=w/ratio;if(h>maxH){h=maxH;w=h*ratio}
 const end={left:(innerWidth-w)/2,top:(innerHeight-h)/2-(mobile?10:14),width:w,height:h};
 lbImg.src=thumb.currentSrc||thumb.src;lbImg.alt=thumb.alt;
 // Sharper copy swaps in silently once downloaded.
 const hi=new Image();hi.src=cdn(button.dataset.image,2000);hi.onload=()=>{if(lb.open&&lbThumb===button)lbImg.src=hi.src};
 const all=[...main.querySelectorAll('[data-image]')];lb.querySelector('.lb-title').textContent=main.querySelector('.project-cover-caption h1')?.textContent||'';lb.querySelector('.lb-count').textContent=String(all.indexOf(button)+1).padStart(2,'0')+' / '+String(all.length).padStart(2,'0');
 lb.showModal();lockScroll(true);
 if(reduce){Object.assign(lbFrame.style,{left:end.left+'px',top:end.top+'px',width:end.width+'px',height:end.height+'px'});return}
 const start=lbRect(button);button.style.visibility='hidden';lbBusy=true;
 gsap.timeline({onComplete(){lbBusy=false}})
  .fromTo(lb.querySelector('.lb-bg'),{opacity:0},{opacity:1,duration:.55,ease:'power2.out'},0)
  .fromTo(lbFrame,{...start,borderRadius:14,rotation:-2,boxShadow:'0 0 0 rgba(0,0,0,0)'},{...end,borderRadius:22,rotation:0,boxShadow:'0 50px 140px rgba(0,0,0,.7)',duration:.85,ease:'expo.out'},0)
  .fromTo(lbImg,{scale:1.18},{scale:1,duration:1.1,ease:'expo.out'},0)
  .fromTo(['.lb-meta','.lb-close'],{opacity:0,y:18},{opacity:1,y:0,duration:.6,stagger:.08,ease:'power3.out'},.3);
}
function closeLightbox(){
 if(!lb.open||lbBusy)return;const button=lbThumb;
 const done=()=>{lb.close();lockScroll(false);if(button)button.style.visibility='';gsap.set(lbFrame,{opacity:1});lbBusy=false};
 if(reduce||!button){done();return}
 lbBusy=true;const back=lbRect(button),radius=parseFloat(getComputedStyle(button).borderTopLeftRadius)||0;
 // The frame glides back and settles exactly like the thumbnail (no tilt, no zoom left over),
 // then the thumbnail is revealed underneath and the frame dissolves into it: no final jump.
 gsap.timeline({onComplete:done})
  .to(['.lb-close','.lb-meta'],{opacity:0,y:12,duration:.25,ease:'power2.in'},0)
  .to(lbImg,{keyframes:[{scale:1.06,duration:.35,ease:'power2.out'},{scale:1,duration:.5,ease:'power3.inOut'}]},0)
  .to(lbFrame,{...back,borderRadius:radius,boxShadow:'0 0 0 rgba(0,0,0,0)',duration:.85,ease:'expo.inOut'},0)
  .to(lbFrame,{keyframes:[{rotation:1.5,duration:.4,ease:'sine.inOut'},{rotation:0,duration:.45,ease:'sine.inOut'}]},0)
  .to(lb.querySelector('.lb-bg'),{opacity:0,duration:.65,ease:'power2.inOut'},.12)
  .call(()=>{button.style.visibility=''},null,.72)
  .to(lbFrame,{opacity:0,duration:.18,ease:'power1.out'},.8);
}
lb.querySelector('.lb-close').onclick=closeLightbox;lb.querySelector('.lb-bg').onclick=closeLightbox;lb.addEventListener('cancel',e=>{e.preventDefault();closeLightbox()});
 document.addEventListener('click',e=>{const link=e.target.closest('a[href^="#/project/"]');if(!link||reduce||e.ctrlKey||e.metaKey||e.shiftKey||e.button!==0)return;const holder=link.closest('.case-layer,.archive-card,#service-panel');const source=holder?.querySelector('.case-media video,.case-media img,.archive-media video,.archive-media img,.service-preview video,.service-preview img');if(!source||routeFlight)return;e.preventDefault();
  const r=source.getBoundingClientRect(),radius=getComputedStyle(source.parentElement).borderRadius;
  // The page behind goes dark while the clip lifts off.
  const veil=document.createElement('div');veil.className='route-veil';document.body.append(veil);
  const shell=document.createElement('div');shell.className='route-flight';shell.style.cssText=`left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;border-radius:${radius}`;
  if(source.tagName==='VIDEO'){
   // The real, already playing clip travels (no restart, no black box); a still frame stays behind in its place.
   const posterBg=source.parentElement&&source.parentElement.style.backgroundImage;if(posterBg)shell.style.backgroundImage=posterBg;
   const still=document.createElement('canvas');still.className='route-still';still.width=source.videoWidth||16;still.height=source.videoHeight||9;try{still.getContext('2d').drawImage(source,0,0,still.width,still.height)}catch(_){}
   source.replaceWith(still);shell.append(source);source.play().catch(()=>{});
  }else shell.append(source.cloneNode(true));
  document.body.append(shell);routeFlight={shell,veil};document.body.classList.toggle('from-services',!!link.closest('#service-panel'));
  gsap.to(veil,{opacity:1,duration:.55,ease:'power2.out'});
  if(link.closest('.case-layer')){
   // From the home page: the clip shrinks with rounded corners, tilts, drifts a little, then flies into place.
   gsap.timeline({onComplete(){location.hash=link.hash}})
    .to(shell,{scale:.68,borderRadius:28,transformPerspective:1100,rotationY:16,rotationX:5,duration:.65,ease:'power3.inOut'})
    .to(shell,{x:innerWidth*.12,y:-20,duration:.5,ease:'power2.inOut'});
  }else gsap.to(shell,{scale:1.04,borderRadius:18,duration:.45,ease:'power2.out',onComplete(){location.hash=link.hash}});
 });
 addEventListener('hashchange',()=>{const flight=routeFlight;render();if(!flight)return;
  const target=$('.project-cover-media'),texts=main.querySelectorAll('.project-cover-caption>*,.project-back,.read-project');
  const finish=()=>{flight.shell.remove();flight.veil.remove();routeFlight=null;hydrate();videos()};
  if(!target){finish();return}
  // The new page is built under the dark veil; its texts wait for the clip to land, so nothing flashes or re-appears.
  gsap.set(texts,{opacity:0});target.style.visibility='hidden';
  const r=target.getBoundingClientRect();
  gsap.timeline({onComplete(){target.style.visibility='';finish();gsap.fromTo(texts,{y:26,opacity:0},{y:0,opacity:1,duration:.75,stagger:.08,ease:'power3.out',clearProps:'transform'})}})
   .to(flight.shell,{left:r.left,top:r.top,width:r.width,height:r.height,scale:1,x:0,y:0,rotationX:0,rotationY:0,borderRadius:0,duration:1.05,ease:'power3.inOut'})
   .to(flight.veil,{opacity:0,duration:.6,ease:'power2.inOut'},'-=.5');
 });prepareBoot();render();boot();
const cursor=document.createElement('div');cursor.className='discover-cursor';cursor.innerHTML='SCROLL TO<br>DISCOVER';document.body.append(cursor);
addEventListener('pointermove',e=>{cursor.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0) translate(-50%,-50%)`;cursor.style.opacity=document.body.dataset.page==='home'&&e.clientY>100&&!e.target.closest('a,button')&&window.scrollY<innerHeight?'1':'0'});
addEventListener('scroll',()=>{if(scrollY>innerHeight)cursor.style.opacity=0},{passive:true});

if(!reduce&&matchMedia('(hover:hover) and (pointer:fine)').matches){
 main.addEventListener('pointermove',e=>{const card=e.target.closest('.archive-card');if(!card)return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;const m=card.querySelector('.archive-media');m.style.transform=`perspective(950px) rotateX(${y*13}deg) rotateY(${-x*13}deg) translateZ(12px)`;m.style.setProperty('--glow-x',((x+.5)*100)+'%');m.style.setProperty('--glow-y',((y+.5)*100)+'%')});
 main.addEventListener('pointerout',e=>{const card=e.target.closest('.archive-card');if(card&&!card.contains(e.relatedTarget)){card.querySelector('.archive-media').style.transform='';}});
}
/* Home header: hides while scrolling down, glides back in when scrolling up. */
(()=>{const header=$('header');let lastY=scrollY;addEventListener('scroll',()=>{const y=scrollY;if(document.body.dataset.page!=='home'){header.classList.remove('is-hidden','is-scrolled');lastY=y;return}header.classList.toggle('is-scrolled',y>40);if($('nav').classList.contains('open')||y<120||y<lastY-6)header.classList.remove('is-hidden');else if(y>lastY+6)header.classList.add('is-hidden');lastY=y},{passive:true})})();
