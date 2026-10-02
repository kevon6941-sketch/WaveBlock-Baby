const CACHE_NAME='waveblock-baby-v3.3.0';
const APP_SHELL=["./", "./index.html", "./offline.html", "./manifest.webmanifest", "./css/v32.css", "./css/world-v31.css", "./js/scene-machine.js", "./js/state-v3.js", "./js/minigames.js", "./js/player.js", "./js/actors.js", "./js/damage.js", "./js/quests.js", "./js/environment.js", "./js/game.js", "./js/evolution.js", "./js/inventory.js", "./icons/icon-180.png", "./icons/icon-192.png", "./icons/icon-512.png"];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  event.respondWith(
    fetch(event.request).then(response=>{
      const copy=response.clone();
      caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));
      return response;
    }).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('./offline.html')))
  );
});
