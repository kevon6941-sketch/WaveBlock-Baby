const DEFAULT_STATE={day:1,hunger:80,happy:85,clean:100,dur:100,sel:0,night:false,sleep:false,fish:0,waveExp:0,friend:0,eco:10,materials:{水泥:3,砂:4,骨材:3,修補砂漿:2,模板:1,灌漿材料:1},memories:["第 1 天｜小波來到海邊"]};
function loadState(){try{const x=JSON.parse(localStorage.getItem("waveblock-v2")||"{}");return {...DEFAULT_STATE,...x,materials:{...DEFAULT_STATE.materials,...(x.materials||{})}}}catch(e){return JSON.parse(JSON.stringify(DEFAULT_STATE))}}
function saveState(s){localStorage.setItem("waveblock-v2",JSON.stringify(s))}
function clamp(v){return Math.max(0,Math.min(100,v))}