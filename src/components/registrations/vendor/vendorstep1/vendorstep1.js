import React, { useState, useRef } from 'react';
import './VendorStep1.css';
import vendorpic from "../../../../assets/register/Illustration (1).png"
const Vendorstep1 = () => {
  // State to hold the form input values
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    address: '',
  });

  // Reference for the form element
  const formRef = useRef(null);

  // Function to handle changes in the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // You would typically send the formData to an API endpoint here
    console.log('Vendor Registration Submitted:', formData);

    alert('Registration form submitted successfully!');

    // Reset the form after submission
    setFormData({
      name: '',
      phone: '',
      location: '',
      address: '',
    });
  };

  // Function to handle form cancellation
  const handleCancel = () => {
    // Reset the form to its initial state
    setFormData({
      name: '',
      phone: '',
      location: '',
      address: '',
    });
    alert('Form has been reset.');
  };

  return (
    <div className="vendor-registration-container">
      <div className="vendor-registration-card">
        <h1 className="main-title">Vendor Registration</h1>
        <div className="content-wrapper">
          <div className="left-panel">
            {/* You would place your SVG or image here. For this example, it's a placeholder. */}
            <div className="illustration-placeholder">
                <img style={{ maxWidth: '100%', height: 'auto' }}  src={vendorpic} alt =''/>
            </div>

          </div>
          <div className='divider'></div>
          <div className="right-panel">
            <h2>Registration</h2>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="name@example"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number*</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="name@example"
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location*</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="name@example"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address*</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="name@example"
                />
              </div>
              <div className="button-group">
                <button type="button" onClick={handleCancel} className="cancel-button">
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendorstep1;