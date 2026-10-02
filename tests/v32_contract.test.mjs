import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
const root=new URL('../',import.meta.url); const read=p=>fs.readFileSync(new URL(p,root),'utf8');
test('v3.2 has ABC controls, context action, dynamic world and complete systems',()=>{ const h=read('index.html'); for(const s of ['abcControls','contextAction','weatherLayer','missionPanel']) assert.ok(h.includes(s),s); for(const f of ['js/player.js','js/environment.js','js/inventory.js','js/quests.js','js/evolution.js','js/minigames.js']) assert.ok(fs.existsSync(new URL(f,root)),f); });
test('no placeholder wording remains',()=>{ assert.ok(!read('js/game.js').includes('下一階段')); assert.ok(!read('index.html').includes('v3.1')); });
