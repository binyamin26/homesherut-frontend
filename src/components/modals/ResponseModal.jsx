import React, { useState } from 'react';
import { X, Star, User, MessageCircle, Send, AlertCircle, Lightbulb } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ResponseModal = ({ isOpen, onClose, reviewData }) => {
  const { createProviderResponse } = useAuth();
  
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setResponseText('');
    setError('');
    onClose();
  };

  const handleResponseChange = (value) => {
    setResponseText(value);
    if (error) setError('');
  };

  const validateResponse = () => {
    const trimmedText = responseText.trim();
    
    if (!trimmedText) {
      setError('נדרש להזין תגובה');
      return false;
    }
    
    if (trimmedText.length < 10) {
      setError('התגובה צריכה להכיל לפחות 10 תווים');
      return false;
    }
    
    if (trimmedText.length > 1000) {
      setError('התגובה לא יכולה לחרוג מ-1000 תווים');
      return false;
    }
    
    return true;
  };

  const handleSubmitResponse = async () => {
    if (!validateResponse()) return;

    setLoading(true);
    setError('');

    try {
      const result = await createProviderResponse(reviewData.id, responseText.trim());

      if (result.success) {
        // קריאה לפונקציית callback של הצלחה
        if (reviewData.onResponseSuccess) {
          reviewData.onResponseSuccess();
        }
        handleClose();
      } else {
        setError(result.message || 'שגיאה ביצירת התגובה');
      }
    } catch (error) {
      setError('שגיאה בחיבור לשרת');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map(star => (
      <Star
        key={star}
        size={16}
        fill={star <= rating ? '#fbbf24' : 'none'}
        color={star <= rating ? '#fbbf24' : '#d1d5db'}
      />
    ));
  };

  if (!isOpen || !reviewData) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container review-modal">
        <div className="modal-header">
          <h2 className="modal-title">
            מענה לביקורת
          </h2>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          {/* הצגת הביקורת המקורית */}
          <div className="original-review-section">
            <div className="info-box">
              <MessageCircle size={20} />
              <div>
                <p><strong>הביקורת שקיבלת:</strong></p>
              </div>
            </div>

            <div className="review-display">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    <User size={18} />
                  </div>
                  <div className="reviewer-details">
                    <h4>{reviewData.reviewerName || 'לקוח'}</h4>
                    <div className="review-rating">
                      {renderStars(reviewData.rating)}
                      <span className="rating-text">({reviewData.rating}/5)</span>
                    </div>
                  </div>
                </div>
                <div className="review-date">
                  {new Date(reviewData.createdAt).toLocaleDateString('he-IL')}
                </div>
              </div>

              {reviewData.title && (
                <div className="review-title">
                  <h5>{reviewData.title}</h5>
                </div>
              )}

              <div className="review-comment">
                <p>{reviewData.comment}</p>
              </div>
            </div>
          </div>

          {/* הנחיות למענה מקצועי */}
          <div className="response-guidelines">
            <div className="info-box">
              <Lightbulb size={20} />
              <div>
                <p><strong>טיפים למענה מקצועי:</strong></p>
                <ul style={{ margin: '8px 0 0 0', paddingRight: '20px' }}>
                  <li>תודה ללקוח על הזמן שהשקיע בכתיבת הביקורת</li>
                  <li>התייחס לנקודות הספציפיות שהוזכרו</li>
                  <li>במידת הצורך, הסבר או הבהר נושאים</li>
                  <li>שמור על טון מקצועי וחיובי</li>
                  <li>הזמן לקוחות עתידיים לפנות אליך</li>
                </ul>
              </div>
            </div>
          </div>

          {/* טופס המענה */}
          <div className="response-form">
            <div className="input-group">
              <label className="form-label">המענה שלך</label>
              <textarea
                value={responseText}
                onChange={(e) => handleResponseChange(e.target.value)}
                placeholder="כתוב כאן את המענה שלך לביקורת... התייחס לנקודות שהלקוח העלה והודה לו על המשוב"
                className="review-textarea"
                rows={6}
                disabled={loading}
              />
              <div className="character-count">
                <span className={responseText.length > 1000 ? 'text-danger' : 'text-muted'}>
                  {responseText.length}/1000 תווים
                </span>
                {responseText.trim().length > 0 && responseText.trim().length < 10 && (
                  <span className="text-warning"> • נדרשים לפחות 10 תווים</span>
                )}
              </div>
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="response-actions">
              <button
                className="btn btn-secondary"
                onClick={handleClose}
                disabled={loading}
              >
                בטל
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmitResponse}
                disabled={loading || !responseText.trim() || responseText.trim().length < 10}
              >
                {loading ? 'שולח...' : 'פרסם מענה'}
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseModal;