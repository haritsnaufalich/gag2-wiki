/* Grow A Garden 2 Wiki — Service Worker
 * Minimal Workbox-free SW. Strategy:
 *   - install: precache shell + icons + manifest
 *   - activate: drop any old cache buckets
 *   - fetch:
 *       * HTML (navigate): network-first, fall back to cache
 *       * everything else same-origin GET: stale-while-revalidate
 *   - skips non-GET and cross-origin requests
 *   - waits for explicit client message before activating new versions
 *     (controlled by the UpdatePrompt UI — no jarring mid-session reloads)
 */
const VERSION = 'v1';
const CACHE = `gag2-wiki-${VERSION}`;

const PRECACHE = [
  './',
  './index.html',
  './favicon.svg',
  './og-image.svg',
  './og-image.png',
  './robots.txt',
  './sitemap.xml',
  './manifest.webmanifest',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE))
  );
  // Note: no self.skipWaiting() here. The new SW waits until the user
  // confirms via the UpdatePrompt component, then messages us to activate.
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put('./', clone));
          return res;
        })
        .catch(() => caches.match('./').then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(req, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
