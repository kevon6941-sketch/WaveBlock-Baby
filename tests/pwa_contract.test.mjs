
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html=fs.readFileSync(new URL('../index.html', import.meta.url),'utf8');
test('index exposes installable PWA metadata',()=>{
  assert.match(html,/manifest\.webmanifest/);
  assert.match(html,/apple-mobile-web-app-capable/);
  assert.match(html,/apple-touch-icon/);
  assert.match(html,/service-worker\.js/);
});
test('manifest is standalone and has icons',()=>{
  const m=JSON.parse(fs.readFileSync(new URL('../manifest.webmanifest', import.meta.url),'utf8'));
  assert.equal(m.display,'standalone');
  assert.equal(m.start_url,'./');
  assert.ok(m.icons.some(x=>x.sizes==='192x192'));
  assert.ok(m.icons.some(x=>x.sizes==='512x512'));
});
test('service worker defines versioned offline cache',()=>{
  const sw=fs.readFileSync(new URL('../service-worker.js', import.meta.url),'utf8');
  assert.match(sw,/CACHE_NAME/);
  assert.match(sw,/offline\.html/);
  assert.match(sw,/fetch/);
});
