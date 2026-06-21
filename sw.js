/* Grow A Garden 2 Wiki — Service Worker
 * Minimal Workbox-free SW. Strategy:
 *   - install: precache shell + icons + manifest
 *   - activate: drop any old cache buckets
 *   - fetch:
 *       * HTML (navigate): network-first, fall back to cached SPA shell
 *       * everything else same-origin GET: stale-while-revalidate
 *   - skips non-GET and cross-origin requests
 *   - skipWaiting + clients.claim on activate: new SW takes over immediately
 *     (no UpdatePrompt dance — fixes the v1 bug where 404s got cached at
 *     the root key and locked the user out of the home page)
 *
 * Bug history (v1):
 *   The navigation handler cached the response at './' regardless of
 *   status. If a 404 response was ever cached there, all subsequent
 *   navigations fell back to that 404 (since the network-first attempt
 *   could fail or the response could itself be a 404 with cached body).
 *   v2: only cache 2xx responses, AND key the cache by request URL
 *   (not './') so a bad cache entry can't pollute the root. The root
 *   shell is still served from PRECACHE['./'] on offline.
 */
const VERSION = 'v2';
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
  // Take over immediately. v1's `wait for UpdatePrompt` flow let the bad
  // 404 cache persist too long.
  self.skipWaiting();
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
          // v2 fix: only cache successful navigations, AND key by request
          // URL — never pollute the './' root cache.
          if (res && res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(req, clone));
          }
          return res;
        })
        .catch(() =>
          // Fallback: serve the precached SPA shell. The router will
          // either match the URL or render the in-app NotFoundPage.
          caches.match('./index.html').then((r) => r || caches.match('./'))
        )
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
