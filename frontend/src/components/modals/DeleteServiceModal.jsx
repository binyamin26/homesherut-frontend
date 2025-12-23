import React, { useState } from 'react';
import { AlertCircle, X, Trash2 } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

const DeleteServiceModal = ({ isOpen, onClose, onConfirm, serviceName, hasOtherServices }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    setError('');
    
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      setError(err.message || 'שגיאה במחיקת השירות');
    } finally {
      setLoading(false);
    }
  };

  const getServiceDisplayName = (service) => {
    const names = {
      babysitting: 'שמרטפות',
      cleaning: 'ניקיון',
      gardening: 'גינון',
      petcare: 'טיפול בחיות',
      tutoring: 'שיעורים פרטיים',
      eldercare: 'סיעוד',
      electrician: 'חשמלאי',
      plumbing: 'אינסטלציה',
      air_conditioning: 'מיזוג אוויר',
      gas_technician: 'טכנאי גז',
      drywall: 'גבס',
      carpentry: 'נגרות',
      home_organization: 'סידור בית',
      event_entertainment: 'הפעלות לאירועים',
      private_chef: 'שף פרטי',
      painting: 'עבודות צבע',
      waterproofing: 'איטום',
      contractor: 'קבלן',
      aluminum: 'אלומיניום',
      glass_works: 'עבודות זכוכית',
      locksmith: 'מסגרות',
      property_management: 'ניהול נכסים',
      laundry: 'כביסה וגיהוץ'
    };
    return names[service] || service;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content delete-service-modal" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <div className="modal-icon warning">
            <AlertCircle size={32} />
          </div>
          <h2>מחיקת שירות {getServiceDisplayName(serviceName)}</h2>
          <button 
            className="modal-close" 
            onClick={onClose}
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="warning-box">
            <AlertCircle size={20} />
            <div>
              <h3>האם אתה בטוח?</h3>
              <p>
                פעולה זו תמחק את שירות <strong>{getServiceDisplayName(serviceName)}</strong> מהחשבון שלך.
              </p>
              {hasOtherServices ? (
                <ul className="warning-list">
                  <li>השירותים האחרים שלך יישארו פעילים</li>
                  <li>הפרופיל שלך ימשיך להיות גלוי בשירותים האחרים</li>
                  <li>כל המידע הספציפי לשירות זה יימחק לצמיתות</li>
                  <li>הביקורות של שירות זה יימחקו</li>
                </ul>
              ) : (
                <ul className="warning-list" style={{ color: '#dc2626' }}>
                  <li><strong>זה השירות האחרון שלך!</strong></li>
                  <li>מחיקת שירות זה תמחק את כל החשבון שלך</li>
                  <li>כל המידע שלך יימחק לצמיתות</li>
                  <li>לא תוכל להתחבר שוב</li>
                </ul>
              )}
            </div>
          </div>

          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button 
            onClick={handleConfirm}
            className="btn btn-danger"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoadingSpinner size="small" />
                מוחק...
              </>
            ) : (
              <>
                <Trash2 size={18} />
                {hasOtherServices ? 'מחק שירות זה בלבד' : 'מחק חשבון לצמיתות'}
              </>
            )}
          </button>
          
          <button 
            onClick={onClose}
            className="btn btn-secondary"
            disabled={loading}
          >
            ביטול
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteServiceModal;