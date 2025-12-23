// src/components/search/FilterBar.jsx
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  MapPin,  
  Calendar, 
  Settings, 
  ChevronDown, 
  X,
  Search,
  Star
} from 'lucide-react';
import LocationSelector from '../LocationSelector';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  FILTER_CONFIG, 
  getFilterOptions, 
  getSectionTitle,
  getCommonDays,
  getCommonHours 
} from './../config/filterConfig';

const FilterBar = ({ 
  serviceType, 
  onFiltersChange, 
  activeFilters = {},
  onLocationChange,
  selectedLocation = {}
}) => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState(null);
  const [tempFilters, setTempFilters] = useState(activeFilters);

  // Comptage des filtres actifs par catégorie
  const getActiveCount = useCallback((category) => {
    switch (category) {
      case 'location':
        return selectedLocation.city ? 1 : 0;
      case 'price':
        return (activeFilters.minPrice || activeFilters.maxPrice) ? 1 : 0;
      case 'experience':
        return activeFilters.experience ? 1 : 0;
      case 'service':
        return Object.keys(activeFilters).filter(key => 
          !['minPrice', 'maxPrice', 'experience'].includes(key)
        ).length;
      case 'rating':
        return activeFilters.minRating ? 1 : 0;
      default:
        return 0;
    }
  }, [activeFilters, selectedLocation]);

  const handleFilterClick = useCallback((filterType) => {
    setActiveFilter(activeFilter === filterType ? null : filterType);
  }, [activeFilter]);

  const closePanel = useCallback(() => {
    setActiveFilter(null);
  }, []);

  const applyFilters = useCallback(() => {
    onFiltersChange(tempFilters);
    closePanel();
  }, [tempFilters, onFiltersChange, closePanel]);

  const resetFilters = useCallback(() => {
    setTempFilters({});
    onFiltersChange({});
    onLocationChange({ city: '', neighborhood: '', fullLocation: '' });
    closePanel();
  }, [onFiltersChange, onLocationChange, closePanel]);

  return (
    <>
      {/* Barre de filtres horizontale */}
      <div className="filter-bar">
        <div className="filter-bar-container">
          
          {/* Filtre Localisation */}
          <button
            className={`filter-pill ${activeFilter === 'location' ? 'active' : ''}`}
            onClick={() => handleFilterClick('location')}
          >
            <MapPin size={16} />
            <span className="filter-pill-text">
              {selectedLocation.city || t('filters.location')}
            </span>
            {getActiveCount('location') > 0 && (
              <span className="filter-pill-badge">{getActiveCount('location')}</span>
            )}
            <ChevronDown size={14} className="filter-pill-arrow" />
          </button>

          {/* Filtre Prix */}
          <button
            className={`filter-pill ${activeFilter === 'price' ? 'active' : ''}`}
            onClick={() => handleFilterClick('price')}
          >
            <span style={{ fontSize: '16px', fontWeight: '600' }}>₪</span>
            <span className="filter-pill-text">
              {(activeFilters.minPrice || activeFilters.maxPrice) 
                ? `₪${activeFilters.minPrice || 0}-${activeFilters.maxPrice || 500}` 
                : t('filters.price')}
            </span>
            {getActiveCount('price') > 0 && (
              <span className="filter-pill-badge">{getActiveCount('price')}</span>
            )}
            <ChevronDown size={14} className="filter-pill-arrow" />
          </button>

          {/* Filtre Expérience */}
          <button
            className={`filter-pill ${activeFilter === 'experience' ? 'active' : ''}`}
            onClick={() => handleFilterClick('experience')}
          >
            <Calendar size={16} />
            <span className="filter-pill-text">
              {activeFilters.experience || t('filters.experience')}
            </span>
            {getActiveCount('experience') > 0 && (
              <span className="filter-pill-badge">{getActiveCount('experience')}</span>
            )}
            <ChevronDown size={14} className="filter-pill-arrow" />
          </button>

          {/* Filtre Étoiles */}
          <button
            className={`filter-pill ${activeFilter === 'rating' ? 'active' : ''}`}
            onClick={() => handleFilterClick('rating')}
          >
            <Star size={16} />
            <span className="filter-pill-text">
              {activeFilters.minRating 
                ? `${activeFilters.minRating}+ ${t('filters.stars')}` 
                : t('filters.rating')}
            </span>
            {activeFilters.minRating && (
              <span className="filter-pill-badge">1</span>
            )}
            <ChevronDown size={14} className="filter-pill-arrow" />
          </button>

          {/* Filtre Service Spécifique */}
          <button
            className={`filter-pill ${activeFilter === 'service' ? 'active' : ''}`}
            onClick={() => handleFilterClick('service')}
          >
            <Settings size={16} />
            <span className="filter-pill-text">{t('filters.advancedFilters')}</span>
            {getActiveCount('service') > 0 && (
              <span className="filter-pill-badge">{getActiveCount('service')}</span>
            )}
            <ChevronDown size={14} className="filter-pill-arrow" />
          </button>

          {/* Bouton Reset */}
          {(Object.keys(activeFilters).length > 0 || selectedLocation.city) && (
            <button
              className="filter-reset-btn"
              onClick={resetFilters}
            >
              <X size={16} />
              <span>{t('filters.clearAll')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Overlay pour mobile */}
      {activeFilter && (
        <div className="filter-overlay" onClick={closePanel} />
      )}

      {/* Panneaux de filtres */}
      {activeFilter && (
        <div className="filter-sidebar">
          <div className="filter-sidebar-header">
            <h3 className="filter-sidebar-title">
              {activeFilter === 'location' && t('filters.selectLocation')}
              {activeFilter === 'price' && t('filters.priceRange')}
              {activeFilter === 'experience' && t('filters.experienceLevel')}
              {activeFilter === 'rating' && t('filters.ratingFilter')}
              {activeFilter === 'service' && t('filters.advancedFilters')}
            </h3>
            <button 
              className="filter-sidebar-close"
              onClick={closePanel}
            >
              <X size={20} />
            </button>
          </div>

          <div className="filter-sidebar-content">
            {activeFilter === 'location' && (
              <LocationPanel 
                selectedLocation={selectedLocation}
                onLocationChange={onLocationChange}
              />
            )}

            {activeFilter === 'price' && (
              <PricePanel 
                minPrice={tempFilters.minPrice || 0}
                maxPrice={tempFilters.maxPrice || 500}
                onChange={(min, max) => setTempFilters(prev => ({
                  ...prev,
                  minPrice: min,
                  maxPrice: max
                }))}
              />
            )}

            {activeFilter === 'experience' && (
              <ExperiencePanel 
                selected={tempFilters.experience || ''}
                onChange={(value) => setTempFilters(prev => ({
                  ...prev,
                  experience: value
                }))}
              />
            )}

            {activeFilter === 'rating' && (
              <RatingPanel 
                selected={tempFilters.minRating || ''}
                onChange={(value) => setTempFilters(prev => ({
                  ...prev,
                  minRating: value
                }))}
              />
            )}

            {activeFilter === 'service' && (
              <ServicePanel 
                serviceType={serviceType}
                filters={tempFilters}
                onChange={setTempFilters}
              />
            )}
          </div>

          <div className="filter-sidebar-footer">
            <button 
              className="btn btn-secondary"
              onClick={() => {
                if (activeFilter === 'location') {
                  onLocationChange({ area: '', city: '', neighborhood: '', fullLocation: '' });
                } else if (activeFilter === 'price') {
                  const newFilters = { ...activeFilters, minPrice: undefined, maxPrice: undefined };
                  setTempFilters(newFilters);
                  onFiltersChange(newFilters);
                } else if (activeFilter === 'experience') {
                  const newFilters = { ...activeFilters, experience: undefined };
                  setTempFilters(newFilters);
                  onFiltersChange(newFilters);
                } else if (activeFilter === 'rating') {
                  const newFilters = { ...activeFilters, minRating: undefined };
                  setTempFilters(newFilters);
                  onFiltersChange(newFilters);
                } else if (activeFilter === 'service') {
                  setTempFilters({});
                  onFiltersChange({});
                }
              }}
            >
              {t('filters.clear')}
            </button>
            <button 
              className="btn btn-primary"
              onClick={applyFilters}
            >
              <Search size={16} />
              {t('filters.showResults')}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANTS PANELS COMMUNS
// ═══════════════════════════════════════════════════════════════════════════

const PricePanel = ({ minPrice, maxPrice, onChange }) => {
  const { t } = useLanguage();
  
  const handleRangeChange = (e) => {
    const value = parseInt(e.target.value);
    const isMin = e.target.name === 'min';
    if (isMin) {
      onChange(value, maxPrice);
    } else {
      onChange(minPrice, value);
    }
  };

  return (
    <div className="price-panel">
      <div className="price-display">
        <div className="price-value">
          <span className="price-label">{t('filters.minimum')}</span>
          <span className="price-amount">₪{minPrice}</span>
        </div>
        <div className="price-separator">-</div>
        <div className="price-value">
          <span className="price-label">{t('filters.maximum')}</span>
          <span className="price-amount">₪{maxPrice}</span>
        </div>
      </div>

      <div className="dual-range-slider">
        <div className="range-track">
          <div 
            className="range-fill"
            style={{
              left: `${(minPrice / 500) * 100}%`,
              width: `${((maxPrice - minPrice) / 500) * 100}%`
            }}
          />
        </div>
        <input
          type="range"
          name="min"
          min="0"
          max="500"
          value={minPrice}
          onChange={handleRangeChange}
          className="range-input range-min"
        />
        <input
          type="range"
          name="max"
          min="0"
          max="500"
          value={maxPrice}
          onChange={handleRangeChange}
          className="range-input range-max"
        />
      </div>

      <div className="price-presets">
        <button onClick={() => onChange(0, 100)}>₪0-100</button>
        <button onClick={() => onChange(100, 200)}>₪100-200</button>
        <button onClick={() => onChange(200, 300)}>₪200-300</button>
        <button onClick={() => onChange(300, 500)}>₪300+</button>
      </div>
    </div>
  );
};

const LocationPanel = ({ selectedLocation, onLocationChange }) => {
  return (
    <div className="location-panel">
      <LocationSelector 
        onLocationChange={onLocationChange}
        initialCity={selectedLocation.city}
        initialNeighborhood={selectedLocation.neighborhood}
        className="location-selector-panel"
      />
    </div>
  );
};

const ExperiencePanel = ({ selected, onChange }) => {
  const { t } = useLanguage();
  
  const options = [
    { value: '', label: t('filters.allLevels') },
    { value: '1-2', label: `1-2 ${t('filters.years')}` },
    { value: '3-5', label: `3-5 ${t('filters.years')}` },
    { value: '6+', label: `6+ ${t('filters.years')}` }
  ];

  return (
    <div className="experience-panel">
      {options.map(option => (
        <label key={option.value} className="experience-option">
          <input
            type="radio"
            name="experience"
            value={option.value}
            checked={selected === option.value}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="experience-option-content">
            <span>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

const RatingPanel = ({ selected, onChange }) => {
  const { t } = useLanguage();
  
  const options = [
    { value: '', label: t('filters.allRatings') },
    { value: 5, label: `5 ${t('filters.stars')}` },
    { value: 4, label: `4+ ${t('filters.stars')}` },
    { value: 3, label: `3+ ${t('filters.stars')}` },
    { value: 2, label: `2+ ${t('filters.stars')}` },
    { value: 1, label: `1+ ${t('filters.star')}` }
  ];

  return (
    <div className="rating-panel">
      {options.map(option => (
        <label key={option.value} className="rating-option">
          <input
            type="radio"
            name="rating"
            value={option.value}
            checked={selected === option.value}
            onChange={(e) => onChange(e.target.value === '' ? '' : parseInt(e.target.value))}
          />
          <div className="rating-option-content">
            <span>{option.label}</span>
            {option.value !== '' && (
              <div className="stars-display">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < option.value ? "currentColor" : "none"}
                    className={i < option.value ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
            )}
          </div>
        </label>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANTS HELPERS RÉUTILISABLES
// ═══════════════════════════════════════════════════════════════════════════

// Composant générique pour section de checkboxes
const CheckboxSection = ({ title, options, filterKey, filters, onCheckboxChange }) => {
  const { t } = useLanguage();
  
  return (
    <div className="filter-section">
      <h4>{title}</h4>
      {options.map(opt => (
        <label key={opt.value} className="checkbox-option">
          <input
            type="checkbox"
            checked={filters[filterKey]?.includes(opt.value) || false}
            onChange={(e) => onCheckboxChange(filterKey, opt.value, e.target.checked)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
};

// Composant générique pour section de select
const SelectSection = ({ title, options, filterKey, filters, onFilterChange }) => {
  return (
    <div className="filter-section">
      <h4>{title}</h4>
      <select 
        value={filters[filterKey] || ''} 
        onChange={(e) => onFilterChange(filterKey, e.target.value)}
        className="filter-select"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

// Composant pour jours de disponibilité
const AvailabilityDaysSection = ({ filters, onExclusiveCheckbox, includeSaturday = false }) => {
  const { t } = useLanguage();
  const days = getCommonDays(t, includeSaturday);
  
  return (
    <div className="filter-section">
      <h4>{t('filters.common.availabilityDays')}</h4>
      {days.map(day => (
        <label key={day.value} className="checkbox-option">
          <input
            type="checkbox"
            checked={filters.availability_days?.includes(day.value) || false}
            onChange={() => onExclusiveCheckbox(
              'availability_days', 
              day.value, 
              t('days.allWeek'),
              days.filter(d => d.value !== t('days.allWeek')).map(d => d.value)
            )}
          />
          {day.label}
        </label>
      ))}
    </div>
  );
};

// Composant pour heures de disponibilité
const AvailabilityHoursSection = ({ filters, onExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const hours = getCommonHours(t);
  
  return (
    <div className="filter-section">
      <h4>{t('filters.common.availabilityHours')}</h4>
      {hours.map(hour => (
        <label key={hour.value} className="checkbox-option">
          <input
            type="checkbox"
            checked={filters.availability_hours?.includes(hour.value) || false}
            onChange={() => onExclusiveCheckbox(
              'availability_hours', 
              hour.value, 
              t('hours.all'),
              hours.filter(h => h.value !== t('hours.all')).map(h => h.value)
            )}
          />
          {hour.label}
        </label>
      ))}
    </div>
  );
};

// Composant pour filtre d'âge
const AgeRangeSection = ({ filters, onFilterChange }) => {
  const { t } = useLanguage();
  
  return (
    <div className="filter-section">
      <h4>{t('filters.common.age')}</h4>
      <div className="dual-range-inputs">
        <input
          type="number"
          placeholder={t('filters.minimum')}
          value={filters.minAge || ''}
          onChange={(e) => onFilterChange('minAge', e.target.value)}
          className="dual-range-input"
          min="18"
          max="70"
        />
        <span className="range-separator">-</span>
        <input
          type="number"
          placeholder={t('filters.maximum')}
          value={filters.maxAge || ''}
          onChange={(e) => onFilterChange('maxAge', e.target.value)}
          className="dual-range-input"
          min="18"
          max="70"
        />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SERVICE PANEL PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════

const ServicePanel = ({ serviceType, filters, onChange }) => {
  const { t } = useLanguage();
  
  const handleFilterChange = (key, value) => {
    onChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCheckboxChange = (key, value, checked) => {
    const current = filters[key] || [];
    const newValues = checked 
      ? [...current, value]
      : current.filter(item => item !== value);
    handleFilterChange(key, newValues);
  };

  const handleExclusiveCheckbox = (field, value, allValue, allOptions) => {
    const current = filters[field] || [];
    
    if (value === allValue) {
      if (!current.includes(allValue)) {
        handleFilterChange(field, [allValue]);
      } else {
        handleFilterChange(field, []);
      }
    } else {
      let newValues;
      if (current.includes(value)) {
        newValues = current.filter(v => v !== value);
      } else {
        newValues = [...current.filter(v => v !== allValue), value];
      }
      handleFilterChange(field, newValues);
    }
  };

  // Fonction helper pour créer des options traduites
  const getOptions = (configKey) => getFilterOptions(serviceType, configKey, t);
  const getTitle = (sectionKey) => getSectionTitle(serviceType, sectionKey, t);

  // Rendu selon le type de service
  switch (serviceType) {
    case 'babysitting':
      return (
        <BabysittingFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'cleaning':
      return (
        <CleaningFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'gardening':
      return (
        <GardeningFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      );
      
    case 'petcare':
      return (
        <PetcareFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      );
      
    case 'tutoring':
      return (
        <TutoringFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      );
      
    case 'eldercare':
      return (
        <EldercareFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      );
      
    case 'laundry':
      return (
        <LaundryFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'electrician':
      return (
        <ElectricianFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'plumbing':
      return (
        <PlumbingFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'air_conditioning':
      return (
        <AirConditioningFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'gas_technician':
      return (
        <GasTechnicianFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'drywall':
      return (
        <DrywallFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'carpentry':
      return (
        <CarpentryFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'property_management':
      return (
        <PropertyManagementFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      );
      
    case 'home_organization':
      return (
        <HomeOrganizationFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'painting':
      return (
        <PaintingFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'private_chef':
      return (
        <PrivateChefFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'event_entertainment':
      return (
        <EventEntertainmentFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'waterproofing':
      return (
        <WaterproofingFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'contractor':
      return (
        <ContractorFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'aluminum':
      return (
        <AluminumFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'glass_works':
      return (
        <GlassWorksFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    case 'locksmith':
      return (
        <LocksmithFilters 
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleCheckboxChange={handleCheckboxChange}
          handleExclusiveCheckbox={handleExclusiveCheckbox}
        />
      );
      
    default:
      return (
        <div className="service-panel">
          <p>{t('filters.noFiltersAvailable')}</p>
        </div>
      );
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSANTS FILTRES PAR SERVICE
// ═══════════════════════════════════════════════════════════════════════════

// BABYSITTING
const BabysittingFilters = ({ filters, handleFilterChange, handleCheckboxChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.babysitting;
  
  return (
    <div className="service-panel">
      <CheckboxSection 
        title={t(config.sectionTitles.ageGroups)}
        options={config.ageGroups.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="ageGroups"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      
      <AgeRangeSection filters={filters} onFilterChange={handleFilterChange} />
      
      <AvailabilityDaysSection 
        filters={filters} 
        onExclusiveCheckbox={handleExclusiveCheckbox}
      />
      
      <AvailabilityHoursSection 
        filters={filters} 
        onExclusiveCheckbox={handleExclusiveCheckbox}
      />
      
      <CheckboxSection 
        title={t(config.sectionTitles.babysittingTypes)}
        options={config.types.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="babysitting_types"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      
      <SelectSection 
        title={t(config.sectionTitles.canTravelAlone)}
        options={FILTER_CONFIG.common.yesNoOptions.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="can_travel_alone"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      <CheckboxSection 
        title={t(config.sectionTitles.languages)}
        options={config.languages.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="languages"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      
      <SelectSection 
        title={t(config.sectionTitles.certifications)}
        options={config.certifications.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="certifications"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      <SelectSection 
        title={t(config.sectionTitles.religiousLevel)}
        options={config.religiousLevels.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="religiousLevel"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

// CLEANING
const CleaningFilters = ({ filters, handleFilterChange, handleCheckboxChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.cleaning;
  
  return (
    <div className="service-panel">
      <div className="filter-category-section">
        <h4 className="filter-category-title">{t(config.sectionTitles.homeCleaning)}</h4>
        <div className="checkbox-grid">
          {config.homeCleaning.map(o => (
            <label key={o.value} className="checkbox-option">
              <input
                type="checkbox"
                checked={filters.cleaningTypes?.includes(o.value) || false}
                onChange={(e) => handleCheckboxChange('cleaningTypes', o.value, e.target.checked)}
              />
              {t(o.key)}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-category-section">
        <h4 className="filter-category-title">{t(config.sectionTitles.officeCleaning)}</h4>
        <div className="checkbox-grid">
          {config.officeCleaning.map(o => (
            <label key={o.value} className="checkbox-option">
              <input
                type="checkbox"
                checked={filters.cleaningTypes?.includes(o.value) || false}
                onChange={(e) => handleCheckboxChange('cleaningTypes', o.value, e.target.checked)}
              />
              {t(o.key)}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-category-section">
        <h4 className="filter-category-title">{t(config.sectionTitles.specialCleaning)}</h4>
        <div className="checkbox-grid">
          {config.specialCleaning.map(o => (
            <label key={o.value} className="checkbox-option">
              <input
                type="checkbox"
                checked={filters.cleaningTypes?.includes(o.value) || false}
                onChange={(e) => handleCheckboxChange('cleaningTypes', o.value, e.target.checked)}
              />
              {t(o.key)}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-category-section">
        <h4 className="filter-category-title">{t(config.sectionTitles.additionalServices)}</h4>
        <div className="checkbox-grid">
          {config.additionalServices.map(o => (
            <label key={o.value} className="checkbox-option">
              <input
                type="checkbox"
                checked={filters.cleaningTypes?.includes(o.value) || false}
                onChange={(e) => handleCheckboxChange('cleaningTypes', o.value, e.target.checked)}
              />
              {t(o.key)}
            </label>
          ))}
        </div>
      </div>

      <CheckboxSection 
        title={t(config.sectionTitles.frequency)}
        options={config.frequency.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="frequency"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />

      <SelectSection 
        title={t(config.sectionTitles.materialsProvided)}
        options={config.materialsOptions.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="materialsProvided"
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <AvailabilityDaysSection 
        filters={filters} 
        onExclusiveCheckbox={handleExclusiveCheckbox}
        includeSaturday={true}
      />
      
      <AvailabilityHoursSection 
        filters={filters} 
        onExclusiveCheckbox={handleExclusiveCheckbox}
      />
    </div>
  );
};

// Les autres composants suivent le même pattern...
// Je vais créer des placeholders pour l'instant

const GardeningFilters = ({ filters, handleFilterChange, handleCheckboxChange }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.gardening;
  
  return (
    <div className="service-panel">
      <CheckboxSection 
        title={t(config.sectionTitles.services)}
        options={config.services.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="services"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.seasons)}
        options={config.seasons.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="seasons"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.equipment)}
        options={config.equipment.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="equipment"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.specializations)}
        options={config.specializations.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="specializations"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.additionalServices)}
        options={config.additionalServices.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="additionalServices"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};

const PetcareFilters = ({ filters, handleFilterChange, handleCheckboxChange }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.petcare;
  
  return (
    <div className="service-panel">
      <CheckboxSection 
        title={t(config.sectionTitles.animalTypes)}
        options={config.animalTypes.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="animalTypes"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.dogSizes)}
        options={config.dogSizes.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="dogSizes"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <SelectSection 
        title={t(config.sectionTitles.careLocation)}
        options={config.locationOptions.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="location"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.additionalServices)}
        options={config.additionalServices.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="additionalServices"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.facilities)}
        options={config.facilities.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="facilities"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.veterinaryServices)}
        options={config.veterinaryServices.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="veterinaryServices"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};

const EldercareFilters = ({ filters, handleFilterChange, handleCheckboxChange }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.eldercare;
  
  return (
    <div className="service-panel">
      <CheckboxSection 
        title={t(config.sectionTitles.careTypes)}
        options={config.careTypes.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="careTypes"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.availability)}
        options={config.availability.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="availability"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxSection 
        title={t(config.sectionTitles.specificConditions)}
        options={config.specificConditions.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="specificConditions"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <SelectSection 
        title={t(config.sectionTitles.administrativeHelp)}
        options={FILTER_CONFIG.common.yesNoOptions.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="administrativeHelp"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <SelectSection 
        title={t(config.sectionTitles.medicalAccompaniment)}
        options={FILTER_CONFIG.common.yesNoOptions.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="medicalAccompaniment"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <SelectSection 
        title={t(config.sectionTitles.vehicleForOutings)}
        options={FILTER_CONFIG.common.yesNoOptions.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="vehicleForOutings"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

// TUTORING - avec chargement dynamique des sous-catégories
const TutoringFilters = ({ filters, handleFilterChange, handleCheckboxChange }) => {
  const { t } = useLanguage();
  const { apiCall } = useAuth();
  const config = FILTER_CONFIG.tutoring;
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSubcategories = async () => {
      try {
        setLoading(true);
        const response = await apiCall('/services/5/subcategories', 'GET');
        if (response.success && response.data.subcategories) {
          setSubcategories(response.data.subcategories);
          setError(null);
        } else {
          throw new Error('Format de réponse invalide');
        }
      } catch (err) {
        console.error('Erreur chargement sous-catégories:', err);
        setError(t('filters.tutoring.loadError'));
      } finally {
        setLoading(false);
      }
    };
    loadSubcategories();
  }, [apiCall, t]);

  const groupedSubcategories = useMemo(() => {
    if (!subcategories.length) return {};
    return {
      academic: { title: t('filters.tutoring.academicSubjects'), items: subcategories.filter(s => s.display_order >= 200 && s.display_order <= 223) },
      music: { title: t('filters.tutoring.music'), items: subcategories.filter(s => s.display_order >= 1 && s.display_order <= 7) },
      art: { title: t('filters.tutoring.art'), items: subcategories.filter(s => s.display_order >= 10 && s.display_order <= 16) },
      dance: { title: t('filters.tutoring.dance'), items: subcategories.filter(s => s.display_order >= 20 && s.display_order <= 24) },
      theater: { title: t('filters.tutoring.theater'), items: subcategories.filter(s => s.display_order >= 30 && s.display_order <= 33) },
      languages: { title: t('filters.tutoring.languages'), items: subcategories.filter(s => s.display_order >= 40 && s.display_order <= 46) },
      crafts: { title: t('filters.tutoring.crafts'), items: subcategories.filter(s => s.display_order >= 50 && s.display_order <= 54) },
      tech: { title: t('filters.tutoring.tech'), items: subcategories.filter(s => s.display_order >= 60 && s.display_order <= 64) },
      cooking: { title: t('filters.tutoring.cooking'), items: subcategories.filter(s => s.display_order >= 70 && s.display_order <= 73) },
      personal: { title: t('filters.tutoring.personal'), items: subcategories.filter(s => s.display_order >= 80 && s.display_order <= 84) },
      sports: { title: t('filters.tutoring.sports'), items: subcategories.filter(s => s.display_order >= 90 && s.display_order <= 109) }
    };
  }, [subcategories, t]);

  if (loading) {
    return (
      <div className="service-panel">
        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
          <div className="loading-spinner" style={{ margin: '0 auto 1rem' }}></div>
          <p>{t('filters.tutoring.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="service-panel">
        <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="service-panel">
      {Object.entries(groupedSubcategories).map(([key, group]) => (
        group.items.length > 0 && (
          <div key={key} className="filter-section" style={{ marginBottom: '1.5rem' }}>
            <h4>{group.title}</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
              {group.items.map(subcat => (
                <label key={subcat.id} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={filters.subjects?.includes(subcat.name_he) || false}
                    onChange={(e) => handleCheckboxChange('subjects', subcat.name_he, e.target.checked)}
                  />
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{subcat.icon}</span>
                    <span>{subcat.name_he}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        )
      ))}

      <CheckboxSection 
        title={t(config.sectionTitles.levels)}
        options={config.levels.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="levels"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />

      <SelectSection 
        title={t(config.sectionTitles.teachingMode)}
        options={config.teachingModes.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="teachingMode"
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <CheckboxSection 
        title={t(config.sectionTitles.specializations)}
        options={config.specializations.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="specializations"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};

// Placeholders pour les autres services (même pattern)
const LaundryFilters = ({ filters, handleFilterChange, handleCheckboxChange, handleExclusiveCheckbox }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.laundry;
  return (
    <div className="service-panel">
      <CheckboxSection 
        title={t(config.sectionTitles.laundryTypes)}
        options={config.types.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="laundryTypes"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      <AvailabilityDaysSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} includeSaturday={true} />
      <AvailabilityHoursSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <SelectSection 
        title={t(config.sectionTitles.pickupService)}
        options={FILTER_CONFIG.common.yesNoOptions.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="pickupService"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

// Pour les services techniques (electrician, plumbing, etc.), le pattern est similaire
// avec les catégories hiérarchiques. Je vais créer un composant générique :

const TechnicalServiceFilters = ({ 
  filters, 
  handleFilterChange, 
  handleCheckboxChange, 
  handleExclusiveCheckbox,
  serviceConfig,
  filterMappings 
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="service-panel">
      {/* Work Types avec sous-catégories */}
      <div className="filter-section">
        <h4>{t(serviceConfig.sectionTitles.workTypes)}</h4>
   {serviceConfig.workTypes?.map(wt => (
          <div key={wt.value}>
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={filters.work_types?.includes(wt.value) || false}
                onChange={(e) => handleCheckboxChange('work_types', wt.value, e.target.checked)}
              />
              {t(wt.key)}
            </label>
            
            {/* Sous-catégories si le type principal est coché */}
            {filters.work_types?.includes(wt.value) && filterMappings[wt.value] && (
              <div className="filter-category-section" style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                <h4 className="filter-category-title">{t(filterMappings[wt.value].title)}</h4>
                <div className="checkbox-grid">
                  {filterMappings[wt.value].options.map(opt => (
                    <label key={opt.value} className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={filters[filterMappings[wt.value].filterKey]?.includes(opt.value) || false}
                        onChange={(e) => handleCheckboxChange(filterMappings[wt.value].filterKey, opt.value, e.target.checked)}
                      />
                      {t(opt.key)}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <AvailabilityDaysSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AvailabilityHoursSection filters={filters} onExclusiveCheckbox={handleExclusiveCheckbox} />
      <AgeRangeSection filters={filters} onFilterChange={handleFilterChange} />
    </div>
  );
};

// Implémentations spécifiques utilisant TechnicalServiceFilters
const ElectricianFilters = (props) => {
  const config = FILTER_CONFIG.electrician;
  const filterMappings = {
    'תיקונים': { title: config.sectionTitles.repairTypes, filterKey: 'repair_types', options: config.repairTypes },
    'התקנות': { title: config.sectionTitles.installationTypes, filterKey: 'installation_types', options: config.installationTypes },
    'עבודות חשמל גדולות': { title: config.sectionTitles.largeWorkTypes, filterKey: 'large_work_types', options: config.largeWorkTypes }
  };
  return <TechnicalServiceFilters {...props} serviceConfig={config} filterMappings={filterMappings} />;
};

const PlumbingFilters = (props) => {
  const config = FILTER_CONFIG.plumbing;
  const filterMappings = {
    'סתימות': { title: config.sectionTitles.blockageTypes, filterKey: 'blockage_types', options: config.blockageTypes },
    'תיקון צנרת': { title: config.sectionTitles.pipeRepairTypes, filterKey: 'pipe_repair_types', options: config.pipeRepairTypes },
    'עבודות גדולות': { title: config.sectionTitles.largeWorkTypes, filterKey: 'large_work_types', options: config.largeWorkTypes },
    'תיקון והתקנת אביזרי אינסטלציה': { title: config.sectionTitles.fixtureTypes, filterKey: 'fixture_types', options: config.fixtureTypes }
  };
  return <TechnicalServiceFilters {...props} serviceConfig={config} filterMappings={filterMappings} />;
};

const AirConditioningFilters = (props) => {
  const config = FILTER_CONFIG.air_conditioning;
  const filterMappings = {
    'התקנת מזגנים': { title: config.sectionTitles.installationTypes, filterKey: 'installation_types', options: config.installationTypes },
    'תיקון מזגנים': { title: config.sectionTitles.repairTypes, filterKey: 'repair_types', options: config.repairTypes },
    'פירוק והרכבת מזגנים': { title: config.sectionTitles.disassemblyTypes, filterKey: 'disassembly_types', options: config.disassemblyTypes }
  };
  return <TechnicalServiceFilters {...props} serviceConfig={config} filterMappings={filterMappings} />;
};

const GasTechnicianFilters = (props) => {
  const config = FILTER_CONFIG.gas_technician;
  const filterMappings = {
    'התקנת צנרת גז בבית': { title: config.sectionTitles.installationTypes, filterKey: 'installation_types', options: config.installationTypes },
    'תיקוני גז בבית': { title: config.sectionTitles.repairTypes, filterKey: 'repair_types', options: config.repairTypes }
  };
  return <TechnicalServiceFilters {...props} serviceConfig={config} filterMappings={filterMappings} />;
};

const DrywallFilters = (props) => {
  const config = FILTER_CONFIG.drywall;
  const filterMappings = {
    'עיצובים בגבס': { title: config.sectionTitles.designTypes, filterKey: 'design_types', options: config.designTypes },
    'עבודות גבס': { title: config.sectionTitles.constructionTypes, filterKey: 'construction_types', options: config.constructionTypes }
  };
  return <TechnicalServiceFilters {...props} serviceConfig={config} filterMappings={filterMappings} />;
};

// Autres services simplifiés
const CarpentryFilters = (props) => <TechnicalServiceFilters {...props} serviceConfig={FILTER_CONFIG.carpentry} filterMappings={{}} />;
const PropertyManagementFilters = ({ filters, handleFilterChange, handleCheckboxChange }) => {
  const { t } = useLanguage();
  const config = FILTER_CONFIG.property_management;
  
  return (
    <div className="service-panel">
      <CheckboxSection 
        title={t(config.sectionTitles.fullYearRental)}
        options={config.fullYearRental.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="fullYearRental"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
      
      <CheckboxSection 
        title={t(config.sectionTitles.shortTermRental)}
        options={config.shortTermRental.map(o => ({ value: o.value, label: t(o.key) }))}
        filterKey="shortTermRental"
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};
const HomeOrganizationFilters = (props) => <TechnicalServiceFilters {...props} serviceConfig={FILTER_CONFIG.home_organization} filterMappings={{}} />;
const PaintingFilters = (props) => <TechnicalServiceFilters {...props} serviceConfig={FILTER_CONFIG.painting} filterMappings={{}} />;
const PrivateChefFilters = (props) => <TechnicalServiceFilters {...props} serviceConfig={FILTER_CONFIG.private_chef} filterMappings={{}} />;
const EventEntertainmentFilters = (props) => <TechnicalServiceFilters {...props} serviceConfig={FILTER_CONFIG.event_entertainment} filterMappings={{}} />;
const WaterproofingFilters = (props) => <TechnicalServiceFilters {...props} serviceConfig={FILTER_CONFIG.waterproofing} filterMappings={{}} />;
const ContractorFilters = (props) => <TechnicalServiceFilters {...props} serviceConfig={FILTER_CONFIG.contractor} filterMappings={{}} />;
const AluminumFilters = (props) => <TechnicalServiceFilters {...props} serviceConfig={FILTER_CONFIG.aluminum} filterMappings={{}} />;
const GlassWorksFilters = (props) => <TechnicalServiceFilters {...props} serviceConfig={FILTER_CONFIG.glass_works} filterMappings={{}} />;
const LocksmithFilters = (props) => <TechnicalServiceFilters {...props} serviceConfig={FILTER_CONFIG.locksmith} filterMappings={{}} />;

export default FilterBar;