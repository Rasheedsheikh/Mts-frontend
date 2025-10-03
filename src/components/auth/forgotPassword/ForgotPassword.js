import React, { useState } from 'react';
import './Forgotpassword.css';
import forgotpassword from "../../../assets/auth/Frame (13).png"
import { useNavigate } from 'react-router-dom';

const Illustration = () => (
 <div className="illustration-wrapper">
 <img src={forgotpassword} alt="Verify Your Email Illustration" style={{ maxWidth: '100%', height: 'auto' }} />
 </div>
);

const ForgotPassword = () => {
 const [email, setEmail] = useState('');
 const [error, setError] = useState('');

 const navigate= useNavigate()

 const handleChange = (e) => {
 setEmail(e.target.value);
 setError('');
 };

 const handleSend=()=>{
    navigate('/verifyEmail')
 }

 const handleSubmit = (e) => {
 e.preventDefault();
 if (!email) {
 setError('Email is required.');
 return;
 } else if (!/\S+@\S+\.\S+/.test(email)) {
 setError('Invalid email format.');
 return;
 }
 // In a real application, you would send the email to the backend for processing
 console.log('Email submitted for password reset:', email);
 alert('Verification code sent to your email address.');
 // You would typically navigate to the "Verify Your Email" page
 };

 return (
       <div className="forgotPassword-full-page">
 <div className="forgot-password-container">
 <div className="forgot-password-header">
 <h1 className="forgot-password-title">Forgot Password</h1>
 </div>
 <div className="forgot-password-card-container">
 <div className="forgot-password-illustration-section">
<Illustration/>
 </div>
  <div className="divider"></div>
 <div className="forgot-password-form-section">
 <h2 className="forgot-password-form-title">Forgot Password</h2>
 <p className="forgot-password-subtitle">Please enter your email address to receive a verification code</p>
 <form onSubmit={handleSubmit}>
 <div className="forgot-password-form-group">
 <label htmlFor="email">Email</label>
 <input
 type="email"
 id="email"
 name="email"
 value={email}
 onChange={handleChange}
 placeholder="name@example"
 className={error ? 'input-error' : ''}
 />
 {error && <p className="error-text">{error}</p>}
 </div>
 <div className="forgot-password-button-group">
 <button type="submit" className="send-button" onClick={handleSend}>
 Send
 </button>
 </div>
 </form>
 </div>
 </div>
 </div>
 </div>
 );
};

export default ForgotPassword;