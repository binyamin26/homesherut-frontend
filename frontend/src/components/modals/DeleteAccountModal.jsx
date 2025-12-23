import React, { useState } from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

const DeleteAccountModal = ({ isOpen, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    setError('');
    setLoading(true);
    
    try {
      await onConfirm();
      // onConfirm gère déjà la redirection, donc pas besoin de faire quoi que ce soit ici
    } catch (err) {
      setError(err.message || 'שגיאה במחיקת החשבון');
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
            <AlertTriangle size={24} className="warning-icon" />
            <h2>מחיקת חשבון</h2>
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
          <div className="warning-box">
            <AlertTriangle size={20} />
            <div>
              <h3>אזהרה! פעולה זו בלתי הפיכה</h3>
              <p>מחיקת החשבון תגרום ל:</p>
              <ul>
                <li>מחיקה מוחלטת של הפרופיל שלך</li>
                <li>הסרה מכל תוצאות החיפוש</li>
                <li>מחיקת כל הנתונים האישיים</li>
                <li>ביטול מנוי (אם קיים)</li>
              </ul>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <AlertTriangle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="small" />
                  מוחק חשבון...
                </>
              ) : (
                <>
                  <Trash2 size={18} />
                  מחק חשבון לצמיתות
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

export default DeleteAccountModal;