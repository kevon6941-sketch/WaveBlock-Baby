
(()=>{
const KEY='waveblock-v40-save';
const defaultState={day:1,hunger:82,mood:90,clean:78,durability:86,selected:0,fish:0};
let state={...defaultState,...JSON.parse(localStorage.getItem(KEY)||'{}')};
const actions=['feed','clean','fish','wave','repair','sleep'];
const labels={feed:'餵食',clean:'清潔',fish:'釣魚',wave:'抗浪',repair:'修補',sleep:'睡眠'};
const say=t=>document.querySelector('#speech').textContent='小波：「'+t+'」';
const clamp=n=>Math.max(0,Math.min(100,n));
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function render(){for(const k of ['hunger','mood','clean','durability']){document.querySelector('#'+k).value=state[k];document.querySelector('#'+k+'N').textContent=state[k]}document.querySelector('#day').textContent=`DAY ${state.day} ☀️`;document.querySelectorAll('[data-action]').forEach((b,i)=>b.classList.toggle('selected',i===state.selected));save()}
function selectNext(){state.selected=(state.selected+1)%actions.length;render();say('選到「'+labels[actions[state.selected]]+'」了！')}
function confirmSelected(){run(actions[state.selected])}
function goBack(){closeMini();say('回到海港囉！')}
function run(a){
 if(a==='feed'){state.hunger=clamp(state.hunger+18);state.mood=clamp(state.mood+3);say('好好吃！飽足恢復了～')}
 if(a==='clean'){state.clean=100;state.mood=clamp(state.mood+4);say('洗得亮晶晶！')}
 if(a==='repair'){state.durability=clamp(state.durability+20);say('裂縫修補完成！')}
 if(a==='sleep'){state.day++;state.hunger=clamp(state.hunger-12);state.mood=clamp(state.mood+10);state.durability=clamp(state.durability+7);say('睡飽了，新的一天開始！')}
 if(a==='fish')startFishing();
 if(a==='wave')startWaveChallenge();
 render()
}
let miniRAF=0,phase=0,kind='';
function openMini(title){document.querySelector('#minigame').classList.remove('hidden');document.querySelector('#miniTitle').textContent=title}
function closeMini(){cancelAnimationFrame(miniRAF);document.querySelector('#minigame').classList.add('hidden');document.querySelector('#miniArena').innerHTML='';kind=''}
function startFishing(){kind='fish';openMini('🎣 釣魚：游標接近魚時按 B！');spawnTarget();animateTarget()}
function startWaveChallenge(){kind='wave';openMini('🌊 抗浪：浪頭進入中央時按 B！');spawnTarget();animateTarget()}
function spawnTarget(){document.querySelector('#miniArena').innerHTML='<div class="target"></div>';phase=0}
function animateTarget(){phase+=.025;const t=document.querySelector('.target');if(t){const x=10+80*((Math.sin(phase)+1)/2);t.style.left=x+'%';t.style.top=(kind==='fish'?65:50)+'%'}miniRAF=requestAnimationFrame(animateTarget)}
function miniHit(){const t=document.querySelector('.target');if(!t)return;const x=parseFloat(t.style.left);const good=Math.abs(x-50)<13;if(good){if(kind==='fish'){state.fish++;state.hunger=clamp(state.hunger+7);state.mood=clamp(state.mood+8);say('釣到了！新鮮魚獲 +1 🎣')}else{state.durability=clamp(state.durability+5);state.mood=clamp(state.mood+5);say('成功擋下大浪！🌊')}}else{if(kind==='wave')state.durability=clamp(state.durability-8);say('差一點！再抓準時機。')}render();spawnTarget()}
document.querySelectorAll('[data-action]').forEach((b,i)=>b.onclick=()=>{state.selected=i;render();run(actions[i])});
document.querySelector('#btnA').onclick=selectNext;document.querySelector('#btnB').onclick=confirmSelected;document.querySelector('#btnC').onclick=goBack;
document.querySelector('#miniTap').onclick=miniHit;document.querySelector('#miniClose').onclick=closeMini;
document.addEventListener('keydown',e=>{if(e.code==='KeyA')selectNext();if(e.code==='KeyB'){document.querySelector('#minigame').classList.contains('hidden')?confirmSelected():miniHit()}if(e.code==='KeyC')goBack()});
setInterval(()=>{state.hunger=clamp(state.hunger-1);state.clean=clamp(state.clean-1);render()},60000);
window.selectNext=selectNext;window.confirmSelected=confirmSelected;window.goBack=goBack;window.startFishing=startFishing;window.startWaveChallenge=startWaveChallenge;
render();
})();
