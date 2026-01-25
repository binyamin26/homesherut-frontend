import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('he');
  const dropdownRef = useRef(null);

  // Langues disponibles avec drapeaux et configurations RTL
  const languages = [
    { 
      code: 'he', 
      name: 'עברית', 
      flag: '🇮🇱', 
      dir: 'rtl'
    },
    { 
      code: 'en', 
      name: 'English', 
      flag: '🇬🇧', 
      dir: 'ltr'
    },
    { 
      code: 'ru', 
      name: 'Русский', 
      flag: '🇷🇺', 
      dir: 'ltr'
    },
    { 
      code: 'fr', 
      name: 'Français', 
      flag: '🇫🇷', 
      dir: 'ltr'
    }
  ];

  // Récupérer la langue sauvegardée au démarrage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('homesherut_language');
    if (savedLanguage && languages.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
      applyLanguageSettings(savedLanguage);
    } else {
      // Détecter la langue du navigateur ou utiliser hébreu par défaut
      const browserLang = navigator.language.slice(0, 2);
      const supportedLang = languages.find(lang => lang.code === browserLang);
      const defaultLang = supportedLang ? supportedLang.code : 'he';
      setCurrentLanguage(defaultLang);
      applyLanguageSettings(defaultLang);
    }
  }, []);

  // Fermer le dropdown si clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Appliquer les paramètres de langue (direction RTL/LTR)
  const applyLanguageSettings = (langCode) => {
    const language = languages.find(lang => lang.code === langCode);
    if (language) {
      document.documentElement.setAttribute('dir', language.dir);
      document.documentElement.setAttribute('lang', langCode);
      
      // Sauvegarder dans localStorage
      localStorage.setItem('homesherut_language', langCode);
      
      // Événement personnalisé pour informer l'app du changement
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: langCode, direction: language.dir } 
      }));
    }
  };

  // Changer de langue
  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    applyLanguageSettings(langCode);
    setIsOpen(false);
    
    // Optionnel : Recharger la page pour appliquer les traductions
    // window.location.reload();
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button
        className="language-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="בחר שפה"
      >
        <Globe className="language-icon" size={18} />
        <span className="language-current">
          <span className="language-flag">{currentLang?.flag}</span>
          <span className="language-name">{currentLang?.displayName}</span>
        </span>
        <ChevronDown 
          className={`language-chevron ${isOpen ? 'rotate' : ''}`} 
          size={16} 
        />
      </button>

      <div className={`language-dropdown ${isOpen ? 'open' : ''}`}>
        {languages.map((language) => (
          <button
            key={language.code}
            className={`language-option ${currentLanguage === language.code ? 'active' : ''}`}
            onClick={() => handleLanguageChange(language.code)}
          >
            <span className="language-flag">{language.flag}</span>
            <span className="language-name">{language.name}</span>
            {currentLanguage === language.code && (
              <span className="language-check">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;