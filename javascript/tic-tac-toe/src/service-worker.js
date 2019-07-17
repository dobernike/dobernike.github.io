const CACHE = 'cache-only-v1';
const PRECACHE_URLS = [
  'index.html',
  './', // Alias for index.html
  './css/index.css',
  './js/index.js'
];

// При установке воркера мы должны закешировать часть данных (статику).
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll([PRECACHE_URLS]);
    })
  );
});

// При запросе на сервер (событие fetch), используем только данные из кэша.
self.addEventListener('fetch', (event) =>
  event.respondWith(fromCache(event.request))
);

function fromCache(request) {
  return caches.open(CACHE).then((cache) =>
    cache.match(request)
      .then((matching) => matching || Promise.reject('no-match'))
  );
}