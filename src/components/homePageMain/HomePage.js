// src/Components/HomePage/HomePage.js
import React from 'react';
import HeroWithSliders from '../homepageComponents/heroWithSliders/HeroWithSliders';
import ServiceSections from '../homepageComponents/serviceSections/ServiceSection';
import PopularServices from '../homepageComponents/popularServices/PopularServices';
import './HomePage.css';

// This is just a component, not a full page with its own layout.
// It will be rendered by the <Route> in App.js
const HomePage = () => {
  return (
    <div className="homepage-container">
      <HeroWithSliders/>
      <PopularServices/>
    </div>
  );
};

export default HomePage;