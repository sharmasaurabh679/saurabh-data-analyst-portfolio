const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
let motionOn=true, continuous=[];

function safeAnime(opts){ try { const a=anime(opts); continuous.push(a); return a; } catch(e){ console.warn(e); } }
function animate(opts){ if(!motionOn)return; try{return anime(opts)}catch(e){console.warn(e)} }

document.addEventListener('mousemove',e=>{
 const c=q('#cursor'); if(c){c.style.left=e.clientX+'px';c.style.top=e.clientY+'px'}
});
document.addEventListener('mouseover',e=>{
 if(e.target.closest('a,button,article')) animate({targets:'#cursor',scale:2.4,duration:220});
});
document.addEventListener('mouseout',e=>{
 if(e.target.closest('a,button,article')) animate({targets:'#cursor',scale:1,duration:220});
});

const savedTheme=localStorage.getItem('portfolio-theme');
if(savedTheme==='dark')document.body.classList.add('dark');
q('#theme').onclick=()=>{
 document.body.classList.toggle('dark');
 localStorage.setItem('portfolio-theme',document.body.classList.contains('dark')?'dark':'light');
 animate({targets:'body',opacity:[.82,1],duration:350,easing:'easeOutQuad'});
};



function startHero(){
 animate({targets:'header',translateY:[-90,0],opacity:[0,1],duration:850,easing:'easeOutExpo'});
 animate({targets:'.status,.kicker',opacity:[0,1],translateX:[-45,0],delay:anime.stagger(110),duration:850,easing:'easeOutExpo'});
 animate({targets:'h1 span',opacity:[0,1],translateY:[120,0],skewY:[7,0],delay:anime.stagger(150),duration:1300,easing:'easeOutExpo'});
 animate({targets:'.intro,.actions',opacity:[0,1],translateY:[35,0],delay:anime.stagger(130),duration:900,easing:'easeOutExpo'});
 animate({targets:'.data-stage',opacity:[0,1],scale:[.75,1],rotate:[-8,0],duration:1500,easing:'easeOutElastic(1,.65)'});
 animate({targets:'.chart polyline',strokeDashoffset:[1200,0],duration:2200,delay:500,easing:'easeInOutSine'});
 qa('[data-count]').forEach(el=>animate({targets:{v:0},v:+el.dataset.count,round:1,duration:2000,delay:500,easing:'easeOutExpo',update:a=>el.textContent=a.animations[0].currentValue}));
}
startHero();

const particles=q('#dataParticles');
if(particles){
 for(let i=0;i<120;i++){let p=document.createElement('i'),a=Math.random()*Math.PI*2,r=Math.sqrt(Math.random())*210;p.style.left=260+Math.cos(a)*r+'px';p.style.top=260+Math.sin(a)*r+'px';particles.appendChild(p)}
}
safeAnime({targets:'.data-particles i',scale:[.15,1.7,.5],opacity:[.08,1,.25],delay:anime.stagger(14,{from:'center'}),direction:'alternate',loop:true,duration:1500,easing:'easeInOutSine'});
safeAnime({targets:'.sweep',rotate:360,duration:5200,loop:true,easing:'linear'});
safeAnime({targets:'.orbit1',rotate:360,scale:[1,.96,1],duration:16000,loop:true,easing:'linear'});
safeAnime({targets:'.orbit2',rotate:-360,scale:[1,1.04,1],duration:22000,loop:true,easing:'linear'});
safeAnime({targets:'.core-cube',rotateZ:[45,405],rotateX:[55,235],duration:7000,loop:true,easing:'linear'});
safeAnime({targets:'.core',translateY:[-8,8],direction:'alternate',loop:true,duration:2200,easing:'easeInOutSine'});
safeAnime({targets:'.float-card',translateY:()=>[anime.random(-10,-4),anime.random(5,13)],rotate:()=>anime.random(-2,2),direction:'alternate',loop:true,duration:()=>anime.random(1800,3000),delay:anime.stagger(250),easing:'easeInOutSine'});
safeAnime({targets:'.bars i',height:()=>[anime.random(15,40)+'%',anime.random(60,100)+'%'],delay:anime.stagger(120),direction:'alternate',loop:true,duration:1500,easing:'easeInOutQuad'});
safeAnime({targets:'.mini-chart i',height:()=>[anime.random(15,45)+'%',anime.random(60,100)+'%'],delay:anime.stagger(90),direction:'alternate',loop:true,duration:1300,easing:'easeInOutSine'});
safeAnime({targets:'.donut',rotate:360,duration:14000,loop:true,easing:'linear'});
safeAnime({targets:'.status i',scale:[.6,1.5],opacity:[.4,1],direction:'alternate',loop:true,duration:650,easing:'easeInOutSine'});
safeAnime({targets:'.scroll span',translateY:[0,9],direction:'alternate',loop:true,duration:650,easing:'easeInOutSine'});

