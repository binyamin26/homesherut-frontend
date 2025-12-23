import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import searchableServices from '../../data/searchableServices';
import { useLanguage } from '../../context/LanguageContext';

const ServiceSearchBar = ({ style }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  // Fermer dropdown quand clic dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(-1);

    if (value.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const lowerValue = value.toLowerCase();
    
    // Rechercher dans les labels hébreux
    const hebrewMatches = searchableServices.filter((item) => {
      const words = item.label.split(' ');
      return words.some(word => word.startsWith(value));
    });

    // Rechercher dans les traductions des services principaux
const translatedMatches = searchableServices.filter((item) => {
  if (item.type !== 'service') return false;
  
  const serviceKey = `services.${item.href.split('/').pop()}`;
  const translatedName = t(serviceKey).toLowerCase();
  
  // Utiliser startsWith au lieu de includes pour correspondre au comportement hébreu
  return translatedName.startsWith(lowerValue);
});

   // Combiner sans doublons (déduplication par href uniquement)
const combined = [...hebrewMatches];
translatedMatches.forEach(match => {
  if (!combined.find(item => item.href === match.href)) {
    combined.push(match);
  }
});

    setResults(combined.slice(0, 10));
    setIsOpen(true);
  };

  const handleSelect = (item) => {
    setQuery('');
    setIsOpen(false);
    navigate(item.href);
  };

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Fonction pour obtenir le nom traduit
  const getDisplayName = (item) => {
    if (item.type === 'service') {
      const serviceKey = `services.${item.href.split('/').pop()}`;
      return t(serviceKey);
    }
    // Pour les sous-catégories, afficher le label hébreu
    return item.label;
  };

  return (
 <div className="service-search-wrapper" ref={wrapperRef} style={style}>
      <div className="service-search-input-container">
        <Search className="service-search-icon" size={20} />
        <input
          type="text"
          className="service-search-input"
          placeholder={t('search.placeholder')}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && results.length > 0 && setIsOpen(true)}
        />
      </div>

      {isOpen && results.length > 0 && (
        <ul className="service-search-dropdown">
          {results.map((item, index) => (
            <li
              key={`${item.label}-${index}`}
              className={`service-search-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleSelect(item)}
            >
              <span className="service-search-label">{getDisplayName(item)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceSearchBar;