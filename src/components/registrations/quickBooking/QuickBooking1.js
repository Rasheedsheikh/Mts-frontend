import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './QuickBooking1.css';
import quickbook from "../../../assets/register/5354443_2760424 1 (1).png";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Illustration = () => (
  <div className="illustration-wrapper">
    <img
      src={quickbook}
      alt="Verify Your Email Illustration"
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  </div>
);

const categories = [
  'Auto Care',
  'Laptops',
  'Washing Machine',
  'Cleaning',
  'Other Services'
];

const shops = [
  'Tech Repair Shop A',
  'MTS Auto Service',
  'Sparkling Cleaners',
  'General Services'
];

const QuickBooking1 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
    category: '',
    shop: '',
    location:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 // make sure react-hot-toast is installed

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/free-bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        number: formData.mobile,
        category: formData.category,
        shop: formData.shop,
        message: formData.message,
        location: "Hyderabad",
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      toast.success(result.message || "Booking successfully registered and email sent!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
        category: "",
        shop: "",
      });
    } else {
      toast.error(result.message || "Failed to submit booking.");
    }
  } catch (error) {
    console.error("Error submitting booking:", error);
    toast.error("Something went wrong. Please try again later.");
  }
};


  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      message: '',
      category: '',
      shop: '',
      location:''
    });
    toast.info('Form cleared');
  };

  return (
    <div className="booking-parent1">
           <ToastContainer position="top-right" autoClose={3000} />
      <div className="booking-container">
        <h1 className="main-title">Free Booking</h1>
        <p className="subtitle">
          Book local services instantly with MTS – Free Booking, hassle-free.
        </p>

        <div className="content-wrapper">
          <div className="illustration-section">
            <Illustration />
          </div>

          <div className="divider"></div>

          <div className="form-section">
            <h2 className="form-title">Free Booking</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile Number*</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="9876543210"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
            
              <div className="form-group">
                <label htmlFor="mobile">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Hyderabad, Vizag"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                <label htmlFor="category">Category*</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="shop">Shop*</label>
                <select
                  id="shop"
                  name="shop"
                  value={formData.shop}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select a shop</option>
                  {shops.map((shop) => (
                    <option key={shop} value={shop}>
                      {shop}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message*</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Type your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="button-group">
                <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-send">
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

export default QuickBooking1;
