import React, { useState } from 'react';
import './Login.css';
import login from "../../../assets/auth/Frame (13).png";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate= useNavigate()
  const [loginData, setLoginData] = useState({
    userName: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!loginData.userName) tempErrors.userName = "User Name is required.";
    if (!loginData.password) tempErrors.password = "Password is required.";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Login data submitted:', loginData);
      alert('Login Successful!');
    } else {
      console.log('Validation failed.');
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log('Forgot Password clicked.');
    alert('Navigating to Forgot Password page...');
    navigate('/forgotPassword')
  };

  return (
    <div className="login-full-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-main-title">Login</h1>
        </div>
        <div className="login-card-container">
          <div className="login-illustration-section">
            <img src={login} alt="Login Illustration" />
          </div>
          <div className="divider"></div>
          <div className="login-form-section">
            <h2 className="login-form-title">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="login-form-group">
                <label htmlFor="userName">User Name*</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={loginData.userName}
                  onChange={handleChange}
                  placeholder="name@example"
                  className={errors.userName ? 'input-error' : ''}
                />
                {errors.userName && <p className="error-text">{errors.userName}</p>}
              </div>
              <div className="login-form-group">
                <label htmlFor="password">Password*</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder="********"
                  className={errors.password ? 'input-error' : ''}
                />
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>
              <a href="#" className="forgot-password" onClick={handleForgotPassword}>
                Forgot Password?
              </a>
              <div className="login-button-group">
                <button type="submit" className="login-button">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;