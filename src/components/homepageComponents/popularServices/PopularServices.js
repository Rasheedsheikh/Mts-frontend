import React from 'react';
import './PopularServices.css';
import merchantRegistration from "../../../assets/Group (3).png";
import addleads from "../../../assets/Group (4).png";
import { motion } from 'framer-motion';

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
import educatio from "../../../assets/services/dormitory_18251237.png";
import gym from "../../../assets/services/fitness_2964514.png";
import beauty from "../../../assets/services/facial-treatment_9097370.png"
import vegetables from "../../../assets/services/vegetables_1131171.png"
import grocery from "../../../assets/services/basket_10241875.png"
import bills from "../../../assets/services/bill_10060196.png"
import laundry  from "../../../assets/services/washing-clothes_4557260.png"
import { useNavigate } from 'react-router-dom';

// Helper to render icon images; replace src with your real icon paths
const icon = (src, alt = 'icon') => (
  <img src={src} alt={alt} className="popularCardIconImg" />
);

// Categories data
const categories = [
  { label: 'Auto Care', icon: icon(autocare), category: 'Auto Care' },
  { label: 'Restaurant', icon: icon(restaurant), category: 'Restaurant' }, 
  { label: 'Electronics', icon: icon(laptop), category: 'Electronics' },
  { label: 'Plumber', icon: icon(plumber), category: 'Plumber' },
  { label: 'Hostels', icon: icon(hostel), category: 'Hotel' },
  { label: 'Trainings', icon: icon(training), category: 'Training' },
  { label: 'Cleaning', icon: icon(mop), category: 'Cleaning' },
  { label: 'Hotel', icon: icon(hotel), category: 'Hotel' },
  { label: 'Beauty', icon: icon(beauty), category: 'Beauty' },
];

// Popular Services data
const dailyNeeds = [
  { label: 'Fruits & Vegetables', icon: icon(vegetables) },
  { label: 'Grocery', icon: icon(grocery) },
  { label: 'Laundry', icon: icon(laundry) },
  { label: 'Paper Wala', icon: icon(bills) },
];

const education = [
  { label: 'Schools', icon: icon(educatio) },
  { label: 'Colleges', icon: icon(events) },
  { label: 'Tutorials', icon: icon(packers) },
  { label: 'Art & Craft Class', icon: icon(gym) },
];

// For Customers data
const forCustomers = [
  {
    label: 'Merchant Registration',
    image: merchantRegistration,
    route: '/merchantRegistration',
  },
  {
    label: 'AdSense Leads',
    image: addleads,
    route: '/advertise',
  },
  {
    label: 'MTS will also do digital platform',
    image: digitalPlatform,
  },
];


const topToBottomVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      type: "spring",
      stiffness: 100,
    },
  }),
};

const BottomToTopVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      type: "spring",
      stiffness: 100,
    },
  }),
};

const leftToRightVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      type: "spring",
      stiffness: 100,
    },
  }),
};
const rightToLeftVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      type: 'spring',
      stiffness: 100,
    },
  }),
};
// Components

function PopularCategorySection() {
    const navigate = useNavigate()

    const handleViewall = () => {
        navigate('/listAll')
    }

    const handleCategoryClick = (category) => {
        // Navigate to service listing with category filter
        navigate(`/serviceListing?category=${encodeURIComponent(category)}`)
    }

    
  return (
    <section className="popularSectionBox">
      <div className="popularSectionHeader">
        <div className="popularSectionTitle">Categories</div>
        <div className="popularSectionDesc">Browse all local business categories</div>
      </div>
      <div className="popularCategoryGrid">
        {categories.map((cat, idx) => (
            
            
          <div key={idx}>
             <motion.div
                className="popularCard"
                key={idx}
               initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.3 }}
  variants={topToBottomVariants}
  custom={idx}
  onClick={() => handleCategoryClick(cat.category)} 
              >

            <div className="popularCardIcon">{cat.icon}</div>
            <div className="popularCardLabel">{cat.label}</div>
              </motion.div>
          </div>
        
        ))}
        <motion.div 
          className="popularCard" 
          onClick={handleViewall}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={topToBottomVariants}
          custom={categories.length}
        >
            <div className="popularCardIcon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="#05B6FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="popularCardLabel">Explore More</div>
        </motion.div>
      </div>
    </section>
  );
}

function PopularServicesSection() {
  return (
    <section className="popularSectionBox popularSectionBox-services">
      <div className="popularSectionHeader">
        <div className="popularSectionTitle popularBlue">Popular Services</div>
        <div className="popularSectionDesc">
          Most-used services in your area – quick to book, easy to trust.
        </div>
        <a href="#" className="popularExploreLink">
          Explore more
        </a>
      </div>
      <div className="popularBox">
        <div className="popularHangingTag">Launching Soon</div>
        <div className="popularServiceFlex">
          <div className="popularServiceLeft">
            <div className="popularServiceTitlemini popularBlue">Daily Needs</div>
            <div className="popularServiceDesc">
              Locate your everyday essentials nearby—fast and easy.
            </div>
            <a href="#" className="popularExploreLink">
              Explore more
            </a>
          </div>
          <div className="popularServiceCards">
            {dailyNeeds.map((item, idx) => (
              <div className="popularCard" key={idx}>
                  <motion.div
                className="popularCard"
                key={idx}
               initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.3 }}
  variants={leftToRightVariants}
  custom={idx}
              >
                <div className="popularCardIcon">{item.icon}</div>
                <div className="popularCardLabel">{item.label}</div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        <hr className="popularDivider" />
        <div className="popularServiceFlex">
          <div className="popularServiceLeft">
            <div className="popularServiceTitlemini popularBlue">Education</div>
            <div className="popularServiceDesc">
              <span className="desktop-text">Looking for quality education options? Discover top-rated institutions and learning centers around your location.</span>
              <span className="mobile-text">Find quality schools, colleges, and learning centers near you.</span>
            </div>
            <a href="#" className="popularExploreLink">
              Explore more
            </a>
          </div>
          <div className="popularServiceCards">
            {education.map((item, idx) => (
              <div className="popularCard" key={idx}>
                 <motion.div
                className="popularCard"
                key={idx}
               initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.3 }}
  variants={rightToLeftVariants}
  custom={idx}
              >

                <div className="popularCardIcon">{item.icon}</div>
                <div className="popularCardLabel">{item.label}</div>
              </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PopularCustomersSection() {

    const navigate = useNavigate()
  return (
    <section className="popularSectionBox popularSectionBox-customers">
      <div className="popularSectionHeader">
        <div className="popularSectionTitle popularBlue">For Customers</div>
        <div className="popularSectionDesc">
          Most-used services in your area – quick to book, easy to trust.
        </div>
      </div>
      <div className="popularCustomerGrid">
        {forCustomers.map((item, idx) => (
          <div className="popularCustomerCard" key={idx} onClick={() => navigate(item.route)}>
             <motion.div
                className="popularCard"
                key={idx}
               initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.3 }}
  variants={BottomToTopVariants}
  custom={idx}
              >
            <img src={item.image} alt={item.label} className="popularCustomerImg" />
            <div className="popularCustomerLabel popularBlue">{item.label}</div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function PopularServices() {
  return (
    <div className="popularPageWrap">
      <PopularCategorySection />
      <PopularServicesSection />
      <PopularCustomersSection />
    </div>
  );
}
