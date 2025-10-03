import React, { useState } from 'react';
import './EmailConfirm.css';
import emailConfirm from "../../../assets/auth/OBJECTS (1).png"
import { useNavigate } from 'react-router-dom';

const Illustration = () => (
 <div className="illustration-wrapper">
 <img src={emailConfirm} alt="Verify Your Email Illustration" style={{ maxWidth: '100%', height: 'auto' }} />
 </div>
);

const EmailConfirm = () => {
 const [code, setCode] = useState(['', '', '', '']);
 const [error, setError] = useState('');
 const navigate= useNavigate('')

 const handleChange = (index, event) => {
 const newCode = [...code];
 newCode [index] = event.target.value;
 setCode(newCode);
 setError('');
 if (event.target.value && index < 3 && event.target.nextElementSibling) {
 event.target.nextElementSibling.focus();
 }
 };

 const handleVerify = (e) => {
 e.preventDefault();
 const verificationCode = code.join('');
 if (verificationCode.length !== 4 || !/^\d+$/.test(verificationCode)) {
 setError('Please enter the 4-digit verification code.');
 return;

 }
 // In a real application, you would send this code to the backend for verification
 console.log('Verification code submitted:', verificationCode);
 alert('Email verified successfully!');
  navigate('/updatePassword')
 // You would typically navigate to the "Create New Password" page
 };

 const handleResend = (e) => {
 e.preventDefault();
 console.log('Resend code clicked.');
 alert('Verification code resent to your email address.');
 // In a real application, you would trigger the resend email logic
 };

 return (
       <div className="emailConfirm-full-page">
 <div className="verify-email-container">
 <div className="verify-email-header">
 <h1 className="verify-email-title">Verify Your Email</h1>
 </div>
 <div className="verify-email-card-container">
 <div className="verify-email-illustration-section">
  <Illustration/>
 </div>
  <div className="divider"></div>
 <div className="verify-email-form-section">
 <h2 className="verify-email-form-title">Verify Your Email</h2>
 <p className="verify-email-subtitle">Please enter the 4 digit code sent to test1234@gmail.com</p>
 <form onSubmit={handleVerify}>
 <div className="verification-code-input-group">
 {code.map((digit, index) => (
 <input
 key={index}
 type="text"
 maxLength="1"
 value={digit}
 onChange={(event) => handleChange(index, event)}
 className={`verification-code-input ${error ? 'input-error' : ''}`}
 ref={(input) => {
 // You could use refs to manage focus if needed
 }}
 />
 ))}
 </div>
 {error && <p className="error-text">{error}</p>}
 <div className="verify-email-button-group">
 <button type="submit" className="verify-button">
 Verify
 </button>
 </div>
 <a href="#" className="resend-code" onClick={handleResend}>
 Resend Code
 </a>
 </form>
 </div>
 </div>
 </div>
 </div>
 );
};

export default EmailConfirm;