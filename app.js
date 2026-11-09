const WA='244933827587',$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const D=window.PRODUCTS,byId=Object.fromEntries(D.map(p=>[p.id,p]));
const wa=p=>`https://wa.me/${WA}?text=`+encodeURIComponent(p?`Olá, Realc! Gostaria de encomendar: ${p.t}${p.p[0]=='S'?'':' ('+p.p+' Kz)'}.`:'Olá, Realc! Gostaria de mais informações.');
$$('[data-wa]').forEach(a=>a.href=wa(byId[a.dataset.wa]));
$('#y').textContent=new Date().getFullYear();
/* intro */
const intro=$('#intro');let done=false;
function endIntro(){if(done)return;done=true;intro.classList.add('out');setTimeout(()=>intro.classList.add('gone'),1200);reveal()}
setTimeout(endIntro,3300);intro.addEventListener('click',endIntro);
/* reveal */
document.documentElement.classList.add('js');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
function reveal(){$$('.rv').forEach(e=>io.observe(e))}
setTimeout(()=>$$('.rv').forEach(e=>e.classList.add('in')),6000);
/* contadores */
$$('[data-n]').forEach(el=>{const n=+el.dataset.n,f=new Intl.NumberFormat('pt-PT');let t0;const s=t=>{t0=t0||t;const k=Math.min((t-t0)/1800,1);el.textContent=f.format(Math.round(n*(1-Math.pow(1-k,3))));k<1&&requestAnimationFrame(s)};setTimeout(()=>requestAnimationFrame(s),3000)});
/* parallax hero */
const stk=$('.stack');if(stk&&matchMedia('(hover:hover)').matches)stk.addEventListener('pointermove',e=>{const b=stk.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;$$('.fr').forEach((f,i)=>f.style.translate=`${x*(14+i*8)}px ${y*(10+i*6)}px`)});
/* galeria 3D */
const G=D,N=G.length,ring=$('#ring'),stage=$('.stage');
ring.innerHTML=G.map(p=>`<div class="sl glass d" data-id="${p.id}"><img src="img/p/${p.id}.webp" alt="${p.t}" loading="lazy"></div>`).join('');
const sl=$$('.sl'),still=matchMedia('(prefers-reduced-motion:reduce)').matches;
let ang=0,vel=0,auto=!still,drag=false,lx=0,moved=0,cur=-1;
function size(){const cw=Math.min(230,innerWidth*.56);stage.style.setProperty('--cw',cw+'px');return cw}
let R=0;function layout(){const cw=size();R=Math.round(cw/2/Math.tan(Math.PI/N)*1.06);sl.forEach((s,i)=>s.style.transform=`rotateY(${i*360/N}deg) translateZ(${R}px)`)}
layout();addEventListener('resize',layout);
function frame(){if(!drag){if(auto)ang-=.09;ang+=vel;vel*=.94}
ring.style.transform=`translateZ(${-R}px) rotateY(${ang}deg)`;
let best=0,bd=999;sl.forEach((s,i)=>{const a=(((i*360/N+ang)%360)+540)%360-180,d=Math.abs(a);if(d<bd){bd=d;best=i}s.style.opacity=.3+.7*Math.max(0,1-d/150)});
if(best!==cur){cur=best;const p=G[best];$('#cap').innerHTML=`<h3>${p.t}</h3><p>${p.b}${p.p[0]=='S'?'':' · '+p.p+' Kz'}</p>`}
requestAnimationFrame(frame)}frame();
stage.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;moved=0;vel=0});
addEventListener('pointerup',()=>drag=false);
addEventListener('pointermove',e=>{if(!drag)return;const d=e.clientX-lx;lx=e.clientX;moved+=Math.abs(d);ang+=d*.25;vel=d*.04});
stage.addEventListener('click',e=>{const s=e.target.closest('.sl');if(s&&moved<6)open(s.dataset.id)});
const turn=k=>{ang+=k*360/N};$('#prev').onclick=()=>turn(1);$('#next').onclick=()=>turn(-1);
$('#pp').onclick=e=>{auto=!auto;e.currentTarget.setAttribute('aria-label',auto?'Pausar':'Retomar');e.currentTarget.innerHTML=auto?'<svg viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></svg>':'<svg viewBox="0 0 24 24"><path d="M7 5l12 7-12 7z"/></svg>'};
/* filtros */
$$('.chips button').forEach(b=>b.onclick=()=>{$$('.chips button').forEach(x=>x.classList.remove('on'));b.classList.add('on');$$('.pc').forEach(c=>c.hidden=!(b.dataset.f=='all'||c.dataset.c==b.dataset.f))});
$$('[data-f-link]').forEach(a=>a.addEventListener('click',()=>{const b=$(`.chips button[data-f="${a.dataset.fLink}"]`);b&&b.click()}));
/* lightbox */
const lb=$('#lb');let lid=null;
function open(id){const p=byId[id];lid=id;$('#lbi').src=`img/p/${id}.webp`;$('#lbi').alt=p.t;$('#lbb').textContent=p.b+(p.s?' · '+p.s:'');$('#lbn').textContent=p.t;$('#lbd').textContent=p.d;
$('#lbp').innerHTML=p.p[0]=='S'?'<span class="pr q">Preço sob consulta</span>':`<span class="pr">${p.p}<i>Kz</i></span>`;$('#lbw').href=wa(p);lb.classList.add('on');document.body.style.overflow='hidden';$('.x').focus()}
function close(){lb.classList.remove('on');document.body.style.overflow=''}
$$('[data-open]').forEach(e=>e.addEventListener('click',()=>open(e.dataset.open)));
$('.x').onclick=close;lb.addEventListener('click',e=>{if(e.target===lb)close()});addEventListener('keydown',e=>{if(e.key=='Escape')close()});
