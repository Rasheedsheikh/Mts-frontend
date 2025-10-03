import React from 'react';
import './AllServices.css';
import coverimageservice from "../../assets/Frame 427318305 (1).png"

const services = [
  { icon: '🚗', label: 'Car Repair' },
  { icon: '🎨', label: 'Car Painting' },
  { icon: '🔋', label: 'Car Batteries' },
  { icon: '🧼', label: 'Car Wash' },
  { icon: '🛵', label: 'Scooter Repair' },
  { icon: '🛠️', label: 'Two Wheeler Services' },
  { icon: '🖌️', label: 'Stickering' },
  { icon: '🛞', label: 'Car Tyres' },
  { icon: '🎁', label: 'Car Accessories' },
  { icon: '🏍️', label: 'Motor Cycle Repair' },
  { icon: '🚲', label: 'Two Wheeler Tyres' },
  { icon: '🧪', label: 'Engine Carbon Cleaning Service' },
];

const AllServices = () => {
  return (
    <div className="allservices-container">
      <header className="allservices-header">
        <h1 className="allservices-logo">Auto Care</h1>
        <img
          src={coverimageservice}
          alt="Tools"
          className="allservices-header-image"
        />
      </header>

      <div className="allservices-search-container">
        <input
          type="text"
          placeholder="🔍 Search anything"
          className="allservices-search-bar"
        />
      </div>

      <div className="allservices-grid">
        {services.map((service, index) => (
          <div className="allservices-card" key={index}>
            <span className="allservices-icon">{service.icon}</span>
            <span className="allservices-label">{service.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllServices;
