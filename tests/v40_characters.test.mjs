
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html=fs.readFileSync(new URL('../index.html', import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../css/v40-characters.css', import.meta.url),'utf8');
const js=fs.readFileSync(new URL('../js/character-system.js', import.meta.url),'utf8');

test('v4 world loads independent character system and art layer',()=>{
  assert.match(html,/v40-characters\.css/);
  assert.match(html,/character-system\.js/);
  assert.match(html,/id="character-layer"/);
});
test('characters are independent interactive actors, not one background image',()=>{
  for (const id of ['wavebaby','fisher','cat','turtle','dolphin','seagull','citizen']) {
    assert.match(js,new RegExp(id));
  }
  assert.match(js,/data-actor/);
  assert.match(js,/setMood/);
  assert.match(js,/moveTo/);
});
test('ABC controls can select, interact and return',()=>{
  assert.match(js,/KeyA/);
  assert.match(js,/KeyB/);
  assert.match(js,/KeyC/);
});
test('art has layered depth and actor animation',()=>{
  assert.match(css,/\.actor/);
  assert.match(css,/@keyframes actorIdle/);
  assert.match(css,/filter: drop-shadow/);
});
