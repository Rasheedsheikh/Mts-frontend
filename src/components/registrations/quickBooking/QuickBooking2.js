import React, { useState } from 'react';
import './QuickBooking1.css'; // Import the CSS file
// import { ReactComponent as ClipboardIllustration } from './clipboard.svg'; 
// Assuming you have a clipboard.svg
import bookingsuccess from "../../../assets/register/Frame 427318291.png"


const Illustration = () => (
 <div className="illustration-wrapper">
 <img src={bookingsuccess} alt="Verify Your Email Illustration" style={{ maxWidth: '100%', height: 'auto' }} />
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

const QuickBooking2 = () => {
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
        <div className="booking-container">
            <h1 className="main-title">Quick Booking</h1>
          
           
                <div className="illustration-section">
                    <Illustration/>
                 
                </div>
                <div className='divider'></div>
              
            </div>
 
    );
};

export default QuickBooking2;