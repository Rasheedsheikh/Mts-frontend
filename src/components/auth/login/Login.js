import React, { useState } from 'react';
import './Login.css';
import login from "../../../assets/auth/Frame (13).png";
import { useNavigate } from 'react-router-dom';
import { Base_url } from '../../../constants/constant';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    userName: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const response = await fetch(`${Base_url}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginData.userName, // backend expects 'email' or adjust if it's 'userName'
          password: loginData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("userId", data.user.id);

      alert("Login Successful!");

      // ✅ Redirect based on role
      const userRole = data.user.role?.toLowerCase();
      if (userRole === "admin") navigate("/");
      else if (userRole === "/") navigate("/");
      else navigate("/");

    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate('/forgotPassword');
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
                <button type="submit" className="login-button" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
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
