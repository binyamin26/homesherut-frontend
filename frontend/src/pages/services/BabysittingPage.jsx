import { useNavigate } from 'react-router-dom';
import { Baby } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import FilterBar from '../../components/filters/FilterBar';
import ReviewModal from '../../components/modals/ReviewModal';
import apiService from '../../services/api';
import React, { useState, useEffect, useRef } from 'react';
import ProviderCard from '../../components/cards/ProviderCard';
import { useLanguage } from '../../context/LanguageContext';

const BabysittingPageClean = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  
  const [locationFilter, setLocationFilter] = useState({
    city: '',
    neighborhood: '',
    fullLocation: ''
  });
  const [activeFilters, setActiveFilters] = useState({});
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);
  const [error, setError] = useState(null);
  const isFirstLoad = useRef(true);

  // État pour modal d'avis
  const [reviewModal, setReviewModal] = useState({
    isOpen: false,
    providerId: null,
    providerName: ''
  });

  // Fonction pour charger les prestataires depuis l'API
  const loadProviders = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const searchParams = {
        service: 'babysitting',
        ...locationFilter,
        ...activeFilters,
        page: 1,
        limit: 20
      };

      // Nettoyer les paramètres vides
      const cleanParams = Object.fromEntries(
        Object.entries(searchParams).filter(([key, value]) => 
          value !== '' && value !== null && value !== undefined
        )
      );
const response = await apiService.searchProviders(cleanParams);
      
     if (response.success) {
 
 
        setProviders(response.data.providers || []);
        setResultsCount(response.data.pagination?.totalResults || response.data.providers?.length || 0);
      } else {
      setError(t('services.babysitting.loadError'));
        setProviders([]);
        setResultsCount(0);
      }
    } catch (error) {
      console.error('Erreur chargement providers:', error);
      setError(t('common.connectionError'));
      setProviders([]);
      setResultsCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Charger les prestataires au montage et quand les filtres changent
 // Remplacer le useEffect par :
useEffect(() => {
  if (isFirstLoad.current) {
    isFirstLoad.current = false;
    loadProviders();
    return;
  }

  const timer = setTimeout(() => {
    loadProviders();
  }, 500);

  return () => clearTimeout(timer);
}, [activeFilters, locationFilter]);

  const handleFiltersChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const handleLocationChange = (newLocation) => {
    setLocationFilter(newLocation);
  };

  // Navigation vers profil provider
  const handleViewProfile = (providerId) => {
    navigate(`/provider/${providerId}`);
  };

  // Gestion modal d'avis
  const handleOpenReviewModal = (providerId, providerName) => {
    setReviewModal({
      isOpen: true,
      providerId,
      providerName
    });
  };

  const handleCloseReviewModal = () => {
    setReviewModal({
      isOpen: false,
      providerId: null,
      providerName: ''
    });
  };

  // Fonction pour rafraîchir après création d'avis
  const handleReviewCreated = () => {
    loadProviders();
  };


  return (
    <div className="service-page babysitting-page">
      {/* Header Simple */}
      <section className="service-header">
        <div className="container">
         <div className="service-title-section" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <h1 className="service-title" style={{ textAlign: 'center', margin: '0 auto' }}>{t('services.babysitting.pageTitle')}</h1>
  <div style={{ 
  position: 'absolute', 
  right: '0',
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  overflow: 'hidden',
  background: '#f0f0f0'
}}>
  <img 
    src="/images/logo bébé.png" 
    alt="baby-sitting" 
    style={{ 
      width: '100%', 
      height: '100%',
      objectFit: 'cover',
        transform: 'scale(1.3)'
    }}
  />
</div>
</div>
        </div>
      </section>

      {/* FilterBar */}
      <FilterBar 
        serviceType="babysitting"
        onFiltersChange={handleFiltersChange}
        activeFilters={activeFilters}
        onLocationChange={handleLocationChange}
        selectedLocation={locationFilter}
      />

      {/* Section résultats */}
      <div className="results-section">
        <div className="results-container">
          <div className="results-summary">
            <div className="results-info">
              {loading ? (
              <div className="loading-text">{t('services.babysitting.searching')}</div>
              ) : error ? (
                <div className="error-text">{error}</div>
              ) : (
                <div className="results-count">
            <strong>{resultsCount}</strong> {t('services.babysitting.found')}
                   {locationFilter.neighborhood && <span> {t('common.in')} {locationFilter.neighborhood}</span>}
  {!locationFilter.neighborhood && locationFilter.city && <span> {t('common.in')} {locationFilter.city}</span>}
</div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="providers-loading">
              <div className="loading-spinner"></div>
          <p>{t('services.babysitting.loading')}</p>
            </div>
          ) : error ? (
            <div className="error-state">
          <h3>{t('common.dataLoadError')}</h3>
              <p>{error}</p>
             <button onClick={loadProviders} className="retry-btn">
  {t('common.tryAgain')}
</button>
            </div>
          ) : providers.length > 0 ? (
            <div className="providers-grid">
             {providers.map(provider => (
  <ProviderCard 
    key={provider.id}
    provider={provider}
    onOpenReviewModal={handleOpenReviewModal}
  />
))}
            </div>
          ) : (
            <div className="no-results">
             <h3>{t('services.babysitting.noResults')}</h3>
              {(locationFilter.city || locationFilter.neighborhood) && (
                <button 
                  onClick={() => setLocationFilter({ city: '', neighborhood: '', fullLocation: '' })}
                  className="expand-search-btn"
                >
 {t('common.searchAllCountry')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal d'avis */}
      <ReviewModal 
        isOpen={reviewModal.isOpen}
        onClose={handleCloseReviewModal}
        providerId={reviewModal.providerId}
        providerName={reviewModal.providerName}
        serviceType="babysitting"
        onReviewCreated={handleReviewCreated}
      />
    </div>
  );
};

export default BabysittingPageClean;