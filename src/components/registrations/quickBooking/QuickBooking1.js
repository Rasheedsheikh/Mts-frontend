import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './QuickBooking1.css';
import quickbook from "../../../assets/register/5354443_2760424 1 (1).png";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Base_url } from "../../../constants/constant"

const Illustration = () => (
  <div className="illustration-wrapper">
    <img
      src={quickbook}
      alt="Verify Your Email Illustration"
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  </div>
);

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

  const [categories, setCategories] = useState([]);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  // API function to fetch categories and shops
  const fetchCategoriesAndShops = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${Base_url}/merchant-details/meta/categories-shops`);
      
      console.log('API Response:', response.data); // Debug log
      
      if (response.data) {
        // Based on your response structure:
        // { categories: [...], shopNames: [...] }
        const { categories: apiCategories, shopNames: apiShops } = response.data;
        
        setCategories(apiCategories || []);
        setShops(apiShops || []);
        
        console.log('Categories loaded:', apiCategories);
        console.log('Shops loaded:', apiShops);
      } else {
        // Fallback to empty arrays if API fails
        setCategories([]);
        setShops([]);
        toast.error('Failed to load categories and shops');
      }
    } catch (error) {
      console.error('Error fetching categories and shops:', error);
      setCategories([]);
      setShops([]);
      toast.error('Failed to load categories and shops');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCategoriesAndShops();
  }, []);

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
    const response = await fetch(`${Base_url}/free-bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        number: formData.mobile,
        category: formData.category,
        shop: formData.shop,
        message: formData.message,
        location: formData.location,
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
        location:''
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 className="form-title">Free Booking</h2>
              <button 
                type="button" 
                onClick={fetchCategoriesAndShops}
                disabled={loading}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

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
                  disabled={loading}
                >
                  <option value="" disabled>
                    {loading ? 'Loading categories...' : 'Select a category'}
                  </option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
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
                  disabled={loading}
                >
                  <option value="" disabled>
                    {loading ? 'Loading shops...' : 'Select a shop'}
                  </option>
                  {shops.map((shop, index) => (
                    <option key={index} value={shop}>
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
