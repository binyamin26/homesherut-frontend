import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import serviceFieldsConfig from './../config/serviceFieldsConfig';

const ServiceDetailsEditor = ({ 
  serviceType, 
  serviceDetails, 
  isEditMode, 
  onFieldChange, 
  onArrayChange 
}) => {
  const { t } = useLanguage(); // ✅ AJOUT
  const config = serviceFieldsConfig[serviceType];
  
  if (!config) {
    return <p>{t('dashboard.noServiceConfig')}</p>;
  }

  const renderField = (field) => {
    const value = serviceDetails?.[field.name];

    // MODE LECTURE
    if (!isEditMode) {
      if (field.type === 'json-array' || field.type === 'checkbox') {
        return (
          <div className="tags-list">
            {Array.isArray(value) && value.length > 0 
              ? value.join(', ')
              : <span>{t('dashboard.notSpecified')}</span>
            }
          </div>
        );
      }
      
      if (field.type === 'number') {
        return <span>{value || 0}</span>;
      }

      if (field.type === 'boolean-select') {
        return <span>{value ? t('common.yes') : t('common.no')}</span>;
      }

      if (field.type === 'select') {
        const selectedOption = field.options?.find(opt => 
          typeof opt === 'string' ? opt === value : opt.value === value
        );
        const displayValue = typeof selectedOption === 'string' ? selectedOption : selectedOption?.label;
        return <span>{displayValue || value || t('dashboard.notSpecified')}</span>;
      }

      if (field.type === 'text') {
        return <span>{value || t('dashboard.notSpecified')}</span>;
      }
      
      return <span>{value || t('dashboard.notSpecified')}</span>;
    }

    // MODE ÉDITION
    if (field.type === 'number') {
      return (
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onFieldChange(field.name, e.target.value)}
          className="form-input inline-edit"
          min="0"
        />
      );
    }

    if (field.type === 'text') {
      return (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onFieldChange(field.name, e.target.value)}
          className="form-input inline-edit"
        />
      );
    }

    if (field.type === 'boolean-select') {
      return (
        <select
          value={value === true ? 'yes' : value === false ? 'no' : ''}
          onChange={(e) => onFieldChange(field.name, e.target.value === 'yes')}
          className="form-input inline-edit"
        >
          <option value="">{t('common.select')}</option>
          <option value="yes">{t('common.yes')}</option>
          <option value="no">{t('common.no')}</option>
        </select>
      );
    }

    if (field.type === 'select') {
      return (
        <select
          value={value || ''}
          onChange={(e) => onFieldChange(field.name, e.target.value)}
          className="form-input inline-edit"
        >
          <option value="">{t('common.select')}</option>
          {field.options.map((opt, i) => {
            const optValue = typeof opt === 'string' ? opt : opt.value;
            const optLabel = typeof opt === 'string' ? opt : opt.label;
            return <option key={i} value={optValue}>{optLabel}</option>;
          })}
        </select>
      );
    }

    if (field.type === 'json-array' || field.type === 'checkbox') {
      // ✅ Définir les options "tout sélectionner" pour chaque champ
      const selectAllOptions = {
        'availability_days': 'כל השבוע',
        'availability_hours': 'הכל',
        'availableDays': 'כל השבוע',
        'availableHours': 'הכל'
      };
      
      const selectAllOption = selectAllOptions[field.name];
      const hasSelectAll = selectAllOption && field.options.includes(selectAllOption);
      
      const handleCheckboxChange = (option, checked) => {
        if (!hasSelectAll) {
          // Pas de logique spéciale
          onArrayChange(field.name, option, checked);
          return;
        }
        
        const currentValues = value || [];
        
        if (option === selectAllOption) {
          // Si on coche "כל השבוע" ou "הכל" → décocher tous les autres
          if (checked) {
            // Décocher tous les autres d'abord
            currentValues.forEach(v => {
              if (v !== selectAllOption) {
                onArrayChange(field.name, v, false);
              }
            });
            // Puis cocher l'option "tout"
            setTimeout(() => onArrayChange(field.name, option, true), 0);
          } else {
            onArrayChange(field.name, option, false);
          }
        } else {
          // Si on coche un jour/heure spécifique → décocher "כל השבוע" ou "הכל"
          if (checked && currentValues.includes(selectAllOption)) {
            onArrayChange(field.name, selectAllOption, false);
            setTimeout(() => onArrayChange(field.name, option, true), 0);
          } else {
            onArrayChange(field.name, option, checked);
          }
        }
      };
      
      return (
        <div className="checkbox-grid">
          {field.options.map(option => (
            <label key={option} className="checkbox-item">
              <input
                type="checkbox"
                checked={(value || []).includes(option)}
                onChange={(e) => handleCheckboxChange(option, e.target.checked)}
              />
              {option}
            </label>
          ))}
        </div>
      );
    }

    return (
      <div style={{color: 'red', padding: '10px', background: '#fee'}}>
        <strong>⚠️ {t('dashboard.unsupportedFieldType')}:</strong> {field.type}
        <br />
        <small>{t('dashboard.field')}: {field.name}, {t('dashboard.value')}: {JSON.stringify(value)}</small>
      </div>
    );
  };

  return (
    <div className="info-section">
      <h3 className="section-title">{t('dashboard.serviceDetails')}</h3>
      <div className="service-specific-grid">
        {config.fields.map(field => (
          <div 
            key={field.name} 
            className={`professional-item ${field.type === 'json-array' ? 'full-width' : ''}`}
          >
            <label>{t(field.label)}:</label> {/* ✅ UTILISATION DE t() */}
            {renderField(field)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetailsEditor;