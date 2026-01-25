// Service Worker HomeSherut - Mode Offline
const CACHE_NAME = 'homesherut-v1';
const RUNTIME_CACHE = 'homesherut-runtime-v1';

// Fichiers à mettre en cache immédiatement (App Shell)
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  // Ajoute tes fichiers CSS/JS compilés ici
];

// URLs des API à ne PAS mettre en cache
const API_URLS = [
  'https://homesherut-backend.onrender.com/api'
];

// ============================================
// INSTALLATION - Se déclenche une seule fois
// ============================================
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installation...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Cache ouvert, ajout fichiers statiques...');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('✅ Service Worker installé!');
        return self.skipWaiting(); // Active immédiatement
      })
  );
});

// ============================================
// ACTIVATION - Nettoyage vieux caches
// ============================================
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activation...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            // Supprime tous les caches sauf le courant
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => {
            console.log('🗑️ Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
    .then(() => {
      console.log('✅ Service Worker activé!');
      return self.clients.claim(); // Prend le contrôle immédiatement
    })
  );
});

// ============================================
// FETCH - Stratégie de cache intelligente
// ============================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignore les requêtes vers l'API (toujours en ligne)
  if (API_URLS.some(apiUrl => request.url.startsWith(apiUrl))) {
    return;
  }

  // Ignore chrome-extension et autres protocoles
  if (!request.url.startsWith('http')) {
    return;
  }

  // Stratégie: Cache First, Network Fallback
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('📦 Depuis cache:', request.url);
          return cachedResponse;
        }

        // Pas en cache, on fetch depuis le réseau
        return fetch(request)
          .then((networkResponse) => {
            // Clone la réponse (elle ne peut être utilisée qu'une fois)
            const responseToCache = networkResponse.clone();

            // Mise en cache uniquement si succès (status 200)
            if (networkResponse.ok) {
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, responseToCache);
              });
            }

            console.log('🌐 Depuis réseau:', request.url);
            return networkResponse;
          })
          .catch((error) => {
            console.log('❌ Erreur réseau, page offline:', error);
            
            // Page d'erreur offline optionnelle
            return new Response(
              `
              <!DOCTYPE html>
              <html dir="rtl" lang="he">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>אין חיבור לאינטרנט</title>
                <style>
                  body {
                    font-family: 'Heebo', sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-align: center;
                  }
                  .container {
                    max-width: 400px;
                    padding: 2rem;
                  }
                  h1 { font-size: 2rem; margin-bottom: 1rem; }
                  p { font-size: 1.1rem; margin-bottom: 2rem; }
                  button {
                    background: white;
                    color: #667eea;
                    border: none;
                    padding: 1rem 2rem;
                    font-size: 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1>📴 אין חיבור לאינטרנט</h1>
                  <p>אנא בדוק את החיבור שלך ונסה שוב</p>
                  <button onclick="window.location.reload()">נסה שוב</button>
                </div>
              </body>
              </html>
              `,
              {
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
              }
            );
          });
      })
  );
});

// ============================================
// MESSAGES - Communication avec l'app
// ============================================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // Effacer tous les caches (utile pour debug)
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map(cache => caches.delete(cache)));
    }).then(() => {
      console.log('🗑️ Tous les caches effacés!');
    });
  }
});