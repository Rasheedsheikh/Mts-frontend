import React, { useState } from 'react';
import './PaymentGateway.css'; // New CSS file for this component

import MerchantRegistrationpic from "../../../assets/register/Frame (15).png"  // Assuming you have a CSS file for styling

// SVG for the illustration (or you can use an image file)
const Illustration = () => (
 <div className="illustration-wrapper">
 <img src={MerchantRegistrationpic} alt="Verify Your Email Illustration" style={{ maxWidth: '100%', height: 'auto' }} />
 </div>
);

const PaymentGateway = () => {
  const [paymentData, setPaymentData] = useState({
    cardType: 'Credit', // Default to Credit
    nameOnCard: '',
    cardNumber: '',
    expiryDate: '',
    cvvCode: '',
    saveCard: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCardTypeChange = (type) => {
    setPaymentData((prevData) => ({
      ...prevData,
      cardType: type,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!paymentData.nameOnCard) tempErrors.nameOnCard = "Name on Card is required.";
    if (!paymentData.cardNumber || !/^\d{16}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) {
      tempErrors.cardNumber = "Card Number must be 16 digits.";
    }
    if (!paymentData.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expiryDate)) {
      tempErrors.expiryDate = "Invalid Expiry Date (MM/YY).";
    }
    if (!paymentData.cvvCode || !/^\d{3,4}$/.test(paymentData.cvvCode)) {
      tempErrors.cvvCode = "Invalid CVV.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleClear = () => {
    setPaymentData({
      cardType: 'Credit',
      nameOnCard: '',
      cardNumber: '',
      expiryDate: '',
      cvvCode: '',
      saveCard: false,
    });
    setErrors({});
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Payment data submitted:', paymentData);
      alert('Payment successful!');
      // You would send data to a payment processing API here
    } else {
      console.log('Validation failed.');
    }
  };

  return (
    <div className="payment-gateway-container">
      <div className="payment-header">
        <h1 className="payment-title">Payment Gateway</h1>
      </div>
      <div className="payment-card-container">
        <div className="payment-illustration-section">
          <Illustration />
        </div>
        <div className='divider'></div>
        <div className="payment-form-section">
          <h2 className="payment-form-title">Choose a payment method</h2>
          <p className="payment-form-subtitle">Please select a payment method most convenient to you.</p>
          <form onSubmit={handleContinue}>
            <div className="payment-form-group">
              <label>Card Type*</label>
              <div className="card-type-options">
                <button
                  type="button"
                  className={`card-type-button ${paymentData.cardType === 'Credit' ? 'selected' : ''}`}
                  onClick={() => handleCardTypeChange('Credit')}
                >
                  Credit
                </button>
                <button
                  type="button"
                  className={`card-type-button ${paymentData.cardType === 'Debit' ? 'selected' : ''}`}
                  onClick={() => handleCardTypeChange('Debit')}
                >
                  Debit
                </button>
              </div>
            </div>

            <div className="payment-form-group">
              <label htmlFor="nameOnCard">Name On Card*</label>
              <input
                type="text"
                id="nameOnCard"
                name="nameOnCard"
                value={paymentData.nameOnCard}
                onChange={handleChange}
                placeholder="name@example"
                className={errors.nameOnCard ? 'input-error' : ''}
              />
              {errors.nameOnCard && <p className="error-text">{errors.nameOnCard}</p>}
            </div>

            <div className="payment-form-group">
              <label htmlFor="cardNumber">Card Number*</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleChange}
                placeholder="name@example"
                maxLength="19" // 16 digits + 3 spaces
                className={errors.cardNumber ? 'input-error' : ''}
              />
              {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}
            </div>

            <div className="payment-form-group split-fields">
              <div className="expiry-date-group">
                <label htmlFor="expiryDate">Expiry Date*</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className={errors.expiryDate ? 'input-error' : ''}
                />
                {errors.expiryDate && <p className="error-text">{errors.expiryDate}</p>}
              </div>
              <div className="cvv-code-group">
                <label htmlFor="cvvCode">CVV Code*</label>
                <input
                  type="password"
                  id="cvvCode"
                  name="cvvCode"
                  value={paymentData.cvvCode}
                  onChange={handleChange}
                  placeholder="name@example"
                  maxLength="4"
                  className={errors.cvvCode ? 'input-error' : ''}
                />
                {errors.cvvCode && <p className="error-text">{errors.cvvCode}</p>}
              </div>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="saveCard"
                name="saveCard"
                checked={paymentData.saveCard}
                onChange={handleChange}
              />
              <label htmlFor="saveCard">Save my card for future</label>
            </div>

            <div className="payment-button-group">
              <button type="button" className="payment-clear-button" onClick={handleClear}>
                Clear
              </button>
              <button type="submit" className="payment-continue-button">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;