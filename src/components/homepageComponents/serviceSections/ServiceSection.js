import React, { useRef } from 'react';
import { FaChevronRight } from 'react-icons/fa'; // For the right arrow in Categories
import './ServiceSection.css'; // Import the CSS file

// --- Placeholder Images/Illustrations ---
// You MUST replace these with your actual image paths!
// import merchantRegIllustration from '../assets/illustration-merchant-registration.png';
// import adsenseLeadsIllustration from '../assets/illustration-adsense-leads.png';
// import digitalPlatformIllustration from '../assets/illustration-digital-platform.png';

// import iconFruitsVegetables from '../assets/icon-fruits-vegetables.png';
// import iconGrocery from '../assets/icon-grocery.png';
// import iconLaundry from '../assets/icon-laundry.png';
// import iconPaperWala from '../assets/icon-paper-wala.png';
// import iconSchools from '../assets/icon-schools.png';
// import iconColleges from '../assets/icon-colleges.png';
// import iconTutorials from '../assets/icon-tutorials.png';
// import iconArtCraft from '../assets/icon-art-craft.png';

// import iconAgriculture from '../assets/icon-agriculture.png';
// import iconAutoCare from '../assets/icon-auto-care.png';
// import iconAirTicket from '../assets/air-ticket.png'; // Corrected filename assuming this is it
// import iconAutomobile from '../assets/icon-auto-mobile.png';
// import iconB2B from '../assets/icon-b2b.png';
// import iconBabyCare from '../assets/icon-baby-care.png';
// import iconBanquetHalls from '../assets/icon-banquet-halls.png';
// import iconBusTicket from '../assets/icon-bus-ticket.png';
// import iconChemist from '../assets/icon-chemist.png';
// import iconCivilContractors from '../assets/icon-civil-contractors.png';
// import iconAllCategories from '../assets/icon-all-categories.png';
import merchantRegistration from "../../../assets/Group (3).png";
import addleads from "../../../assets/Group (4).png";

import digitalPlatform from "../../../assets/OBJECTS.png";
import agriculture from "../../../assets/Frame 427318210.png";
import agri from "../../../assets/Frame 427318210 (1).png";
import restaurant from "../../../assets/services/restaurant_2075450.png";
import autocare from "../../../assets/services/transport_15891427.png";
import plumber from "../../../assets/services/plumber_12029416.png";
import laptop from "../../../assets/services/laptop_11914015.png";
import mop from "../../../assets/services/mop_1685993.png";
import hotel from "../../../assets/services/hotel_6008287.png";
import hostel from "../../../assets/services/travel_16478878.png";
import packers from "../../../assets/services/delivery_3488547.png";
import events from "../../../assets/services/events_5837046.png";
import homedecor from "../../../assets/services/home-decor_12516469.png";
import training from "../../../assets/services/training_4172924.png";
import education from "../../../assets/services/dormitory_18251237.png";
import gym from "../../../assets/services/fitness_2964514.png";
import beauty from "../../../assets/services/facial-treatment_9097370.png"
import vegetables from "../../../assets/services/vegetables_1131171.png"
import grocery from "../../../assets/services/basket_10241875.png"
import bills from "../../../assets/services/bill_10060196.png"
import laundry  from "../../../assets/services/washing-clothes_4557260.png"














// --- Data for Sections ---
const forCustomersData = [
  { id: 1, title: 'Merchant Registration', image: merchantRegistration, highlighted: false },
  { id: 2, title: 'AdSense Leads', image: addleads, highlighted: true }, // Highlighted in the image
  { id: 3, title: 'MTS will also do digital platform', image: digitalPlatform, highlighted: false },
];

