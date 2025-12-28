import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const PropertyManagementForm = ({ serviceDetails, errors, handleServiceDetailsChange }) => {
    const { t } = useLanguage();
    
    const longTermManagement = [
      { key: 'tenantSearch', label: t('serviceForm.propertyManagement.longTerm.tenantSearch') },
      { key: 'contracts', label: t('serviceForm.propertyManagement.longTerm.contracts') },
      { key: 'rentCollection', label: t('serviceForm.propertyManagement.longTerm.rentCollection') },
      { key: 'inspection', label: t('serviceForm.propertyManagement.longTerm.inspection') },
      { key: 'utilities', label: t('serviceForm.propertyManagement.longTerm.utilities') }
    ];

    const shortTermManagement = [
      { key: 'listings', label: t('serviceForm.propertyManagement.shortTerm.listings') },
      { key: 'bookings', label: t('serviceForm.propertyManagement.shortTerm.bookings') },
      { key: 'checkin', label: t('serviceForm.propertyManagement.shortTerm.checkin') },
      { key: 'cleaning', label: t('serviceForm.propertyManagement.shortTerm.cleaning') },
      { key: 'inspection', label: t('serviceForm.propertyManagement.shortTerm.inspection') },
      { key: 'repairs', label: t('serviceForm.propertyManagement.shortTerm.repairs') }
    ];

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.propertyManagement.title')}</h3>

<div className="form-section">
        {t('serviceForm.common.requiredFields')}

        <div className="input-group">
          <label>{t('serviceForm.common.experience')}</label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={serviceDetails.experience || ''}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, '');
              handleServiceDetailsChange('experience', numericValue);
            }}
            className={`standard-input ${errors['serviceDetails.experience'] ? 'error' : ''}`}
            data-field="experience"
          />
          {errors['serviceDetails.experience'] && <span className="error-text">{errors['serviceDetails.experience']}</span>}
        </div>
        
        <div className="input-group">
          <label>{t('serviceForm.propertyManagement.managementTypesLabel')}</label>
          
          <div style={{marginBottom: '16px'}}>
            <div style={{fontWeight: '600', marginBottom: '8px', color: '#374151'}}>
              🏠 {t('serviceForm.propertyManagement.longTermTitle')}
            </div>
            <div className="checkbox-group" data-field="management_type">
              {longTermManagement.map((type) => (
                <label key={type.key} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={serviceDetails.management_type?.includes(type.key) || false}
                    onChange={(e) => {
                      const current = serviceDetails.management_type || [];
                      const newTypes = e.target.checked
                        ? [...current, type.key]
                        : current.filter(t => t !== type.key);
                      handleServiceDetailsChange('management_type', newTypes);
                    }}
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>

          <div style={{marginBottom: '16px'}}>
            <div style={{fontWeight: '600', marginBottom: '8px', color: '#374151'}}>
              🏖️ {t('serviceForm.propertyManagement.shortTermTitle')}
            </div>
            <div className="checkbox-group">
              {shortTermManagement.map((type) => (
                <label key={type.key} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={serviceDetails.management_type?.includes(type.key) || false}
                    onChange={(e) => {
                      const current = serviceDetails.management_type || [];
                      const newTypes = e.target.checked
                        ? [...current, type.key]
                        : current.filter(t => t !== type.key);
                      handleServiceDetailsChange('management_type', newTypes);
                    }}
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>

          {errors['serviceDetails.management_type'] && (
            <span className="error-text">{errors['serviceDetails.management_type']}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyManagementForm;