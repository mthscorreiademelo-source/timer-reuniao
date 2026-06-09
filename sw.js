const CACHE = 'meeting-timer-v2';
const ASSETS = [
  '/timer-reuniao/',
  '/timer-reuniao/index.html',
  '/timer-reuniao/manifest.json',
  '/timer-reuniao/icon-192.png',
  '/timer-reuniao/icon-512.png',
  '/timer-reuniao/icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
