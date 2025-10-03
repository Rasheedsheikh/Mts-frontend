import React, { useState } from 'react';
import './UpdatePassword.css'; 
import updatePasswords from "../../../assets/auth/Group 3.png"
// New CSS file for this component

// Illustration component
const Illustration = () => (
 <div className="illustration-wrapper">
 <img src={updatePasswords} alt="Verify Your Email Illustration" style={{ maxWidth: '100%', height: 'auto' }} />
 </div>
);

const UpdatePassword = () => {
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Check if passwords match in real-time
    if (name === 'confirmNewPassword' || name === 'newPassword') {
      setPasswordMatch(value === passwordData.newPassword || name === 'newPassword');
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!passwordData.newPassword) tempErrors.newPassword = "New Password is required.";
    else if (passwordData.newPassword.length < 8) tempErrors.newPassword = "Password must be at least 8 characters.";
    
    if (!passwordData.confirmNewPassword) tempErrors.confirmNewPassword = "Please confirm your new password.";
    
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      tempErrors.confirmNewPassword = "Passwords do not match.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (validate()) {
      // Logic to save the new password, e.g., send data to an API
      console.log('New password saved:', passwordData.newPassword);
      alert('Password updated successfully!');
      // You would likely redirect the user to the login page
    } else {
      console.log('Validation failed.');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log('Change Password clicked.');
    // This could trigger navigation to a different flow or a modal
  };

  return (

       <div className="updatePassword-full-page">
    <div className="new-password-container">
      <div className="new-password-header">
        <h1 className="new-password-title">Create New Password</h1>
      </div>
      <div className="new-password-card-container">
        <div className="new-password-illustration-section">
           <Illustration/>
        </div>
        <div className='divider'></div>
        <div className="new-password-form-section">
          <h2 className="new-password-form-title">Create New Password</h2>
          <p className="new-password-subtitle">Your new password must be different from previously used password</p>
          <form onSubmit={handleSave}>
            <div className="new-password-form-group">
              <label htmlFor="newPassword">New Password*</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleChange}
                placeholder="********"
                className={errors.newPassword ? 'input-error' : ''}
              />
              {errors.newPassword && <p className="error-text">{errors.newPassword}</p>}
            </div>

            <div className="new-password-form-group">
              <label htmlFor="confirmNewPassword">Confirm New Password*</label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handleChange}
                placeholder="********"
                className={errors.confirmNewPassword || !passwordMatch ? 'input-error' : ''}
              />
              {errors.confirmNewPassword && <p className="error-text">{errors.confirmNewPassword}</p>}
              {!errors.confirmNewPassword && !passwordMatch && passwordData.confirmNewPassword.length > 0 && (
                <p className="error-text">Passwords do not match.</p>
              )}
            </div>
            
            <div className="new-password-button-group">
              <button type="submit" className="save-button">
                Save
              </button>
            </div>
            <a href="#" className="change-password" onClick={handleChangePassword}>
              Change Password
            </a>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UpdatePassword;