const popularServicesData = [
  {
    category: 'Daily Needs',
    description: 'Locate your everyday essentials nearby—fast and easy.',
    link: '#', // Placeholder for "Explore more" link
    items: [
      { id: 1, name: 'Fruits & Vegtables', icon:vegetables },
      { id: 2, name: 'Grocery',  icon: grocery },
      { id: 3, name: 'Laundry',  icon: laundry},
      { id: 4, name: 'Paper Wala',  icon: bills},
    ],
  },
  {
    category: 'Education',
    description: 'Looking for quality education options? Discover top-rated institutions and learning centers around your location.',
    link: '#',
    items: [
      { id: 5, name: 'Schools',  icon:education  },
      { id: 6, name: 'Colleges',  icon: education },
      { id: 7, name: 'Tutorials',  icon: education},
      { id: 8, name: 'Art & Craft Class',  icon: education },
    ],
  },
];

const categoriesData = [
  { id: 1, name: 'Auto Care',  icon: autocare, highlighted: false },
  { id: 2, name: 'Restaurant',  icon: restaurant, highlighted: true }, // Highlighted in the image
  { id: 3, name: 'Electronics', icon: laptop, highlighted: false },
  { id: 4, name: 'Plumber',  icon: plumber, highlighted: false },
  { id: 5, name: 'Hostels', icon: hostel, highlighted: false },
  { id: 6, name: 'Beauty', icon: beauty, highlighted: false },
    { id: 6, name: 'Beauty', icon: beauty, highlighted: false },
      { id: 6, name: 'Beauty', icon: beauty, highlighted: false },
        { id: 6, name: 'Beauty', icon: beauty, highlighted: false },
  // { id: 7, name: 'Banquet Halls',  icon: '', highlighted: false },
  // { id: 8, name: 'Bus Ticket',  icon: '', highlighted: false },
  // { id: 9, name: 'Chemist',  icon: '', highlighted: false },
  // { id: 10, name: 'Civil Contractors',  icon: '', highlighted: false },
  { id: 11, name: 'All Categories',  icon: '', highlighted: false },
];

// --- The Combined Component ---
const ServiceSections = () => {
  const categoriesScrollRef = useRef(null);

  const scrollCategoriesRight = () => {
    if (categoriesScrollRef.current) {
      categoriesScrollRef.current.scrollBy({
        left: 200, // Adjust scroll amount as needed
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="home-page-wrapper">
      {/* Section 1: For Customers */}
      <div className="section-header">
        <h2>For Customers</h2>
        <p>Most-used services in your area – quick to book, easy to trust.</p>
      </div>
      <div className="card-grid customer-cards">
        {forCustomersData.map(item => (
          <div key={item.id} className={`customer-card ${item.highlighted ? 'highlighted' : ''}`}>
            <img src={item.image} alt={item.title} />
            <span>{item.title}</span>
          </div>
        ))}
      </div>

      {/* Section 2: Popular Services */}
      <div className="section-header">
        <h2>Popular Services</h2>
        <p>Most-used services in your area – quick to book, easy to trust.</p>
        <a href="#" className="explore-more-link">Explore more</a>
      </div>
      <div className="card-grid popular-services-sections"> {/* Using card-grid as a wrapper */}
        {popularServicesData.map(category => (
          <div key={category.category} className="popular-service-category">
            <div className="category-header">
              <h3>{category.category}</h3>
              <p>{category.description}</p>
              <a href={category.link} className="explore-more-link">Explore more</a>
            </div>
            <div className="service-item-grid">
              {category.items.map(item => (
                <div key={item.id} className="service-item">
                  <img src={item.icon} alt={item.name} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Section 3: Categories */}
      <div className="section-header">
        <h2>Categories</h2>
        <p>Browse all local business categories</p>
      </div>
      <div className="categories-scroll-container" ref={categoriesScrollRef}>
        {categoriesData.map(category => (
          <div key={category.id} className={`category-card ${category.highlighted ? 'highlighted' : ''}`}>
            <img src={category.icon} alt={category.name} />
            <span>{category.name}</span>
          </div>
        ))}
      </div>
      <div className="categories-scroll-button-wrapper">
        <button className="categories-scroll-button" onClick={scrollCategoriesRight}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ServiceSections;