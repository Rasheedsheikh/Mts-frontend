import React, { useState } from 'react';
import './VendorStep1.css';
import { Eye, EyeOff } from 'lucide-react'; // Eye icons
import vendorpic from "../../../../assets/register/Illustration (1).png";
import { Base_url } from '../../../../constants/constant';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${Base_url}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("User registered successfully!");
        setFormData({
          username: '',
          role: '',
          email: '',
          password: '',
        });
      } else {
        const err = await response.json();
        alert(`Registration failed: ${err.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error while submitting the form.");
    }
  };

  // Handle form cancel
  const handleCancel = () => {
    setFormData({
      name: '',
      role: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="vendor-registration-container">
      <div className="vendor-registration-card">
        <h1 className="main-title">User Registration</h1>
        <div className="content-wrapper">
          <div className="left-panel">
            <div className="illustration-placeholder">
              <img style={{ maxWidth: '100%', height: 'auto' }} src={vendorpic} alt="Register" />
            </div>
          </div>

          <div className="divider"></div>

          <div className="right-panel">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="form-group">
                <label htmlFor="username">name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter name"
                />
              </div>

              {/* Role dropdown */}
              <div className="form-group">
                <label htmlFor="role">Role*</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="partner">Partner</option>
                  <option value="merchant">Merchant</option>
                </select>
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter email"
                />
              </div>

              {/* Password with eye icon */}
              <div className="form-group">
                <label htmlFor="password">Password*</label>
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter password"
                  />
                  <span className="eye-icon" onClick={togglePasswordVisibility}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="button-group">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
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

export default SignUp;
