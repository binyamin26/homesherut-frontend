const API_BASE = 'http://localhost:5000/api';

// Fonction utilitaire pour les requêtes
async function makeRequest(endpoint, method = 'GET', data = null, token = null) {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const result = await response.json();
    
    return {
      status: response.status,
      success: response.ok,
      data: result
    };
  } catch (error) {
    console.error(`❌ Erreur requête ${endpoint}:`, error.message);
    return {
      status: 0,
      success: false,
      error: error.message
    };
  }
}

// Tests d'authentification
async function testAuth() {
  console.log('🧪 === TESTS D\'AUTHENTIFICATION HOMESHERUT ===\n');

  let testResults = {
    passed: 0,
    failed: 0,
    tests: []
  };

  // Helper pour enregistrer les résultats
  function recordTest(name, passed, message = '') {
    testResults.tests.push({ name, passed, message });
    if (passed) {
      testResults.passed++;
      console.log(`✅ ${name}`);
    } else {
      testResults.failed++;
      console.log(`❌ ${name}: ${message}`);
    }
  }

  // =============================================
  // TEST 1: Inscription Client
  // =============================================
  console.log('📝 Test 1: Inscription Client');
  
  const clientData = {
    name: 'Sarah Cohen',
    email: 'sarah.test@example.com',
    phone: '0501234567',
    password: 'test123456',
    role: 'client'
  };

  const registerClientResult = await makeRequest('/auth/register', 'POST', clientData);
  recordTest(
    'Inscription Client', 
    registerClientResult.success && registerClientResult.data.user?.role === 'client',
    registerClientResult.data?.message || 'Erreur inconnue'
  );

  const clientToken = registerClientResult.data?.token;

  // =============================================
  // TEST 2: Inscription Provider avec mois gratuit
  // =============================================
  console.log('\n📝 Test 2: Inscription Provider (Ménage - mois gratuit)');
  
  const providerData = {
    name: 'Fatima Mansouri',
    email: 'fatima.test@example.com',
    phone: '0507654321',
    password: 'test123456',
    role: 'provider',
    serviceType: 'cleaning'
  };

  const registerProviderResult = await makeRequest('/auth/register', 'POST', providerData);
  const hasFreePremium = registerProviderResult.data?.user?.premium_until !== null;
  
  recordTest(
    'Inscription Provider avec mois gratuit', 
    registerProviderResult.success && hasFreePremium,
    registerProviderResult.data?.message || 'Pas de mois gratuit accordé'
  );

  const providerToken = registerProviderResult.data?.token;

  // =============================================
  // TEST 3: Inscription Provider sans mois gratuit
  // =============================================
  console.log('\n📝 Test 3: Inscription Provider (Babysitting - pas de mois gratuit)');
  
  const babysitterData = {
    name: 'Rachel Levi',
    email: 'rachel.test@example.com',
    phone: '0509876543',
    password: 'test123456',
    role: 'provider',
    serviceType: 'babysitting'
  };

  const registerBabysitterResult = await makeRequest('/auth/register', 'POST', babysitterData);
  const hasNoPremium = registerBabysitterResult.data?.user?.premium_until === null;
  
  recordTest(
    'Inscription Provider sans mois gratuit', 
    registerBabysitterResult.success && hasNoPremium,
    'Babysitter ne doit pas avoir de mois gratuit'
  );

  // =============================================
  // TEST 4: Connexion Client
  // =============================================
  console.log('\n📝 Test 4: Connexion Client');
  
  const loginClientResult = await makeRequest('/auth/login', 'POST', {
    email: clientData.email,
    password: clientData.password
  });

  const hasContactCredits = loginClientResult.data?.user?.contactCredits?.total === 3;
  
  recordTest(
    'Connexion Client avec crédits', 
    loginClientResult.success && hasContactCredits,
    `Crédits: ${loginClientResult.data?.user?.contactCredits?.total || 0}`
  );

  // =============================================
  // TEST 5: Connexion Provider
  // =============================================
  console.log('\n📝 Test 5: Connexion Provider');
  
  const loginProviderResult = await makeRequest('/auth/login', 'POST', {
    email: providerData.email,
    password: providerData.password
  });

  const hasProviderProfile = loginProviderResult.data?.user?.providerProfile !== null;
  
  recordTest(
    'Connexion Provider avec profil', 
    loginProviderResult.success && hasProviderProfile,
    hasProviderProfile ? 'Profil provider trouvé' : 'Pas de profil provider'
  );

  // =============================================
  // TEST 6: Récupération profil authentifié
  // =============================================
  console.log('\n📝 Test 6: Récupération profil authentifié');
  
  if (clientToken) {
    const profileResult = await makeRequest('/auth/me', 'GET', null, clientToken);
    recordTest(
      'Récupération profil avec token', 
      profileResult.success && profileResult.data?.user?.email === clientData.email,
      profileResult.data?.message || 'Token invalide'
    );
  } else {
    recordTest('Récupération profil avec token', false, 'Pas de token client disponible');
  }

  // =============================================
  // TEST 7: Validation des erreurs
  // =============================================
  console.log('\n📝 Test 7: Validation des erreurs');
  
  // Email invalide
  const invalidEmailResult = await makeRequest('/auth/register', 'POST', {
    ...clientData,
    email: 'email-invalide',
    phone: '0501111111' // Changer le téléphone pour éviter les doublons
  });

  recordTest(
    'Rejet email invalide', 
    !invalidEmailResult.success && invalidEmailResult.status === 400,
    'Email invalide doit être rejeté'
  );

  // Mot de passe trop court
  const shortPasswordResult = await makeRequest('/auth/register', 'POST', {
    ...clientData,
    email: 'test2@example.com',
    password: '123',
    phone: '0501111112'
  });

  recordTest(
    'Rejet mot de passe court', 
    !shortPasswordResult.success && shortPasswordResult.status === 400,
    'Mot de passe court doit être rejeté'
  );

  // Email déjà existant
  const duplicateEmailResult = await makeRequest('/auth/register', 'POST', clientData);

  recordTest(
    'Rejet email existant', 
    !duplicateEmailResult.success && duplicateEmailResult.status === 400,
    'Email existant doit être rejeté'
  );

  // =============================================
  // TEST 8: Changement de mot de passe
  // =============================================
  console.log('\n📝 Test 8: Changement de mot de passe');
  
  if (clientToken) {
    const changePasswordResult = await makeRequest('/auth/change-password', 'POST', {
      currentPassword: clientData.password,
      newPassword: 'nouveaumotdepasse123'
    }, clientToken);

    recordTest(
      'Changement mot de passe', 
      changePasswordResult.success,
      changePasswordResult.data?.message || 'Erreur changement mot de passe'
    );

    // Tester la connexion avec le nouveau mot de passe
    const loginNewPasswordResult = await makeRequest('/auth/login', 'POST', {
      email: clientData.email,
      password: 'nouveaumotdepasse123'
    });

    recordTest(
      'Connexion avec nouveau mot de passe', 
      loginNewPasswordResult.success,
      'Le nouveau mot de passe doit fonctionner'
    );
  } else {
    recordTest('Changement mot de passe', false, 'Pas de token client disponible');
  }

  // =============================================
  // TEST 9: Déconnexion
  // =============================================
  console.log('\n📝 Test 9: Déconnexion');
  
  if (clientToken) {
    const logoutResult = await makeRequest('/auth/logout', 'POST', null, clientToken);
    recordTest(
      'Déconnexion', 
      logoutResult.success,
      logoutResult.data?.message || 'Erreur déconnexion'
    );
  } else {
    recordTest('Déconnexion', false, 'Pas de token client disponible');
  }

  // =============================================
  // TEST 10: Accès sans token
  // =============================================
  console.log('\n📝 Test 10: Protection des routes privées');
  
  const unauthorizedResult = await makeRequest('/auth/me', 'GET');
  recordTest(
    'Protection route privée', 
    !unauthorizedResult.success && unauthorizedResult.status === 401,
    'Route privée doit être protégée'
  );

  // =============================================
  // RÉSULTATS FINAUX
  // =============================================
  console.log('\n🏁 === RÉSULTATS DES TESTS ===');
  console.log(`✅ Tests réussis: ${testResults.passed}`);
  console.log(`❌ Tests échoués: ${testResults.failed}`);
  console.log(`📊 Taux de réussite: ${Math.round((testResults.passed / (testResults.passed + testResults.failed)) * 100)}%`);

  if (testResults.failed > 0) {
    console.log('\n❌ Tests échoués:');
    testResults.tests
      .filter(test => !test.passed)
      .forEach(test => console.log(`   - ${test.name}: ${test.message}`));
  }

  console.log('\n🎯 Si tous les tests passent, votre authentification HomeSherut fonctionne parfaitement !');
  
  return testResults;
}

// =============================================
// GUIDE D'UTILISATION
// =============================================
function printUsageGuide() {
  console.log('📖 === GUIDE D\'UTILISATION ===');
  console.log('');
  console.log('1. Assurez-vous que votre serveur backend fonctionne sur http://localhost:5000');
  console.log('2. Exécutez la migration de base de données avec le fichier migration-homesherut.sql');
  console.log('3. Lancez ce test avec: node test-auth.js');
  console.log('');
  console.log('🔧 Si des tests échouent:');
  console.log('   - Vérifiez que la base de données est bien configurée');
  console.log('   - Vérifiez que les routes /api/auth/* sont bien configurées');
  console.log('   - Vérifiez que le modèle User.js est bien importé');
  console.log('   - Vérifiez les logs du serveur pour plus de détails');
  console.log('');
}

// Exécuter les tests
if (require.main === module) {
  console.clear();
  printUsageGuide();
  
  // Attendre un peu pour que l'utilisateur lise le guide
  setTimeout(() => {
    testAuth().catch(error => {
      console.error('💥 Erreur lors des tests:', error);
    });
  }, 2000);
}

module.exports = { testAuth, makeRequest };