'use strict';

const CACHE = 'fos-v3';
const ASSETS = [
  './',
  './index.html',
  './css/base.css',
  './css/layout.css',
  './css/components.css',
  './js/storage.js',
  './js/app.js',
  './js/modules/dashboard.js',
  './js/modules/workouts.js',
  './js/modules/bodystats.js',
  './js/modules/cardio.js',
  './js/modules/progress.js',
  './js/modules/nutrition.js',
  './js/modules/injuries.js',
  './js/modules/recovery.js',
  './js/modules/settings.js',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
