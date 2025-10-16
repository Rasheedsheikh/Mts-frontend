import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PartnerRegistration.css';
import PartnerRegistrationpic from "../../../assets/register/5354443_2760424 1 (1).png";


// SVG for the illustration (or you can use an image file)
const Illustration = () => (
 <div className="illustration-wrapper">
 <img src={PartnerRegistrationpic} alt="Verify Your Email Illustration" style={{ maxWidth: '100%', height: 'auto' }} />
 </div>
);

const PartnerRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    candidateName: '',
    gender: '',
    mobile: '',
    altMobile: '',
    email: '',
    panNumber: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

//   const validate = () => {
//     const tempErrors = {};
//     if (!formData.candidateName) tempErrors.candidateName = 'Candidate name required';
//     if (!formData.mobile) tempErrors.mobile = 'Mobile required';
//     else if (!/^\d{10}$/.test(formData.mobile)) tempErrors.mobile = 'Mobile must be 10 digits';
//     if (formData.altMobile && !/^\d{10}$/.test(formData.altMobile)) tempErrors.altMobile = 'Alt mobile must be 10 digits';
//     if (!formData.email) tempErrors.email = 'Email required';
//     if (!formData.panNumber) tempErrors.panNumber = 'PAN required';
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

  const validateStep1 = (data) => {
  const errors = {};

  // Candidate Name
  if (!data.candidateName) errors.candidateName = "Candidate name is required";

  // Mobile Number (10 digits)
  if (!data.mobile) errors.mobile = "Mobile number is required";
  else if (!/^\d{10}$/.test(data.mobile)) errors.mobile = "Mobile number must be 10 digits";

  // Alt Mobile (optional)
  if (data.altMobile && !/^\d{10}$/.test(data.altMobile))
    errors.altMobile = "Alternate mobile must be 10 digits";

  // Email validation
  if (!data.email) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Invalid email format";

  // PAN Number validation (5 letters + 4 digits + 1 letter)
  if (!data.panNumber) errors.panNumber = "PAN is required";
  else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.panNumber.toUpperCase()))
    errors.panNumber = "Invalid PAN format (ABCDE1234F)";

  return errors;
};


const handleNext = () => {
  const validationErrors = validateStep1(formData);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    navigate('/partnerRegister2', { state: { formData } });
  }
};


  return (

       <div className='merchantparentcont'>
    <div className="register-registration-container">
      <div className="register-header">
        <h1 className="register-title">Partner Registration</h1>
      </div>
      <div className="register-card-container">
        <div className="register-illustration-section">
          <Illustration />
        </div>
        <div className='divider'></div>
    <div className="register-form-section">
      <h2>Partner Registration - Step 1</h2>
      <div className="form-group">
        <label>Candidate Name*</label>
        <input name="candidateName" value={formData.candidateName} onChange={handleChange} />
        {errors.candidateName && <p className="error">{errors.candidateName}</p>}
      </div>
      <div className="form-group">
        <label>Gender</label>
        <input name="gender" value={formData.gender} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Mobile*</label>
        <input name="mobile" value={formData.mobile} onChange={handleChange} />
        {errors.mobile && <p className="error">{errors.mobile}</p>}
      </div>
      <div className="form-group">
        <label>Alt Mobile</label>
        <input name="altMobile" value={formData.altMobile} onChange={handleChange} />
        {errors.altMobile && <p className="error">{errors.altMobile}</p>}
      </div>
      <div className="form-group">
        <label>Email*</label>
        <input name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="form-group">
        <label>PAN Number*</label>
        <input name="panNumber" value={formData.panNumber} onChange={handleChange} />
        {errors.panNumber && <p className="error">{errors.panNumber}</p>}
      </div>

      <div className="button-group">
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
     </div>
    </div>
    </div>
  );
};

export default PartnerRegistration;
