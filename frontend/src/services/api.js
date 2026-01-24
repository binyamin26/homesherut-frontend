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
  const serverUrl = 'https://homesherut-backend.onrender.com/api';
  
  // ✅ CORRECTION : Ne pas ajouter / si endpoint commence déjà par /
  const fullURL = endpoint.startsWith('/') 
    ? `${serverUrl}${endpoint}` 
    : `${serverUrl}/${endpoint}`;
  
  console.log(`🚀 APPEL API RÉEL : ${fullURL}`);

  const token = this.getAuthToken();
  const headers = {
    'Accept': 'application/json',
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };

  try {
    const response = await fetch(fullURL, { ...options, headers });

    // Sécurité : si on reçoit du HTML (code <!doctype), on arrête tout
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      console.error("❌ ERREUR : Le serveur a renvoyé du HTML au lieu de JSON.");
      return { success: false, providers: [] };
    }

    const data = await response.json();
    return {
      success: data.success || response.ok,
      providers: data.providers || (Array.isArray(data) ? data : []),
      ...data
    };
  } catch (error) {
    console.error(`❌ Échec sur ${fullURL}:`, error);
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