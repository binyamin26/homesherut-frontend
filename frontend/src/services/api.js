class ApiService {
  async request(endpoint) {
    // On sépare l'URL en deux parties pour forcer le navigateur à reconstruire la chaîne
    const base = ["https:", "", "homesherut-backend.onrender.com", "api"].join("/");
    const forceURL = base + endpoint;
    
    console.log("🚀 TENTATIVE DE CONNEXION EXTERNE :", forceURL);
    
    try {
      const response = await fetch(forceURL, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      return await response.json();
    } catch (e) {
      console.error("Erreur critique connexion:", e);
      throw e;
    }
  }

  async searchProviders(filters) {
    const service = filters.service || '';
    return this.request('/search/providers?service=' + service);
  }
}
export default new ApiService();