import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OrderSuccess.css";
import { useTranslation } from 'react-i18next';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const orderId = "GP-" + Math.floor(Math.random() * 1000000);
  const date = new Date().toLocaleString();

  return (
    <div className="success-container">
      <div className="success-card">

        <div className="success-icon">✓</div>

        <h2>{t('Payment Successful')}</h2>

        <p className="success-text">
          {t('Your payment has been processed successfully.')}
        </p>

        <div className="payment-details">
          <div className="detail">
            <span>{t('Order')} ID</span>
            <strong>{orderId}</strong>
          </div>

          <div className="detail">
            <span>{t('Date')}</span>
            <strong color="rgba(0,0,0,0.1)">
            {new Date().toLocaleDateString(t('locale'), { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</strong>
          </div>

          <div className="detail">
            <span>{t('Status')}</span>
            <strong className="paid">{t('Paid')}</strong>
          </div>
        </div>

        <button
          className="continue-btn"
          onClick={() => navigate("/")}
        >
          {t('Continue Shopping')}
        </button>

      </div>
    </div>
  );
};

export default OrderSuccess;