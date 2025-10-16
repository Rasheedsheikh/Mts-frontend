import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterLanding.css';

const Card = ({ title, description, onClick, tagText }) => {
  return (
    <div className="reg-card" onClick={onClick} role="button" tabIndex={0}>
      {tagText && (
        <div className="reg-tag-wrap" aria-label={tagText}>
          <span className="reg-tag-chain" />
          <span className="reg-tag">{tagText}</span>
        </div>
      )}
      <div className="reg-card-title">{title}</div>
      <div className="reg-card-desc">{description}</div>
    </div>
  );
};

const RegisterLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="register-landing-container">
      <h2 className="register-landing-title">Choose Registration Type</h2>
      <p className="register-landing-subtitle">Select an option to continue</p>

      <div className="register-landing-grid">
        <Card
          title="Merchant Registration"
          description="Register your business to list services and manage inquiries."
          onClick={() => navigate('/merchantRegistration')}
        />
        <Card
          title="Join Our Team"
          description="Become a Partner and start registering merchants"
          onClick={() => navigate('/partnerRegister')}
        />
        <Card
          title="User Registration"
          description="Create your account to book services quickly."
          onClick={() => navigate('/vendorStep1')}
        />
        <Card
          title="Free Booking"
          description="Skip registration and book a service instantly."
          onClick={() => navigate('/quickBooking')}
        />
        <Card
          title="Advertise With Us"
          description="Promote your business to thousands of users."
          onClick={() => navigate('/advertise')}
        />
      </div>
    </div>
  );
};

export default RegisterLanding;


