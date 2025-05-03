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
  '/mountain.jpg',        // 建議改名：避免空格與括號
  '/field.jpg',
  '/OCEAN.jpg',
  '/squirrel.jpg',
  '/dolphin.jpg',
  '/bird.jpg',
  '/fish.jpg',
  '/frog.jpg',            // 建議統一副檔名大小寫
  '/ferow.jpg',
  '/jpeg.jpg',
  '/taiwan-bear.jpg',     // 建議改名：避免空格
  '/20200214動物園台灣獼猴.mp3'
];

// 安裝 service worker 並快取資源（帶有錯誤容錯）
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        urlsToCache.map(url =>
          cache.add(url).catch(err => {
            console.warn(`⚠️ 無法快取 ${url}:`, err);
          })
        )
      )
    )
  );
  self.skipWaiting();
});

// 啟動階段清除舊 cache（可選）
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// 攔截 fetch 請求，優先使用快取
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
