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
  // State to hold form data
  const [formData, setFormData] = useState({
    ownerName: '',
    shopName: '',
    mobile: '',
    email: '',
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
    if (!formData.ownerName) tempErrors.ownerName = "Owner Name is required.";
    if (!formData.shopName) tempErrors.shopName = "Shop Name is required.";
    if (!formData.mobile) tempErrors.mobile = "Mobile number is required.";
    else if (!/^\d{10}$/.test(formData.mobile)) tempErrors.mobile = "Mobile number must be 10 digits.";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email address is invalid.";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Logic to submit data to the backend
      console.log('Form data submitted:', formData);
       Navigate('/merchantRegistration2')
      // alert('Regi Successful!');
      // Reset form after successful submission
      setFormData({
        ownerName: '',
        shopName: '',
        mobile: '',
        email: '',
      });
    } else {
      console.log('Form has validation errors.');
    }
  };

  // Handle Cancel button click
  const handleCancel = () => {
    // You could add navigation logic here, e.g., navigate to the home page
    console.log('Registration cancelled.');
    setFormData({
      ownerName: '',
      shopName: '',
      mobile: '',
      email: '',
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
              <label htmlFor="ownerName">Owner Name*</label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Enter owner name"
                className={errors.ownerName ? 'input-error' : ''}
              />
              {errors.ownerName && <p className="register-error-text">{errors.ownerName}</p>}
            </div>
            <div className="register-form-group">
              <label htmlFor="shopName">Shop Name*</label>
              <input
                type="text"
                id="shopName"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                placeholder="Enter shop name"
                className={errors.shopName ? 'input-error' : ''}
              />
              {errors.shopName && <p className="register-error-text">{errors.shopName}</p>}
            </div>
            <div className="register-form-group">
              <label htmlFor="mobile">Mobile*</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className={errors.mobile ? 'input-error' : ''}
              />
              {errors.mobile && <p className="register-error-text">{errors.mobile}</p>}
            </div>
            <div className="register-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <p className="register-error-text">{errors.email}</p>}
            </div>
            <div className="register-button-group">
              <button type="button" className="register-cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="register-register-button">
                Register
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