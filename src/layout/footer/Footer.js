import React from 'react';
import './Footer.css'; // Import the dedicated CSS file
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import mtsLogo from "../../assets/Frame 427318348.png"

// Assuming you have an image for the MTS India logo
// import mtsLogo from '../assets/mts-india-logo.png'; // Make sure to replace with your actual logo path

const Footer = () => {
  return (
    <footer className="main-footer-container">
      <div className="footer-content-wrapper">
        {/* Column 1: Connect & Promote */}
        <div className="footer-column">
          <h3 className="footer-heading">Connect & Promote</h3>
          <div className="footer-logo">
            <img src={mtsLogo} alt="MTS India Logo" />
          </div>
          <h3 className="footer-heading">Connect With US</h3>
          <div className="social-icons">
            <a href="#" className="social-icon-link"><FaFacebookF /></a>
            <a href="#" className="social-icon-link"><FaInstagram /></a>
            <a href="#" className="social-icon-link"><FaLinkedinIn /></a>
            <a href="#" className="social-icon-link"><FaYoutube /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Testimonials</a></li>
            <li><a href="#">Deals</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div className="footer-column">
          <h3 className="footer-heading">Support</h3>
          <ul className="footer-links">
            <li><a href="#">Free Listing</a></li>
            <li><a href="#">All Categories</a></li>
            <li><a href="#">Franchise</a></li>
            <li><a href="#">Advertise</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Column 4: Contact With Us */}
        <div className="footer-column contact-column">
          <h3 className="footer-heading">Contact With Us</h3>
          <address className="contact-info">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>Flat no-501,CITY SQUARE,HANUMAN JUNCTION,ANDHRA PRADESH,521105</span>
            </div>
            <div className="contact-item">
              <FaPhoneAlt className="contact-icon" />
              <span>9618487387</span>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>mtsindiaid999@gmail.com</span>
            </div>
          </address>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-copyright">
        <p>© Copyright 2024 My Town Services All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;