const term=q('#terminalText');
if(term){
 const lines=["$ SELECT * FROM raw_data;","✓ 48,291 rows loaded","$ CLEAN → ANALYZE → VISUALIZE","✓ insight confidence: 94.8%"];
 let li=0,ci=0,text='';
 (function type(){if(li>=lines.length){setTimeout(()=>{li=0;ci=0;text='';type()},1800);return}if(ci<lines[li].length){text+=lines[li][ci++];term.textContent=text+'▌';setTimeout(type,28)}else{text+='\n';li++;ci=0;setTimeout(type,220)}})();
}

const revealMap=[
 ['.section-head', el=>animate({targets:[...el.children],opacity:[0,1],translateY:[65,0],delay:anime.stagger(100),duration:950,easing:'easeOutExpo'})],
 ['.about-grid', el=>{animate({targets:el.querySelector('.big-copy'),opacity:[0,1],translateX:[-90,0],duration:1100,easing:'easeOutExpo'});animate({targets:[...el.querySelector('.about-text').children],opacity:[0,1],translateY:[45,0],delay:anime.stagger(130),duration:900,easing:'easeOutExpo'})}],
 ['.skill-layout', el=>{animate({targets:[...el.querySelector('.skill-copy').children],opacity:[0,1],translateX:[-60,0],delay:anime.stagger(120),duration:900,easing:'easeOutExpo'});el.querySelectorAll('[data-level]').forEach((row,i)=>{animate({targets:row,opacity:[0,1],translateX:[70,0],delay:i*90,duration:700,easing:'easeOutExpo'});animate({targets:row.querySelector('i'),width:[0,row.dataset.level+'%'],delay:250+i*100,duration:1200,easing:'easeOutExpo'})})}],
 ['.project', el=>{animate({targets:el.querySelector('.visual'),opacity:[0,1],scale:[.78,1],rotateY:[10,0],duration:1200,easing:'easeOutExpo'});animate({targets:[...el.querySelector('.project-copy').children],opacity:[0,1],translateY:[50,0],delay:anime.stagger(110),duration:850,easing:'easeOutExpo'});el.classList.add('active')}],
 ['.cert-grid', el=>animate({targets:[...el.children],opacity:[0,1],translateY:[80,0],rotate:[3,0],delay:anime.stagger(150),duration:1000,easing:'easeOutExpo'})],
 ['.timeline', el=>animate({targets:[...el.children],opacity:[0,1],translateX:[-80,0],delay:anime.stagger(150),duration:950,easing:'easeOutExpo'})],
 ['.contact-wrap', el=>animate({targets:[...el.children],opacity:[0,1],translateY:[70,0],scale:[.9,1],delay:anime.stagger(120),duration:1000,easing:'easeOutExpo'})]
];
const seen=new WeakSet();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
 if(!entry.isIntersecting||seen.has(entry.target))return;
 seen.add(entry.target);
 const item=revealMap.find(([sel])=>entry.target.matches(sel)); if(item)item[1](entry.target);
}),{threshold:.12});
revealMap.forEach(([sel])=>qa(sel).forEach(el=>observer.observe(el)));

const sections=qa('main section'), navs=qa('nav a');
function onScroll(){
 const max=document.documentElement.scrollHeight-innerHeight, pct=max?scrollY/max:0;
 q('.progress-rail i').style.height=pct*100+'%';
 const stage=q('.data-stage'); if(stage&&motionOn)stage.style.transform=`translateY(${scrollY*.035}px)`;
 let current=sections[0];
 sections.forEach(s=>{if(scrollY>=s.offsetTop-innerHeight*.42)current=s});
 const id=current.id, idx=sections.indexOf(current);
 navs.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));
 q('.section-indicator b').textContent=String(idx).padStart(2,'0');
 q('.section-indicator span').textContent=id.toUpperCase();
}
addEventListener('scroll',onScroll,{passive:true});onScroll();

qa('.cert-grid article,.project,.skill-list>div').forEach(card=>{
 card.addEventListener('mouseenter',()=>animate({targets:card,translateY:-8,scale:1.015,duration:280,easing:'easeOutQuad'}));
 card.addEventListener('mouseleave',()=>animate({targets:card,translateY:0,scale:1,duration:350,easing:'easeOutQuad'}));
 card.addEventListener('click',e=>{const link=card.querySelector('a');if(link&&e.target.tagName!=='A')link.click()});
});

// ===== CREAM RED ANALYTICS MOTION ENGINE =====
const canvas=q('#matrixCanvas'), ctx=canvas?.getContext('2d');
let dataNodes=[];
function sizeCanvas(){if(!canvas)return;canvas.width=innerWidth;canvas.height=innerHeight;dataNodes=Array.from({length:Math.min(80,Math.floor(innerWidth/18))},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,v:Math.random()*.45+.12,r:Math.random()*1.7+.4}))}
function drawAnalyticsBg(){if(!ctx)return;ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle=getComputedStyle(document.body).getPropertyValue('--accent').trim();dataNodes.forEach((p,i)=>{p.y-=p.v;if(p.y<0)p.y=canvas.height;ctx.globalAlpha=.25+Math.sin(Date.now()/700+i)*.15;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();if(i%5===0){ctx.globalAlpha=.08;ctx.fillRect(p.x,p.y,1,anime.random(20,90))}});requestAnimationFrame(drawAnalyticsBg)}
sizeCanvas();addEventListener('resize',sizeCanvas);drawAnalyticsBg();

safeAnime({targets:'.analytics-hud',translateY:()=>[anime.random(-8,-3),anime.random(4,10)],direction:'alternate',loop:true,duration:()=>anime.random(1700,2800),delay:anime.stagger(240),easing:'easeInOutSine'});
safeAnime({targets:'.analytics-hud i',scaleX:[.2,1],opacity:[.4,1],direction:'alternate',loop:true,duration:1300,delay:anime.stagger(220),easing:'easeInOutQuad'});
safeAnime({targets:'.ticker-ring',rotate:360,duration:18000,loop:true,easing:'linear'});
safeAnime({targets:'.chart-scanner',translateX:[0,innerWidth*.88],opacity:[0,1,1,0],duration:3800,loop:true,easing:'easeInOutSine'});
safeAnime({targets:'.signal',strokeDashoffset:[1800,0],duration:3000,loop:true,direction:'alternate',easing:'easeInOutSine'});

const analyticsStrip=q('.analytics-strip');
let analyticsPlayed=false;
if(analyticsStrip){
 const analyticsObs=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting||analyticsPlayed)return;analyticsPlayed=true;
  animate({targets:'.stream-head>*',opacity:[0,1],translateY:[20,0],delay:anime.stagger(100),duration:700,easing:'easeOutExpo'});
  qa('.scramble').forEach((el,i)=>{
   const final=parseFloat(el.dataset.final), obj={v:0};
   animate({targets:obj,v:final,duration:1800,delay:250+i*160,easing:'easeOutExpo',update:()=>{el.textContent=(el.dataset.final.startsWith('+')?'+':'')+obj.v.toFixed(1)}});
  });
  qa('.kpi-stream i').forEach((bar,i)=>animate({targets:bar,width:[0,bar.dataset.fill+'%'],delay:350+i*150,duration:1300,easing:'easeOutExpo'}));
 }),{threshold:.25});analyticsObs.observe(analyticsStrip);
}

// analytical pulse: metric values gently update forever
setInterval(()=>{
 if(!motionOn)return;
 qa('.analytics-hud b').forEach(el=>animate({targets:el,opacity:[1,.35,1],translateY:[0,-3,0],duration:500,easing:'easeInOutQuad'}));
},2400);

// click visualizations to replay their analytical animation
qa('.visual').forEach(v=>v.addEventListener('click',()=>{
 animate({targets:v,scale:[1,.97,1],duration:450,easing:'easeOutQuad'});
 const bars=v.querySelectorAll('.bars i,.mini-chart i');
 if(bars.length) animate({targets:[...bars],height:()=>anime.random(20,100)+'%',delay:anime.stagger(70),duration:650,easing:'easeOutExpo'});
 const donut=v.querySelector('.donut');if(donut)animate({targets:donut,rotate:'+=360',scale:[1,.9,1],duration:900,easing:'easeOutExpo'});
}));

// V5 analytical project motion
safeAnime({targets:'.excel-bars i',height:()=>[anime.random(15,35)+'%',anime.random(55,100)+'%'],delay:anime.stagger(100),direction:'alternate',loop:true,duration:1500,easing:'easeInOutSine'});
const py=q('.py-points');if(py){for(let i=0;i<55;i++){let p=document.createElement('i');p.style.left=anime.random(5,95)+'%';p.style.top=anime.random(5,95)+'%';py.appendChild(p)}}
safeAnime({targets:'.py-points i',translateX:()=>anime.random(-30,30),translateY:()=>anime.random(-30,30),opacity:[.15,1,.2],scale:[.5,1.8,.5],delay:anime.stagger(25),direction:'alternate',loop:true,duration:1800,easing:'easeInOutSine'});
safeAnime({targets:'.warehouse i',scaleY:[.65,1],transformOrigin:'bottom',delay:anime.stagger(130),direction:'alternate',loop:true,duration:1600,easing:'easeInOutQuad'});
safeAnime({targets:'.snow-flow span',translateX:[-4,4],opacity:[.3,1],delay:anime.stagger(180),direction:'alternate',loop:true,duration:650,easing:'easeInOutSine'});
qa('.credential-lines article').forEach(card=>{card.addEventListener('mouseenter',()=>animate({targets:card,translateX:12,duration:300,easing:'easeOutQuad'}));card.addEventListener('mouseleave',()=>animate({targets:card,translateX:0,duration:300,easing:'easeOutQuad'}));card.addEventListener('click',e=>{if(e.target.tagName!=='A')card.querySelector('a')?.click()})});

// V6 credential analytical pulse
safeAnime({targets:'.credential-note span',opacity:[.35,1],direction:'alternate',loop:true,duration:900,easing:'easeInOutSine'});
qa('.verified-credentials article').forEach((card,i)=>{
 card.addEventListener('mouseenter',()=>{
  animate({targets:card.querySelectorAll('span,small,h3,p,a'),translateX:[0,6],delay:anime.stagger(35),duration:280,easing:'easeOutQuad'});
 });
 card.addEventListener('click',e=>{
  if(e.target.tagName!=='A') card.querySelector('a')?.click();
 });
});

// V7 certificate carousel: active card cycles one-by-one and remains manually scrollable.
const certGallery=q('.cert-gallery'), certCards=qa('.cert-card'), certDots=q('.cert-dots');
let certIndex=0, certTimer, certUser=false;
if(certDots) certCards.forEach((_,i)=>{const d=document.createElement('i');if(i===0)d.classList.add('active');d.onclick=()=>goCert(i);certDots.appendChild(d)});
function goCert(i){
 if(!certCards.length || !certGallery)return;
 certIndex=(i+certCards.length)%certCards.length;
 const card=certCards[certIndex];
 const left=card.offsetLeft-(certGallery.clientWidth-card.offsetWidth)/2;
 certGallery.scrollTo({left:Math.max(0,left),behavior:'smooth'});
 qa('.cert-dots i').forEach((d,n)=>d.classList.toggle('active',n===certIndex));
 animate({targets:card,scale:[.94,1.025,1],rotateY:[-3,0],duration:850,easing:'easeOutExpo'});
}
function startCertCycle(){clearInterval(certTimer);certTimer=setInterval(()=>{if(!certUser)goCert(certIndex+1)},3000)}
if(certGallery){
 certGallery.addEventListener('mouseenter',()=>certUser=true);certGallery.addEventListener('mouseleave',()=>certUser=false);
 certGallery.addEventListener('touchstart',()=>certUser=true,{passive:true});certGallery.addEventListener('touchend',()=>setTimeout(()=>certUser=false,1800),{passive:true});
 startCertCycle();
}
safeAnime({targets:'.contact-radar i:nth-child(3)',rotate:360,duration:2600,loop:true,easing:'linear'});
safeAnime({targets:'.contact-radar i:nth-child(1),.contact-radar i:nth-child(2)',scale:[.82,1.08],opacity:[.35,1,.35],delay:anime.stagger(280),direction:'alternate',loop:true,duration:1700,easing:'easeInOutSine'});
safeAnime({targets:'.form-head b',opacity:[.35,1],direction:'alternate',loop:true,duration:700,easing:'easeInOutSine'});
qa('.contact-links a').forEach(a=>{a.addEventListener('mouseenter',()=>animate({targets:a,translateX:10,duration:280,easing:'easeOutQuad'}));a.addEventListener('mouseleave',()=>animate({targets:a,translateX:0,duration:280,easing:'easeOutQuad'}))});
const messageForm=q('#messageForm');
if(messageForm)messageForm.addEventListener('submit',e=>{
 e.preventDefault();
 const name=q('#contactName').value.trim(), email=q('#contactEmail').value.trim(), message=q('#contactMessage').value.trim();
 const subject=encodeURIComponent(`Portfolio message from ${name}`);
 const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
 q('#formStatus').textContent='OPENING EMAIL CLIENT / MESSAGE READY';
 animate({targets:'.message-form button',scale:[1,.97,1],duration:500,easing:'easeOutQuad'});
 window.location.href=`mailto:saurabhsharma.yash2004@gmail.com?subject=${subject}&body=${body}`;
});
