function randomCoastEvent(game){
 const r=Math.random();
 if(r<.25){game.showNpc("turtle",3200);game.s.eco=clamp(game.s.eco+2);game.say("🐢 海龜從小波前面慢慢游過～");game.tag("海洋朋友")}
 else if(r<.42){game.showNpc("guard",3000);game.say("海巡隊員巡邏經過，向小波揮揮手。");game.tag("🛟 海岸巡邏")}
 else if(r<.58){game.s.clean=clamp(game.s.clean+8);game.s.eco=clamp(game.s.eco+3);game.say("今天有人來淨灘，海岸變乾淨了！");game.tag("🧹 市民淨灘")}
 game.render();
}