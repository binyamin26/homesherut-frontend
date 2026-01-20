// src/services/api.js
class ApiService {
  constructor() {
    // URL forcée pour éviter les erreurs 404 sur Vercel
    this.baseURL = 'https://homesherut-backend.onrender.com/api';
  }

  // Récupération du token pour les zones connectées
  getAuthToken() {
    return localStorage.getItem('homesherut_token');
  }

  // Méthode de requête universelle et ultra-robuste
  async request(endpoint, options = {}) {
    const fullURL = this.baseURL + endpoint;
    
    // Configuration des headers (Auth + JSON)
    const token = this.getAuthToken();
    const headers = {
      'Accept': 'application/json',
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    };

    console.log(`🚀 APPEL API : ${options.method || 'GET'} -> ${fullURL}`);

    try {
      const response = await fetch(fullURL, { ...options, headers });

      if (response.status === 401) {
        localStorage.removeItem('homesherut_token');
        return { success: false, message: 'Session expirée' };
      }

      // Gestion du cas où la réponse est vide
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }
      return { success: response.ok };

    } catch (error) {
      console.error(`❌ Erreur critique sur ${fullURL}:`, error);
      return { success: false, message: 'שגיאה בחיבור לשרת' };
    }
  }

  // =============================================
  // SERVICES ET RECHERCHE (Ce qui te manquait !)
  // =============================================

  async searchProviders(filters) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/search/providers?${queryParams}`);
  }

  async getProvider(id) {
    // Répare l'erreur "apiService.getProvider is not a function"
    return this.request(`/providers/${id}`);
  }

  async getProviderReviews(id) {
    // Route backend pour les avis
    return this.request(`/providers/${id}/reviews`);
  }

  // =============================================
  // AUTHENTIFICATION
  // =============================================

  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile() {
    return this.request('/auth/me');
  }

  // =============================================
  // AUTRES MÉTHODES (Upload, Dashboard, etc.)
  // =============================================

  async uploadImage(file) {
    const formData = new FormData();
    formData.append('profileImage', file);
    return this.request('/upload', {
      method: 'POST',
      body: formData,
    });
  }

  async getSubscriptionInfo() {
    return this.request('/subscriptions/info');
  }

  async testConnection() {
    return this.request('/health');
  }
}

const apiService = new ApiService();
export default apiService;