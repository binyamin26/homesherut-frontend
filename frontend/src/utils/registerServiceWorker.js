// Fichier: src/utils/registerServiceWorker.js

export function registerServiceWorker() {
  // Vérifier si les Service Workers sont supportés
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('✅ Service Worker enregistré:', registration.scope);

          // Vérifier les mises à jour toutes les heures
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000);

          // Détecter nouvelle version disponible
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Nouvelle version disponible
                console.log('🆕 Nouvelle version disponible!');
                
                // Optionnel: Afficher notification à l'utilisateur
                if (confirm('גרסה חדשה זמינה! רוצה לרענן?')) {
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                  window.location.reload();
                }
              }
            });
          });
        })
        .catch((error) => {
          console.error('❌ Erreur enregistrement Service Worker:', error);
        });

      // Recharger quand le nouveau SW prend le contrôle
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    });
  } else {
    console.log('⚠️ Service Workers non supportés par ce navigateur');
  }
}

// Fonction pour effacer le cache (debug/développement)
export function clearServiceWorkerCache() {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' });
  }
}

// Fonction pour désinstaller le Service Worker
export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister().then(() => {
        console.log('🗑️ Service Worker désinstallé');
        window.location.reload();
      });
    });
  }
}