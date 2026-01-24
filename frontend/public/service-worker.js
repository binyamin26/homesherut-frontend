// Service Worker de NETTOYAGE (Kill Switch)
// Ce fichier sert à forcer la suppression des anciens caches corrompus
// Une fois que tout le monde aura la nouvelle version, nous remettrons le code PWA normal.

const CACHE_NAME = 'homesherut-clean-v2'; // On change le nom pour forcer la mise à jour

self.addEventListener('install', (event) => {
  // Force l'activation immédiate sans attendre que l'ancien SW soit fermé
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Prend le contrôle de la page immédiatement
  event.waitUntil(
    clients.claim().then(() => {
      // Supprime TOUS les caches existants
      return caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log('🗑️ Kill Switch: Suppression du cache', cacheName);
            return caches.delete(cacheName);
          })
        );
      });
    })
  );
});

// Bypass total du cache pour toutes les requêtes
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});