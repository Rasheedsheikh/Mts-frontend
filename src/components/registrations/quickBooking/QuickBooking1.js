import React, { useState } from 'react';
import './QuickBooking1.css'; // Import the CSS file
// import { ReactComponent as ClipboardIllustration } from './clipboard.svg'; 
// Assuming you have a clipboard.svg
import quickbook from "../../../assets/register/5354443_2760424 1 (1).png"


const Illustration = () => (
 <div className="illustration-wrapper">
 <img src={quickbook} alt="Verify Your Email Illustration" style={{ maxWidth: '100%', height: 'auto' }} />
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
        shop: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        alert('Form submitted successfully!');
        setFormData({
            name: '',
            email: '',
            mobile: '',
            message: '',
            category: '',
            shop: ''
        });
    };

    const handleCancel = () => {
        setFormData({
            name: '',
            email: '',
            mobile: '',
            message: '',
            category: '',
            shop: ''
        });
        console.log('Form data reset.');
    };

    return (
        <div className='booking-parent1'>
        <div className="booking-container">
            <h1 className="main-title">Quick Booking</h1>
            <p className="subtitle">Book local services instantly with MTS – Quick Booking, hassle-free.</p>
            <div className="content-wrapper">
                <div className="illustration-section">
                    <Illustration/>
                    {/* <ClipboardIllustration className="illustration-image" /> */}
                </div>
                <div className='divider'></div>
                <div className="form-section">
                    <h2 className="form-title">Quick Booking</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name*</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="name@example"
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
                                placeholder="name@example"
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
                                placeholder="name@example"
                                value={formData.mobile}
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
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
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
                                {shops.map(shop => (
                                    <option key={shop} value={shop}>{shop}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message*</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                placeholder="name@example"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="button-group">
                            <button type="button" className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
                            <button type="submit" className="btn btn-send">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default QuickBooking1;