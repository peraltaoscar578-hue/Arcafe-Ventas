const CACHE = 'arcafe-v20';
const FILES = [
  './index.html',
  './manifest.json',
  './logo.png',
  './icon-192.png',
  './icon-512.png',
  './img-cold.png',
  './img-combo.png',
  './img-hot.png',
  './img-snack.png',
  './products/americano.jpg',
  './products/cappuccino.jpg',
  './products/chocolate.jpg',
  './products/expreso.jpg',
  './products/hot-dog-extralargo.jpg',
  './products/latte.jpg',
  './products/mocaccino.jpg',
  './products/tucumana.jpg',
  './products/mate.jpg',
  './products/iced-latte.jpg',
  './products/americano-frio.jpg',
  './products/frappe.jpg'
];

// Install: cache all files, but don't let one missing file break the whole cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      Promise.all(
        FILES.map(url =>
          cache.add(url).catch(err => console.warn('[SW] skip', url, err.message))
        )
      )
    )
  );
  self.skipWaiting();
});

// Activate: delete ALL old caches immediately
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network first, fallback to cache — GET requests only.
// POST/PUT/PATCH/DELETE (e.g. Supabase sync calls) pass straight through;
// the Cache API can only store GET responses, and intercepting non-GET
// requests here was silently breaking the Supabase sync chain.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return; // let it go to network untouched

  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
