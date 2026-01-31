import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  CreditCard,
  Calendar,
  TrendingUp,
  Settings,
  Shield 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const SubscriptionStatus = ({ showDetails = true, compact = false }) => {
  const { user, apiCall } = useAuth();
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les données d'abonnement
  useEffect(() => {
    const loadSubscriptionStatus = async () => {
      if (user?.role !== 'provider') {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await apiCall('/subscriptions/status', 'GET');
        
        if (response.success) {
          setSubscriptionData(response.data);
        } else {
          // Cas où l'utilisateur n'a pas d'abonnement
          if (response.message.includes('לא נמצא מנוי') || response.code === 'NO_SUBSCRIPTION') {
            setSubscriptionData({
              hasSubscription: false,
              needsUpgrade: true
            });
          } else {
            setError(response.message);
          }
        }
      } catch (err) {
        console.error('שגיאה בטעינת מנוי:', err);
        setError('שגיאה בטעינת נתוני המנוי');
      } finally {
        setLoading(false);
      }
    };

    loadSubscriptionStatus();
  }, [user, apiCall]);

  // Ne rien afficher si pas prestataire
  if (user?.role !== 'provider') return null;

  // Loading state
  if (loading) {
    return (
      <div className={`subscription-status loading ${compact ? 'compact' : ''}`}>
        <LoadingSpinner size="small" />
        <span>טוען סטטוס מנוי...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`subscription-status error ${compact ? 'compact' : ''}`}>
        <XCircle size={20} />
        <span>{error}</span>
      </div>
    );
  }

  // Pas d'abonnement
  if (!subscriptionData?.hasSubscription) {
    return (
      <div className={`subscription-status no-subscription ${compact ? 'compact' : ''}`}>
        <div className="status-header">
          <AlertTriangle size={20} />
          <div className="status-info">
            <div className="status-title">
              <span className="plan-name">אין מנוי פעיל</span>
            </div>
            <div className="status-text">התחל מנוי כדי לקבל פניות מלקוחות</div>
          </div>
        </div>
        {!compact && (
          <div className="status-actions">
            <Link to="/billing" className="btn btn-primary">
              <Crown size={16} />
              התחל מנוי
            </Link>
          </div>
        )}
        {compact && (
          <Link to="/billing" className="upgrade-btn">
            <TrendingUp size={14} />
            התחל
          </Link>
        )}
      </div>
    );
  }

  const { subscription, isActive, daysRemaining, warnings } = subscriptionData;

  // Déterminer le style selon le statut
  const getStatusStyle = () => {
    if (!isActive) return 'expired';
    if (warnings?.expiringSoon) return 'warning';
    if (subscription.planType === 'trial') return 'trial';
    return 'active';
  };

  const getStatusIcon = () => {
    const statusStyle = getStatusStyle();
    switch (statusStyle) {
      case 'active': return <CheckCircle size={20} />;
      case 'trial': return <Clock size={20} />;
      case 'warning': return <AlertTriangle size={20} />;
      case 'expired': return <XCircle size={20} />;
      default: return <Crown size={20} />;
    }
  };

  const getStatusText = () => {
    if (!isActive) {
      return `המנוי פג לפני ${Math.abs(daysRemaining)} ימים`;
    }
    
    if (subscription.planType === 'trial') {
      return daysRemaining > 0 
        ? `ניסיון חינם - ${daysRemaining} ימים נותרו`
        : 'ניסיון חינם מסתיים היום';
    }

    if (warnings?.expiringSoon) {
      return `המנוי מסתיים בעוד ${daysRemaining} ימים`;
    }

    return subscription.planType === 'monthly' ? 'מנוי חודשי פעיל' : 'מנוי שנתי פעיל';
  };

  const getPlanDisplayName = () => {
    switch (subscription.planType) {
      case 'trial': return 'ניסיון חינם';
      case 'monthly': return 'חודשי';
      case 'yearly': return 'שנתי';
      default: return subscription.planType;
    }
  };

  const getStatusBadgeColor = () => {
    const statusStyle = getStatusStyle();
    switch (statusStyle) {
      case 'active': return 'accent';
      case 'trial': return 'primary';
      case 'warning': return 'warning';
      case 'expired': return 'danger';
      default: return 'neutral';
    }
  };

  return (
    <div className={`subscription-status ${getStatusStyle()} ${compact ? 'compact' : ''}`}>
      <div className="status-header">
        {getStatusIcon()}
        <div className="status-info">
          <div className="status-title">
            <span className="plan-name">{getPlanDisplayName()}</span>
            <span className={`status-badge ${getStatusBadgeColor()}`}>
              {subscription.status === 'active' ? 'פעיל' : subscription.status}
            </span>
          </div>
          <div className="status-text">{getStatusText()}</div>
        </div>
      </div>

      {/* Détails étendus */}
      {showDetails && !compact && (
        <div className="status-details">
          <div className="detail-grid">
            <div className="detail-item">
              <Calendar size={16} />
              <div className="detail-content">
                <label>מסתיים ב:</label>
                <span>{new Date(subscription.expiresAt).toLocaleDateString('he-IL')}</span>
              </div>
            </div>

            {subscription.amountMonthly && (
              <div className="detail-item">
                <CreditCard size={16} />
                <div className="detail-content">
                  <label>מחיר:</label>
                  <span>₪{subscription.amountMonthly}/חודש</span>
                </div>
              </div>
            )}

            {subscription.nextBillingDate && (
              <div className="detail-item">
                <TrendingUp size={16} />
                <div className="detail-content">
                  <label>חיוב הבא:</label>
                  <span>{new Date(subscription.nextBillingDate).toLocaleDateString('he-IL')}</span>
                </div>
              </div>
            )}
          </div>

          {/* Actions selon le statut */}
          <div className="status-actions">
            {!isActive && (
              <Link to="/billing" className="btn btn-primary">
                <Crown size={16} />
                חדש מנוי
              </Link>
            )}

            {isActive && subscription.planType === 'trial' && daysRemaining <= 7 && (
              <Link to="/billing" className="btn btn-primary">
                <TrendingUp size={16} />
                שדרג למנוי בתשלום
              </Link>
            )}

            {isActive && warnings?.expiringSoon && subscription.planType !== 'trial' && (
              <Link to="/billing" className="btn btn-secondary">
                <CreditCard size={16} />
                חדש מנוי
              </Link>
            )}

            <Link to="/billing" className="btn btn-outline">
              <Settings size={16} />
              נהל מנוי
            </Link>
          </div>
        </div>
      )}

      {/* Compact actions */}
      {compact && subscriptionData.needsUpgrade && (
        <Link to="/billing" className="upgrade-btn">
          <TrendingUp size={14} />
          שדרג
        </Link>
      )}
    </div>
  );
};

export default SubscriptionStatus;