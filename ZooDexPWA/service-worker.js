const CACHE_NAME = 'zoodex-cache-v1';
const urlsToCache = [
  '/zoo.html',
  '/TaipeiZoo.html',
  '/camera.html',
  '/illustrated.html',
  '/mission.html',
  '/result.html',
  '/manifest.json',
  '/icon.png',
  '/taipeizoo.jpg',
  '/mountain (2).jpg',
  '/field.jpg',
  '/OCEAN.jpg',
  '/squirrel.jpg',
  '/dolphin.jpg',
  '/bird.jpg',
  '/fish.jpg',
  '/frog.JPG',
  '/ferow.jpg',
  '/jpeg.jpg',
  '/taiwan bear.jpg',
  '/20200214動物園台灣獼猴.mp3'
];

// 安裝 service worker 並快取指定資源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 攔截 fetch 請求
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
