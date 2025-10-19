import React, { useState } from 'react';
import './DigitalPlatform.css';
import MerchantRegistrationpic from "../../../assets/register/5354443_2760424 1 (1).png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Base_url } from '../../../constants/constant';

const Illustration = () => (
  <div className="illustration-wrapper">
    <img
      src={MerchantRegistrationpic}
      alt="Merchant Registration Illustration"
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  </div>
);

const DigitalPlatform = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    // email: '',
    socialMedia: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Basic validation
  const validate = () => {
    let tempErrors = {};

    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.mobileNumber) tempErrors.mobileNumber = "Mobile number is required.";
    else if (!/^\d{10}$/.test(formData.mobileNumber)) tempErrors.mobileNumber = "Mobile number must be 10 digits.";
    // if (!formData.email) tempErrors.email = "Email is required.";
    // else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Invalid email format.";
    if (!formData.socialMedia) tempErrors.socialMedia = "Please select a social media platform.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        mobileNumber: formData.mobileNumber,
        // email: formData.email, // optional if not needed
        socialMedia: formData.socialMedia,
      };

      console.log("📤 Sending data:", payload);

      const response = await axios.post(`${Base_url}/digital-marketing`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Registration successful:", response.data);

      alert("Registration successful!");
      navigate("/merchantRegistration2"); // Redirect on success
    } catch (error) {
      console.error("❌ Error submitting registration:", error);

      if (error.response) {
        // Server responded with an error status code
        alert(`Error ${error.response.status}: ${error.response.data?.message || "Something went wrong"}`);
      } else if (error.request) {
        // No response received
        alert("No response from server. Please check your network or backend server.");
      } else {
        // Other errors
        alert(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };


  // Handle cancel
  const handleCancel = () => {
    setFormData({
      name: '',
      mobileNumber: '',
      //   email: '',
      socialMedia: '',
    });
  };

  return (
    <div className="merchantparentcont">
      <div className="register-registration-container">
        <div className="register-header">
          <h1 className="register-title">Digital Platform</h1>
        </div>
        <div className="register-card-container">
          <div className="register-illustration-section">
            <Illustration />
          </div>
          <div className="divider"></div>
          <div className="register-form-section">
            <h2 className="register-form-title">Registration</h2>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="register-form-group">
                <label htmlFor="name">Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <p className="register-error-text">{errors.name}</p>}
              </div>

              {/* Mobile */}
              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number*</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  className={errors.mobileNumber ? 'input-error' : ''}
                />
                {errors.mobileNumber && <p className="register-error-text">{errors.mobileNumber}</p>}
              </div>

              {/* Email */}
              {/* <div className="register-form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <p className="register-error-text">{errors.email}</p>}
              </div> */}

              {/* Social Media */}
              <div className="form-group">
                <label htmlFor="socialMedia">Social Media Platform*</label>
                <select
                  id="socialMedia"
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleChange}
                  className={errors.socialMedia ? 'input-error' : ''}
                >
                  <option value="">Select a platform</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Twitter">Twitter</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="YouTube">YouTube</option>
                </select>
                {errors.socialMedia && <p className="register-error-text">{errors.socialMedia}</p>}
              </div>

              {/* Buttons */}
              <div className="register-button-group">
                <button type="button" className="register-cancel-button" onClick={handleCancel} disabled={loading}>
                  Cancel
                </button>
                <button type="submit" className="register-register-button" disabled={loading}>
                  {loading ? 'Submitting...' : 'Continue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalPlatform;
