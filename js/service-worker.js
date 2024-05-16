// Service Worker

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('Kadian-cache').then(function (cache) {
            return cache.addAll([
                '/index.html',
                '/style.css',
                '/js/script.js',
                '/text',
                '/manifest.json',
                '/js/service-worker.js',
                '/img'
            ]);
        })
    );
});

self.addEventListener('activate', function (event) {
    console.log('Service worker activated');

    const CACHE_PREFIX = 'Kadian-cache-';

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith(CACHE_PREFIX) && cacheName !== currentCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    console.log('Fetch event', event);
});
