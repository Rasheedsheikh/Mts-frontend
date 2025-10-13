import React, { useState } from 'react';
import './MerchantRegistration.css';
import MerchantRegistrationpic from "../../assets/register/5354443_2760424 1 (1).png"  // Assuming you have a CSS file for styling
import { useNavigate } from 'react-router-dom';

// SVG for the illustration (or you can use an image file)
const Illustration = () => (
 <div className="illustration-wrapper">
 <img src={MerchantRegistrationpic} alt="Verify Your Email Illustration" style={{ maxWidth: '100%', height: 'auto' }} />
 </div>
);

const MerchantRegistration = () => {
  // State to hold form data for CreateMerchantDetailDto
  const [formData, setFormData] = useState({
    businessName: '',
    businessOwnerName: '',
    mobileNumber: '',
    whatsappNumber: '',
    category: '',
    subcategory: '',
    address: '',
    partnerCode: '',
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});
 const Navigate = useNavigate();
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Basic form validation
  const validate = () => {
    let tempErrors = {};
    if (!formData.businessOwnerName) tempErrors.businessOwnerName = "Owner Name is required.";
    if (!formData.businessName) tempErrors.businessName = "Business Name is required.";
    if (!formData.mobileNumber) tempErrors.mobileNumber = "Mobile number is required.";
    else if (!/^\d{10}$/.test(formData.mobileNumber)) tempErrors.mobileNumber = "Mobile number must be 10 digits.";
    if (formData.whatsappNumber && !/^\d{10}$/.test(formData.whatsappNumber)) tempErrors.whatsappNumber = "WhatsApp number must be 10 digits.";
    if (!formData.category) tempErrors.category = "Category is required.";
    if (!formData.subcategory) tempErrors.subcategory = "Subcategory is required.";
    if (!formData.address) tempErrors.address = "Address is required.";
    // partnerCode optional
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission to POST /merchant-details
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      // Prefer relative during dev (uses package.json proxy), override via env in prod
      const API_BASE = process.env.REACT_APP_API_BASE_URL || '';
      const MERCHANT_DETAILS_PATH = process.env.REACT_APP_MERCHANT_DETAILS_PATH || '/merchant-details';
      
      const url = `${API_BASE}${MERCHANT_DETAILS_PATH}`;
      console.log('Submitting merchant details to:', url, formData);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
        cache: 'no-store',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Merchant create failed:', response.status, errorText, 'URL:', url);
        throw new Error(errorText || 'Failed to create merchant');
      }

      const created = await response.json();
      const merchantId = created?.id || created?.merchantId || created?._id;
      if (merchantId) {
        localStorage.setItem('merchantId', String(merchantId));
      }
      Navigate('/merchantRegistration2');
    } catch (err) {
      console.error('Network or parsing error during merchant create:', err);
      alert(`Error: ${err.message}`);
    }
  };

  // Handle Cancel button click
  const handleCancel = () => {
    // You could add navigation logic here, e.g., navigate to the home page
    console.log('Registration cancelled.');
    setFormData({
      businessName: '',
      businessOwnerName: '',
      mobileNumber: '',
      whatsappNumber: '',
      category: '',
      subcategory: '',
      address: '',
      partnerCode: '',
    });
  };

  return (
    <div className='merchantparentcont'>
    <div className="register-registration-container">
      <div className="register-header">
        <h1 className="register-title">Merchant Registration</h1>
      </div>
      <div className="register-card-container">
        <div className="register-illustration-section">
          <Illustration />
        </div>
        <div className='divider'></div>
        <div className="register-form-section">
          <h2 className="register-form-title">Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="register-form-group">
              <label htmlFor="businessOwnerName">Owner Name*</label>
              <input
                type="text"
                id="businessOwnerName"
                name="businessOwnerName"
                value={formData.businessOwnerName}
                onChange={handleChange}
                placeholder="Enter owner name"
                className={errors.businessOwnerName ? 'input-error' : ''}
              />
              {errors.businessOwnerName && <p className="register-error-text">{errors.businessOwnerName}</p>}
            </div>
            <div className="register-form-group">
              <label htmlFor="businessName">Business/Shop Name*</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Enter business name"
                className={errors.businessName ? 'input-error' : ''}
              />
              {errors.businessName && <p className="register-error-text">{errors.businessName}</p>}
            </div>
            <div className="register-form-group">
              <label htmlFor="mobileNumber">Mobile*</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className={errors.mobileNumber ? 'input-error' : ''}
              />
              {errors.mobileNumber && <p className="register-error-text">{errors.mobileNumber}</p>}
            </div>
            <div className="register-form-group">
              <label htmlFor="whatsappNumber">WhatsApp Number</label>
              <input
                type="tel"
                id="whatsappNumber"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="Enter WhatsApp number"
                className={errors.whatsappNumber ? 'input-error' : ''}
              />
              {errors.whatsappNumber && <p className="register-error-text">{errors.whatsappNumber}</p>}
            </div>
            <div className="register-form-group">
              <label htmlFor="category">Category*</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category"
                className={errors.category ? 'input-error' : ''}
              />
              {errors.category && <p className="register-error-text">{errors.category}</p>}
            </div>
            <div className="register-form-group">
              <label htmlFor="subcategory">Subcategory*</label>
              <input
                type="text"
                id="subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                placeholder="Enter subcategory"
                className={errors.subcategory ? 'input-error' : ''}
              />
              {errors.subcategory && <p className="register-error-text">{errors.subcategory}</p>}
            </div>
            <div className="register-form-group">
              <label htmlFor="address">Address*</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter full address"
                className={errors.address ? 'input-error' : ''}
              />
              {errors.address && <p className="register-error-text">{errors.address}</p>}
            </div>
            <div className="register-form-group">
              <label htmlFor="partnerCode">Partner Code</label>
              <input
                type="text"
                id="partnerCode"
                name="partnerCode"
                value={formData.partnerCode}
                onChange={handleChange}
                placeholder="Enter partner code (optional)"
              />
            </div>
            <div className="register-button-group">
              <button type="button" className="register-cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="register-register-button">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MerchantRegistration;