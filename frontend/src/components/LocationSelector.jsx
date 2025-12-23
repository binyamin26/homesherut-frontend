import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { getAllCities, getNeighborhoodsByCity, getCitiesByArea, israelAreas } from '../data/israelLocations';

const LocationSelector = ({ 
  onLocationChange, 
  initialCity = '', 
  initialNeighborhood = '',
  className = '',
  showAreaFilter = false 
}) => {
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(initialNeighborhood);
  const [availableCities, setAvailableCities] = useState(getAllCities());
  const [availableNeighborhoods, setAvailableNeighborhoods] = useState([]);

  // Mise à jour des villes disponibles selon la région sélectionnée
  useEffect(() => {
    if (selectedArea) {
      setAvailableCities(getCitiesByArea(selectedArea));
      setSelectedCity(''); // Reset city when area changes
      setSelectedNeighborhood(''); // Reset neighborhood when area changes
    } else {
      setAvailableCities(getAllCities());
    }
  }, [selectedArea]);

  // Mise à jour des quartiers disponibles selon la ville sélectionnée
  useEffect(() => {
    if (selectedCity) {
      const neighborhoods = getNeighborhoodsByCity(selectedCity);
      setAvailableNeighborhoods(neighborhoods);
      // Reset neighborhood if it doesn't exist in new city
      if (selectedNeighborhood && !neighborhoods.includes(selectedNeighborhood)) {
        setSelectedNeighborhood('');
      }
    } else {
      setAvailableNeighborhoods([]);
      setSelectedNeighborhood('');
    }
  }, [selectedCity]);

  // Synchroniser avec les props externes (pour le bouton נקה)
useEffect(() => {
  if (initialCity === '' && selectedCity !== '') {
    setSelectedCity('');
    setSelectedNeighborhood('');
  }
}, [initialCity]);

  // Notifier le parent des changements
  useEffect(() => {
    onLocationChange({
      area: selectedArea,
      city: selectedCity,
      neighborhood: selectedNeighborhood,
      fullLocation: getFullLocationString()
    });
  }, [selectedArea, selectedCity, selectedNeighborhood]);

  const getFullLocationString = () => {
    const parts = [];
    if (selectedNeighborhood) parts.push(selectedNeighborhood);
    if (selectedCity) parts.push(selectedCity);
    if (selectedArea && !selectedCity) parts.push(selectedArea);
    return parts.join(', ');
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleNeighborhoodChange = (e) => {
    setSelectedNeighborhood(e.target.value);
  };

  const clearSelection = () => {
    setSelectedArea('');
    setSelectedCity('');
    setSelectedNeighborhood('');
  };

  return (
    <div className={`location-selector ${className}`}>
      <div className="location-selector-header">
        <h3 className="location-selector-title">
          <MapPin size={20} className="location-icon" />
          בחר מיקום
        </h3>
      </div>

      <div className="location-dropdowns-container">
        <div className="location-dropdowns">
          {/* Sélection de ville */}
          <div className="dropdown-group">
            <label htmlFor="city-select">עיר:</label>
            <div className="dropdown-wrapper">
              <select
                id="city-select"
                value={selectedCity}
                onChange={handleCityChange}
                className="location-dropdown city-dropdown"
              >
                <option value="">בחר עיר</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="dropdown-icon" />
            </div>
          </div>

          {/* Sélection de quartier - CONDITIONNEL */}
          {selectedCity && availableNeighborhoods.length > 0 && (
            <div className="dropdown-group">
              <label htmlFor="neighborhood-select">שכונה:</label>
              <div className="dropdown-wrapper">
                <select
                  id="neighborhood-select"
                  value={selectedNeighborhood}
                  onChange={handleNeighborhoodChange}
                  className="location-dropdown neighborhood-dropdown"
                >
                  <option value="">כל השכונות ב{selectedCity}</option>
                  {availableNeighborhoods.map((neighborhood) => (
                    <option key={neighborhood} value={neighborhood}>
                      {neighborhood}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="dropdown-icon" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Affichage de la sélection actuelle */}
      {getFullLocationString() && (
        <div className="selected-location-display">
          <div className="selected-location-label">מיקום נבחר:</div>
          <div className="selected-location-value">{getFullLocationString()}</div>
        </div>
      )}

    </div>
  );
};

export default LocationSelector;