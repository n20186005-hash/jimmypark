/* JimmyPark.org Service Worker
 * 目標：讓靜態內容在網路不穩或離線時仍可瀏覽。
 * 策略：
 *   - 頁面（navigation）：先連線，失敗時回快取，最後回到首頁離線版
 *   - 圖片與建置產物：快取優先（長期不變）
 *   - 其他同源資源：stale-while-revalidate
 */

const VERSION = 'v1';
const CACHE_STATIC = `jimmypark-static-${VERSION}`;
const CACHE_PAGES = `jimmypark-pages-${VERSION}`;
const CACHE_MEDIA = `jimmypark-media-${VERSION}`;

const PRECACHE_URLS = ['/', '/site.webmanifest', '/favicon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_STATIC)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch(() => undefined),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  const keep = [CACHE_STATIC, CACHE_PAGES, CACHE_MEDIA];
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => !keep.includes(key)).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

const isSameOrigin = (url) => url.origin === self.location.origin;

const cacheFirst = async (request, cacheName) => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok && response.type === 'basic') {
    cache.put(request, response.clone());
  }
  return response;
};

const staleWhileRevalidate = async (request, cacheName) => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response && response.ok && response.type === 'basic') {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);
  return cached || network;
};

const networkFirst = async (request) => {
  const cache = await caches.open(CACHE_PAGES);
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    const home = await cache.match('/');
    if (home) return home;
    return new Response(
      '<!doctype html><html lang="zh-Hant-TW"><meta charset="utf-8"><title>離線</title><body style="font-family:system-ui;padding:2rem;line-height:1.8"><h1>目前處於離線狀態</h1><p>JimmyPark.org 的內容需要連線才能更新。請恢復網路後重新載入。</p></body></html>',
      { status: 503, headers: { 'content-type': 'text/html; charset=utf-8' } },
    );
  }
};

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (!isSameOrigin(url)) return;
  if (url.pathname.startsWith('/sw.js')) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (url.pathname.startsWith('/images/') || url.pathname.startsWith('/_astro/')) {
    event.respondWith(cacheFirst(request, CACHE_MEDIA));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, CACHE_STATIC));
});
