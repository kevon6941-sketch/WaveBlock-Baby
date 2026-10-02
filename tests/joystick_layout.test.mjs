import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
const h=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8'); const c=fs.readFileSync(new URL('../css/v32.css',import.meta.url),'utf8');
test('joystick lives outside world visual area in a dedicated lower control dock',()=>{ assert.match(h, /<\/section><div id="controlDock"[^>]*>[\s\S]*id="joystick"/); assert.match(c,/\.joystick\{position:relative/); assert.doesNotMatch(c,/\.joystick\{position:absolute/); });
