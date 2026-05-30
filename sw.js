'use strict';

const CACHE = 'fitnessos-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/css/base.css',
  '/css/layout.css',
  '/css/components.css',
  '/css/themes.css',
  '/js/storage.js',
  '/js/app.js',
  '/js/modules/dashboard.js',
  '/js/modules/workouts.js',
  '/js/modules/bodystats.js',
  '/js/modules/nutrition.js',
  '/js/modules/cardio.js',
  '/js/modules/progress.js',
  '/js/modules/settings.js',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match('/index.html'));
    })
  );
});
