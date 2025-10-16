import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import successImage from '../../../assets/418.png';
import './PartnerSuccess.css';

const PartnerSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const partnerCode = location.state?.partnerCode;

  return (
    <div className="ps-page">
      <div className="ps-card">
        <div className="ps-confetti"></div>
        <img src={successImage} alt="Success" className="ps-hero" />
        <h1 className="ps-title">Registration Successful 🎉</h1>
        <p className="ps-subtitle">Congratulations! You have successfully registered as a Partner.</p>

        {partnerCode ? (
          <div className="ps-banner">
            <span className="ps-code-label">Your Partner Code</span>
            <div className="ps-code-value">{partnerCode}</div>
          </div>
        ) : (
          <p className="ps-subtitle" style={{ marginBottom: 20 }}>No partner code found.</p>
        )}

        <div className="ps-actions">
          <button className="ps-btn ps-btn-primary" onClick={() => navigate('/')}>Go to Home</button>
          <button className="ps-btn ps-btn-ghost" onClick={() => navigate('/partnerRegister')}>Register Another</button>
        </div>
      </div>
    </div>
  );
};

export default PartnerSuccess;
