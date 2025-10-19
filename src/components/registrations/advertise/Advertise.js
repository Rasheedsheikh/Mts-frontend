import React, { useState } from 'react';
import axios from 'axios';
import './Advertise.css';
import quickbook from "../../../assets/register/5354443_2760424 1 (1).png";
import { Base_url } from '../../../constants/constant';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Illustration = () => (
  <div className="illustration-wrapper">
    <img
      src={quickbook}
      alt="Advertise Illustration"
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  </div>
);

const Advertise = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle image file change
  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  // 🔹 Reset form
  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      location: '',
      startDate: '',
      endDate: '',
      image: null,
    });
  };

  // 🔹 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.location) {
      alert('Please fill all required fields.');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('location', formData.location);
    if (formData.startDate) data.append('startDate', formData.startDate);
    if (formData.endDate) data.append('endDate', formData.endDate);
    if (formData.image) data.append('image', formData.image);

    setLoading(true);
    try {
      const response = await axios.post(`${Base_url}/advertisement-registration`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('✅ Advertisement created:', response.data);
      toast.success('Advertisement created successfully!');
      handleCancel();
    } catch (error) {
      console.error('❌ Error:', error);
      alert(error.response?.data?.message || 'Error creating advertisement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='booking-parent1'>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="booking-container">
        <h1 className="main-title">Advertise With Us</h1>
        <p className="subtitle">Promote your brand — get featured on My Town Service!</p>

        <div className="content-wrapper">
          <div className="illustration-section">
            <Illustration />
          </div>

          <div className='divider'></div>

          <div className="form-section">
            <h2 className="form-title">Advertisement Details</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title*</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Ad Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter ad details..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location*</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Homepage Banner / Sidebar / etc."
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Upload Image*</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <div className="button-group">
                <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                  Reset
                </button>
                <button type="submit" className="btn btn-send" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertise;
