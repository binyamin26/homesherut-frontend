import React, { useState } from 'react';
import { AlertCircle, X, Clock } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

const CancelSubscriptionModal = ({ isOpen, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    setError('');
    setLoading(true);
    
    try {
      await onConfirm();
      // onConfirm gère la redirection/message, donc pas besoin de faire plus ici
    } catch (err) {
      setError(err.message || 'שגיאה בביטול המנוי');
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content delete-account-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-content">
            <AlertCircle size={24} className="warning-icon" style={{ color: '#f59e0b' }} />
            <h2>ביטול מנוי ומחיקת חשבון</h2>
          </div>
          <button 
            className="modal-close" 
            onClick={handleClose}
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="warning-box" style={{ 
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderColor: '#f59e0b'
          }}>
            <Clock size={20} style={{ color: '#d97706' }} />
            <div>
              <h3 style={{ color: '#92400e' }}>המנוי יבוטל בסוף התקופה</h3>
              <p style={{ color: '#78350f' }}>
                החשבון שלך ימשיך לפעול באופן רגיל עד סוף החודש ששילמת. 
                בסוף התקופה, החשבון יימחק לצמיתות.
              </p>
              <ul>
                <li>הפרופיל יישאר גלוי ופעיל עד סוף התקופה</li>
                <li>תמשיך לקבל פניות מלקוחות עד סוף החודש</li>
                <li><strong>בסוף התקופה: כל המידע יימחק לצמיתות</strong></li>
                <li>תוכל לבטל בקשה זו ולהמשיך את המנוי לפני סוף התקופה</li>
              </ul>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="small" />
                  מבטל מנוי...
                </>
              ) : (
                <>
                  <Clock size={18} />
                  אישור ביטול מנוי
                </>
              )}
            </button>
            
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={loading}
            >
              ביטול
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelSubscriptionModal;