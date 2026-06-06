const CACHE = 'arcafe-v13';
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
  './products/americano-frio.jpg',
  './products/bolsa-de-cafe.jpg',
  './products/cappuccino.jpg',
  './products/chocolate.jpg',
  './products/combo-cafe-tucumana.jpg',
  './products/combo-hot-dog-americano.jpg',
  './products/expreso.jpg',
  './products/frappe.jpg',
  './products/hot-dog-chiquito.jpg',
  './products/hot-dog-extralargo.jpg',
  './products/iced-latte.jpg',
  './products/latte.jpg',
  './products/mate.jpg',
  './products/mocaccino.jpg',
  './products/tucumana.jpg'
];

// Install: cache all files fresh
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
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

// Fetch: network first, fallback to cache
self.addEventListener('fetch', e => {
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
