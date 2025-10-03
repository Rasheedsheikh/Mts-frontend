import React, { useState } from 'react';
import './MerchantRegistration2.css';
import MerchantRegistrationpic from "../../assets/register/5354443_2760424 1 (1).png"  // Assuming you have a CSS file for styling
import { useNavigate } from 'react-router-dom';

// SVG for the illustration (or you can use an image file)
const Illustration = () => (
 <div className="illustration-wrapper">
 <img src={MerchantRegistrationpic} alt="Verify Your Email Illustration" style={{ maxWidth: '100%', height: 'auto' }} />
 </div>
);

export default function MerchantRegistration2() {
  const navigate = useNavigate();
  const [shopImage, setShopImage] = useState(null);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleImageChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setShopImage(URL.createObjectURL(e.target.files));
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setShopImage(URL.createObjectURL(e.dataTransfer.files));
    }
  };

  const handleCancel = () => {
    setShopImage(null);
    setCategory('');
    setLocation('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment')
    alert('Payment gateway functionality not implemented.');
    // Implement your payment gateway or submission logic here
  };

  return (
    <div className="mrContainer">
      <h2 className="mrHeading">Merchant Registration</h2>
      <div className="mrBox">
        <div className="mrLeft">
          <img
            src={MerchantRegistrationpic}
            alt="Merchant Registration Illustration"
            className="mrIllustration"
          />
        </div>
        <div className="mrRight">
          <h3 className="mrFormTitle">Registration</h3>
          <form onSubmit={handleSubmit} className="mrForm">
            <label htmlFor="shopImage" className="mrLabel">
              Upload Image of the Shop*
            </label>
            <div
              className={`mrUploadArea ${dragActive ? 'mrUploadActive' : ''}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {shopImage ? (
                <img src={shopImage} alt="Shop" className="mrPreviewImage" />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#1693cf"
                    viewBox="0 0 24 24"
                    className="mrUploadIcon"
                  >
                    <path d="M16 2v6h-3v4h-2V8H8V2H3v20h18V2h-5zM9 4h2v2H9V4zm7 16H8v-2h8v2zm3-5h-2v3h-4v2h6v-5zm-6-5H6v3h7v-3z" />
                  </svg>
                  <p className="mrUploadText">choose images or drag and drop it here</p>
                  <input
                    type="file"
                    id="shopImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mrFileInput"
                  />
                </>
              )}
            </div>

            <label htmlFor="category" className="mrLabel">
              Category*
            </label>
            <input
              type="text"
              id="category"
              placeholder="name@example"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mrInput"
            />

            <label htmlFor="location" className="mrLabel">
              Location*
            </label>
            <input
              type="text"
              id="location"
              placeholder="name@example"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="mrInput"
            />

            <div className="mrButtonRow">
              <button type="button" onClick={handleCancel} className="mrCancelButton">
                Cancel
              </button>
              <button type="submit" className="mrSubmitButton">
                Payment Gateway
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
