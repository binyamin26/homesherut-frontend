import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const EldercareForm = ({ serviceDetails, errors, handleServiceDetailsChange, handleExclusiveCheckbox }) => {
    const { t } = useLanguage();
    
    const careTypes = [
      { key: 'companionship', label: t('serviceForm.eldercare.careTypes.companionship') },
      { key: 'houseCleaning', label: t('serviceForm.eldercare.careTypes.houseCleaning') },
      { key: 'cooking', label: t('serviceForm.eldercare.careTypes.cooking') },
      { key: 'shopping', label: t('serviceForm.eldercare.careTypes.shopping') },
      { key: 'medication', label: t('serviceForm.eldercare.careTypes.medication') },
      { key: 'doctorVisits', label: t('serviceForm.eldercare.careTypes.doctorVisits') }
    ];

    const specialConditions = [
      { key: 'alzheimer', label: t('serviceForm.eldercare.conditions.alzheimer') },
      { key: 'parkinson', label: t('serviceForm.eldercare.conditions.parkinson') },
      { key: 'diabetes', label: t('serviceForm.eldercare.conditions.diabetes') },
      { key: 'mobility', label: t('serviceForm.eldercare.conditions.mobility') },
      { key: 'dementia', label: t('serviceForm.eldercare.conditions.dementia') }
    ];

  return (
    <div className="service-details-form">
      <h3>{t('serviceForm.eldercare.title')}</h3>
      
      <div className="form-section">
        {t('serviceForm.common.requiredFields')}
        
        <div className="input-group">
          <label>{t('serviceForm.eldercare.careTypesLabel')}</label>
          <div className="checkbox-group" data-field="careTypes">
            {careTypes.map(type => (
              <label key={type.key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.careTypes?.includes(type.key) || false}
                  onChange={(e) => {
                    const current = serviceDetails.careTypes || [];
                    const newTypes = e.target.checked 
                      ? [...current, type.key]
                      : current.filter(t => t !== type.key);
                    handleServiceDetailsChange('careTypes', newTypes);
                  }}
                />
                {type.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.careTypes'] && <span className="error-text">{errors['serviceDetails.careTypes']}</span>}
        </div>

        <div className="input-group">
          <label>{t('serviceForm.eldercare.certification')}</label>
          <input
            type="text"
             inputMode="numeric"
            value={serviceDetails.certification || ''}
            onChange={(e) => handleServiceDetailsChange('certification', e.target.value)}
            placeholder={t('serviceForm.eldercare.certificationPlaceholder')}
            className={`standard-input ${errors['serviceDetails.certification'] ? 'error' : ''}`}
            data-field="certification"
          />
          {errors['serviceDetails.certification'] && <span className="error-text">{errors['serviceDetails.certification']}</span>}
        </div>

        <div className="input-group">
          <label>{t('serviceForm.eldercare.availability')}</label>
          <div className="checkbox-group" data-field="availability">
            {[
              { value: 'morning', label: t('hours.morning') },
              { value: 'afternoon', label: t('hours.afternoon') },
              { value: 'evening', label: t('hours.evening') },
              { value: 'all', label: t('hours.all') }
            ].map(hour => (
              <label key={hour.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.availability_hours?.includes(hour.value) || false}
                  onChange={() => handleExclusiveCheckbox('availability_hours', hour.value, 'all', ['morning', 'afternoon', 'evening'])}
                />
                {hour.label}
              </label>
            ))}
          </div>
          {errors['serviceDetails.availability'] && <span className="error-text">{errors['serviceDetails.availability']}</span>}
        </div>

        <div className="input-group">
          <label>{t('serviceForm.eldercare.experience')}</label>
          <input
           type="text"
 inputMode="numeric"
 autoComplete="off"
            value={serviceDetails.experience || ''}
        onChange={(e) => {
  const numericValue = e.target.value.replace(/\D/g, '');
  handleServiceDetailsChange('experience', numericValue);  // ← 'experience' ici !
}}
            className={`standard-input ${errors['serviceDetails.experience'] ? 'error' : ''}`}
            data-field="experience"
          />
          {errors['serviceDetails.experience'] && <span className="error-text">{errors['serviceDetails.experience']}</span>}
        </div>
      </div>

      <div className="form-section optional">
        <h4>{t('serviceForm.common.optionalFields')}</h4>
        
        <div className="input-group">
          <label>{t('serviceForm.eldercare.specialConditions')}</label>
          <div className="checkbox-group">
            {specialConditions.map(condition => (
              <label key={condition.key} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={serviceDetails.specialConditions?.includes(condition.key) || false}
                  onChange={(e) => {
                    const current = serviceDetails.specialConditions || [];
                    const newConditions = e.target.checked 
                      ? [...current, condition.key]
                      : current.filter(c => c !== condition.key);
                    handleServiceDetailsChange('specialConditions', newConditions);
                  }}
                />
                {condition.label}
              </label>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>{t('serviceForm.eldercare.languages')}</label>
          <input
            type="text"
            autoComplete="off"
            value={serviceDetails.languages || ''}
            onChange={(e) => handleServiceDetailsChange('languages', e.target.value)}
            placeholder={t('serviceForm.eldercare.languagesPlaceholder')}
            className="standard-input"
          />
        </div>
      </div>
    </div>
  );
};

export default EldercareForm;