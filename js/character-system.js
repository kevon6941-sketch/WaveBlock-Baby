
(()=> {
const defs=[
 {id:'wavebaby',name:'小波',x:49,y:72,mood:'happy'},
 {id:'fisher',name:'漁夫阿海',x:22,y:62,mood:'happy'},
 {id:'cat',name:'小橘',x:31,y:69,mood:'happy'},
 {id:'turtle',name:'海龜阿綠',x:69,y:61,mood:'happy'},
 {id:'dolphin',name:'小藍',x:79,y:54,mood:'happy'},
 {id:'seagull',name:'海鷗',x:61,y:31,mood:'happy'},
 {id:'citizen',name:'海港朋友',x:87,y:67,mood:'happy'}
];
class CharacterSystem{
 constructor(layer){this.layer=layer;this.actors=new Map();this.selected=0;this.mount();this.bind();}
 mount(){defs.forEach((d,i)=>{const el=document.createElement('button');el.className='actor';el.type='button';el.setAttribute('data-actor',d.id);el.dataset.mood=d.mood;el.dataset.selected=i===0?'true':'false';el.style.left=d.x+'%';el.style.top=d.y+'%';el.innerHTML=`<img src="assets/characters-v4/${d.id}.webp" alt="${d.name}"><span class="actor-name">${d.name}</span>`;el.addEventListener('click',()=>{this.selected=i;this.paint();this.interact();});this.layer.appendChild(el);this.actors.set(d.id,el);});}
 paint(){[...this.actors.values()].forEach((e,i)=>e.dataset.selected=i===this.selected?'true':'false');}
 selectNext(){this.selected=(this.selected+1)%defs.length;this.paint();}
 interact(){const d=defs[this.selected], el=this.actors.get(d.id);this.setMood(d.id,'happy');window.dispatchEvent(new CustomEvent('waveblock:actor-interact',{detail:d}));el.animate([{transform:'translate(-50%,-100%) scale(1)'},{transform:'translate(-50%,-105%) scale(1.1)'},{transform:'translate(-50%,-100%) scale(1)'}],{duration:380});}
 back(){this.selected=0;this.paint();}
 setMood(id,mood){const el=this.actors.get(id);if(el)el.dataset.mood=mood;}
 moveTo(id,x,y){const el=this.actors.get(id);if(el){el.style.left=x+'%';el.style.top=y+'%';}}
 bind(){document.addEventListener('keydown',e=>{if(e.code==='KeyA')this.selectNext();if(e.code==='KeyB')this.interact();if(e.code==='KeyC')this.back();});
 const buttons=[...document.querySelectorAll('.abc-btn,.control-button,.key-btn')];buttons.forEach(b=>{const t=(b.textContent||'').trim().toUpperCase();if(t.startsWith('A'))b.addEventListener('click',()=>this.selectNext());if(t.startsWith('B'))b.addEventListener('click',()=>this.interact());if(t.startsWith('C'))b.addEventListener('click',()=>this.back());});}
}
window.CharacterSystem=CharacterSystem;
document.addEventListener('DOMContentLoaded',()=>{const layer=document.getElementById('character-layer');if(layer)window.waveCharacters=new CharacterSystem(layer);});
})();
