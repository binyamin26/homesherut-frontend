// src/services/api.js
class ApiService {
  constructor() {
    // FORCEZ l'URL complète ici pour éviter que Vercel ne cherche en local
    this.baseURL = 'https://homesherut-backend.onrender.com/api';
  }

  getAuthToken() {
    return localStorage.getItem('homesherut_token');
  }

  async request(endpoint, options = {}) {
    // On s'assure que le chemin est correct entre baseURL et l'endpoint
    const fullURL = this.baseURL + (endpoint.startsWith('/') ? endpoint : `/${endpoint}`);
    
    console.log(`🚀 TENTATIVE DE CONNEXION VERS : ${fullURL}`);

    const token = this.getAuthToken();
    const headers = {
      'Accept': 'application/json',
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    };

    try {
      const response = await fetch(fullURL, { ...options, headers });

      // Vérification du type de contenu pour éviter de lire du HTML comme du JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        console.error("❌ ERREUR : Le serveur a renvoyé du HTML. Vérifiez l'URL de l'API.");
        return { success: false, providers: [] };
      }

      const data = await response.json();
      
      // On sécurise le retour pour que le frontend ne plante jamais
      return {
        success: data.success || response.ok,
        providers: data.providers || (Array.isArray(data) ? data : []),
        ...data
      };
    } catch (error) {
      console.error(`❌ Échec critique sur ${fullURL}:`, error);
      return { success: false, providers: [], message: 'שגיאה בחיבור לשרת' };
    }
  }

  // =============================================
  // SERVICES ET RECHERCHE
  // =============================================

  async searchProviders(filters) {
    const queryParams = new URLSearchParams(filters).toString();
    const result = await this.request(`/search/providers?${queryParams}`);
    
    // On garantit que 'providers' est toujours un tableau exploitable
    return {
      ...result,
      providers: result?.providers || []
    };
  }

  async getProvider(id) {
    return this.request(`/providers/${id}`);
  }

  async getProviderReviews(id) {
    return this.request(`/providers/${id}/reviews`);
  }

  // =============================================
  // AUTHENTIFICATION ET AUTRES
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

  async uploadImage(file) {
    const formData = new FormData();
    formData.append('profileImage', file);
    return this.request('/upload', {
      method: 'POST',
      body: formData,
    });
  }

  async testConnection() {
    return this.request('/health');
  }
}

const apiService = new ApiService();
export default apiService;