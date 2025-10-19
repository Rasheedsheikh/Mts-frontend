import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PartnerRegistration.css';
import PartnerRegistrationpic from "../../../assets/register/5354443_2760424 1 (1).png"
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Base_url } from "../../../constants/constant";


// SVG for the illustration (or you can use an image file)
const Illustration = () => (
  <div className="illustration-wrapper">
    <img src={PartnerRegistrationpic} alt="Verify Your Email Illustration" style={{ maxWidth: '100%', height: 'auto' }} />
  </div>
);

const PartnerRegistration2 = ({ s3Service }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const step1Data = location.state?.formData || null;

  // ✅ Hooks always at top
  const [formData, setFormData] = useState({
    ...step1Data,
    fullNameAsPerBank: '',
    companyNameOrDob: '',
    bankAccountNumber: '',
    ifscOrSwift: '',
    bankNameAndBranch: '',
    upiId: '',
    location: '',
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!step1Data) {
      navigate('/partner-registration-step1');
    }
  }, [step1Data, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };
  const validateStep2 = (data) => {
    const errors = {};

    // Full Name as per Bank
    if (!data.fullNameAsPerBank) errors.fullNameAsPerBank = "Full name as per bank is required";

    // DOB validation
    if (!data.companyNameOrDob) errors.companyNameOrDob = "Date of birth is required";
    else {
      const selectedDate = new Date(data.companyNameOrDob);
      const today = new Date();
      const minAge = new Date();
      minAge.setFullYear(today.getFullYear() - 18); // Must be at least 18 years old

      if (selectedDate > today) {
        errors.companyNameOrDob = "Date of birth cannot be in the future";
      } else if (selectedDate > minAge) {
        errors.companyNameOrDob = "Must be at least 18 years old";
      }
    }

    // Bank Account Number (only digits, 9-18 digits typical)
    if (!data.bankAccountNumber) errors.bankAccountNumber = "Bank account number is required";
    else if (!/^\d{9,18}$/.test(data.bankAccountNumber))
      errors.bankAccountNumber = "Bank account number must be 9-18 digits";

    // IFSC Code (4 letters + 0 + 6 digits)
    if (!data.ifscOrSwift) errors.ifscOrSwift = "IFSC is required";
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(data.ifscOrSwift.toUpperCase()))
      errors.ifscOrSwift = "Invalid IFSC format (e.g., HDFC0001234)";

    // Bank Name & Branch
    if (!data.bankNameAndBranch) errors.bankNameAndBranch = "Bank name and branch is required";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const responseUrl = `${Base_url}/partner-details`;

      const formDataToSend = new FormData();

      // ✅ Append fields based on your DTO
      formDataToSend.append('candidateName', formData.candidateName || '');
      formDataToSend.append('gender', formData.gender || '');
      formDataToSend.append('mobile', formData.mobile || '');
      formDataToSend.append('email', formData.email || '');
      formDataToSend.append('altMobile', formData.altMobile || '');
      formDataToSend.append('location', formData.location || '');
      formDataToSend.append('address', formData.address || '');
      formDataToSend.append('fullNameAsPerBank', formData.fullNameAsPerBank || '');
      formDataToSend.append('companyNameOrDob', formData.companyNameOrDob || '');
      formDataToSend.append('panNumber', formData.panNumber || '');
      formDataToSend.append('bankAccountNumber', formData.bankAccountNumber || '');
      formDataToSend.append('ifscOrSwift', formData.ifscOrSwift || '');
      formDataToSend.append('bankNameAndBranch', formData.bankNameAndBranch || '');
      formDataToSend.append('upiId', formData.upiId || '');

      // ✅ Append image file if present
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      console.log('Submitting partner details:', Array.from(formDataToSend.entries()));

      const response = await fetch(responseUrl, {
        method: 'POST',
        body: formDataToSend, // ✅ Browser handles multipart headers
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Partner registration failed:', errorText);
        throw new Error(errorText || 'Failed to create partner');
      }


      // console.log('Partner created successfully:', result);
      const result = await response.json();
      if (result?.partnerCode) {
        navigate('/partnerSuccess', { state: { partnerCode: result.partnerCode } });
      }

      toast.success('Partner registered successfully!');
    } catch (err) {
      console.error('Error:', err);
      toast.error(`Error: ${err.message}`);
    }
  };

  if (!step1Data) return null;

  return (
    <div className='merchantparentcont'>
      <ToastContainer position="top-right" autoClose={3000} />
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
            <h2>Partner Registration - Step 2</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name ( As Per Bank)*</label>
                <input name="fullNameAsPerBank" value={formData.fullNameAsPerBank} onChange={handleChange} />
                {errors.fullNameAsPerBank && <p className="error">{errors.fullNameAsPerBank}</p>}
              </div>

              <div className="form-group">
                <label>DOB*</label>
                <input
                  type="date"
                  name="companyNameOrDob"
                  value={formData.companyNameOrDob}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                />
                {errors.companyNameOrDob && <p className="error">{errors.companyNameOrDob}</p>}
              </div>

              <div className="form-group">
                <label>Bank Account Number*</label>
                <input name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} />
                {errors.bankAccountNumber && <p className="error">{errors.bankAccountNumber}</p>}
              </div>

              <div className="form-group">
                <label>IFSC / Swift*</label>
                <input name="ifscOrSwift" value={formData.ifscOrSwift} onChange={handleChange} />
                {errors.ifscOrSwift && <p className="error">{errors.ifscOrSwift}</p>}
              </div>

              <div className="form-group">
                <label>Bank Name & Branch*</label>
                <input name="bankNameAndBranch" value={formData.bankNameAndBranch} onChange={handleChange} />
                {errors.bankNameAndBranch && <p className="error">{errors.bankNameAndBranch}</p>}
              </div>

              <div className="form-group">
                <label>UPI ID</label>
                <input name="upiId" value={formData.upiId} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Location*</label>
                <input name="location" value={formData.location} onChange={handleChange} />
                {errors.location && <p className="error">{errors.location}</p>}
              </div>

              <div className="form-group">
                <label>Upload Profile</label>
                <input type="file" onChange={handleFileChange} />
              </div>

              <div className="button-group">
                <button type="button" onClick={() => navigate(-1)}>Back</button>
                <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PartnerRegistration2;
