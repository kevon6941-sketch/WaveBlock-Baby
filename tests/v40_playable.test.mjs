
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const h=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
const j=fs.readFileSync(new URL('../js/v40-game.js',import.meta.url),'utf8');
test('playable game scene exists',()=>{assert.match(h,/harbor-world\.png/);assert.match(h,/game-stage/);});
test('six gameplay actions exist',()=>{for(const x of ['feed','clean','fish','wave','repair','sleep']) assert.match(h,new RegExp(`data-action="${x}"`));});
test('state changes and persists',()=>{assert.match(j,/localStorage/);assert.match(j,/hunger/);assert.match(j,/mood/);assert.match(j,/clean/);assert.match(j,/durability/);});
test('ABC controls are functional',()=>{assert.match(j,/selectNext/);assert.match(j,/confirmSelected/);assert.match(j,/goBack/);});
test('fishing and wave are actual minigames',()=>{assert.match(j,/startFishing/);assert.match(j,/startWaveChallenge/);assert.match(j,/requestAnimationFrame/);});
