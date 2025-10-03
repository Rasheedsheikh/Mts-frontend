import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./ServiceListing.css";

const initialServices = [
  // Auto Care Services
  {
    id: 1,
    title: "My TVS Multibrand Car Service",
    category: "Auto Care",
    rating: 4.4,
    verified: true,
    location: "Bapulapdu, NH-5, vijayawada road, hanuman junction, andhra pradesh, 521 105",
    tags: ["Company Authorized Dealer", "Doorstep Service", "24/7 Customer Support"],
    phone: "07487860940",
    img: "https://d3ntj9qzvonbya.cloudfront.net/system/dealer_accounts/85/hero_images/original/Napa_Car_Care_HERO_copy.png"
  },
  {
    id: 2,
    title: "Premium Auto Care Center",
    category: "Auto Care",
    rating: 3.4,
    verified: true,
    location: "Eluru, vijayawada road, Vatluru, andhra pradesh, 521 105",
    tags: ["Company Authorized Dealer", "Doorstep Service", "24/7 Customer Support"],
    phone: "07487860940",
    img: "https://thumbs.dreamstime.com/b/automotive-auto-care-logo-template-modern-sport-car-automotive-auto-care-logo-template-modern-sport-car-vector-illustration-191268375.jpg"
  },
  {
    id: 3,
    title: "Quick Auto Repair",
    category: "Auto Care",
    rating: 4.8,
    verified: true,
    location: "Nuzividu, andhra pradesh, 521 105",
    tags: ["Company Authorized Dealer", "Doorstep Service", "24/7 Customer Support"],
    phone: "07487860940",
    img: "https://media.gettyimages.com/id/142457802/photo/open-doorway-of-auto-repair-shop.jpg?s=612x612&w=gi&k=20&c=aQtfKJeBa9kUVag3NXR5QibJlXi5lEKZHlC-WgSbbFM="
  },
  {
    id: 4,
    title: "Budget Auto Service",
    category: "Auto Care",
    rating: 2.4,
    verified: false,
    location: "Bapulapdu, NH-5, vijayawada road, hanuman junction, andhra pradesh, 521 105",
    tags: ["Company Authorized Dealer", "Doorstep Service", "24/7 Customer Support"],
    phone: "07487860940",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba"
  },

  // Restaurant Services
  {
    id: 5,
    title: "Spice Garden Restaurant",
    category: "Restaurant",
    rating: 4.6,
    verified: true,
    location: "MG Road, Vijayawada, Andhra Pradesh",
    tags: ["Fine Dining", "Vegetarian & Non-Veg", "Home Delivery"],
    phone: "0866-2345678",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
  },
  {
    id: 6,
    title: "Royal Biryani House",
    category: "Restaurant",
    rating: 4.2,
    verified: true,
    location: "Benz Circle, Vijayawada, Andhra Pradesh",
    tags: ["Authentic Biryani", "Family Restaurant", "Takeaway Available"],
    phone: "0866-2456789",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
  },
  {
    id: 7,
    title: "Coastal Kitchen",
    category: "Restaurant",
    rating: 4.7,
    verified: true,
    location: "Beach Road, Visakhapatnam, Andhra Pradesh",
    tags: ["Seafood Special", "Beach View", "Outdoor Seating"],
    phone: "0891-2567890",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2"
  },

  // Hotel Services
  {
    id: 8,
    title: "Grand Palace Hotel",
    category: "Hotel",
    rating: 4.5,
    verified: true,
    location: "Raj Bhavan Road, Hyderabad, Telangana",
    tags: ["5-Star Hotel", "Swimming Pool", "Conference Hall"],
    phone: "040-23456789",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
  },
  {
    id: 9,
    title: "Comfort Inn",
    category: "Hotel",
    rating: 4.1,
    verified: true,
    location: "Airport Road, Vijayawada, Andhra Pradesh",
    tags: ["Budget Friendly", "Free WiFi", "Airport Shuttle"],
    phone: "0866-2345678",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d"
  },
  {
    id: 10,
    title: "Beach Resort Paradise",
    category: "Hotel",
    rating: 4.8,
    verified: true,
    location: "Beach Road, Visakhapatnam, Andhra Pradesh",
    tags: ["Beach Front", "Spa Services", "Water Sports"],
    phone: "0891-2678901",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
  },

  // Electronics Services
  {
    id: 11,
    title: "TechZone Electronics",
    category: "Electronics",
    rating: 4.3,
    verified: true,
    location: "IT Park, Hyderabad, Telangana",
    tags: ["Laptop Repair", "Mobile Service", "Warranty Service"],
    phone: "040-24567890",
    img: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0"
  },
  {
    id: 12,
    title: "Digital Solutions",
    category: "Electronics",
    rating: 4.0,
    verified: true,
    location: "MG Road, Vijayawada, Andhra Pradesh",
    tags: ["Computer Repair", "Data Recovery", "Software Installation"],
    phone: "0866-2567890",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af2176"
  },
  {
    id: 13,
    title: "Smart Home Solutions",
    category: "Electronics",
    rating: 4.6,
    verified: true,
    location: "Banjara Hills, Hyderabad, Telangana",
    tags: ["Home Automation", "Security Systems", "Smart Devices"],
    phone: "040-25678901",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64"
  },

  // Cleaning Services
  {
    id: 14,
    title: "Sparkle Clean Services",
    category: "Cleaning",
    rating: 4.4,
    verified: true,
    location: "All Areas, Vijayawada, Andhra Pradesh",
    tags: ["Home Cleaning", "Office Cleaning", "Deep Cleaning"],
    phone: "0866-2678901",
    img: "https://images.unsplash.com/photo-1581578731548-c6a0c3f2fcc0"
  },
  {
    id: 15,
    title: "ProClean Solutions",
    category: "Cleaning",
    rating: 4.2,
    verified: true,
    location: "Gachibowli, Hyderabad, Telangana",
    tags: ["Commercial Cleaning", "Carpet Cleaning", "Window Cleaning"],
    phone: "040-26789012",
    img: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13"
  },
  {
    id: 16,
    title: "EcoClean Services",
    category: "Cleaning",
    rating: 4.7,
    verified: true,
    location: "Banjara Hills, Hyderabad, Telangana",
    tags: ["Eco-Friendly", "Green Cleaning", "Monthly Contracts"],
    phone: "040-27890123",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
  },

  // Beauty Services
  {
    id: 17,
    title: "Glamour Studio",
    category: "Beauty",
    rating: 4.5,
    verified: true,
    location: "Jubilee Hills, Hyderabad, Telangana",
    tags: ["Hair Styling", "Makeup", "Bridal Packages"],
    phone: "040-27890123",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035"
  },
  {
    id: 18,
    title: "Beauty Lounge",
    category: "Beauty",
    rating: 4.3,
    verified: true,
    location: "MG Road, Vijayawada, Andhra Pradesh",
    tags: ["Facial Treatment", "Hair Care", "Spa Services"],
    phone: "0866-2789012",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e"
  },
  {
    id: 19,
    title: "Elite Salon",
    category: "Beauty",
    rating: 4.8,
    verified: true,
    location: "Banjara Hills, Hyderabad, Telangana",
    tags: ["Premium Services", "Expert Stylists", "Luxury Treatments"],
    phone: "040-28901234",
    img: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937"
  },

  // Plumber Services
  {
    id: 20,
    title: "Quick Fix Plumbing",
    category: "Plumber",
    rating: 4.4,
    verified: true,
    location: "All Areas, Vijayawada, Andhra Pradesh",
    tags: ["24/7 Service", "Emergency Repair", "Water Tank Cleaning"],
    phone: "0866-2890123",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12"
  },
  {
    id: 21,
    title: "Pro Plumber Services",
    category: "Plumber",
    rating: 4.6,
    verified: true,
    location: "Gachibowli, Hyderabad, Telangana",
    tags: ["Pipe Installation", "Leak Repair", "Bathroom Fitting"],
    phone: "040-29012345",
    img: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13"
  },
  {
    id: 22,
    title: "Master Plumber",
    category: "Plumber",
    rating: 4.2,
    verified: true,
    location: "Banjara Hills, Hyderabad, Telangana",
    tags: ["Expert Service", "Quality Work", "Warranty Provided"],
    phone: "040-30123456",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12"
  },

  // Training Services
  {
    id: 23,
    title: "Tech Academy",
    category: "Training",
    rating: 4.7,
    verified: true,
    location: "IT Park, Hyderabad, Telangana",
    tags: ["Programming Courses", "Certification", "Job Placement"],
    phone: "040-31234567",
    img: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0"
  },
  {
    id: 24,
    title: "Skill Development Center",
    category: "Training",
    rating: 4.3,
    verified: true,
    location: "MG Road, Vijayawada, Andhra Pradesh",
    tags: ["Soft Skills", "Communication", "Leadership Training"],
    phone: "0866-3123456",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
  },
  {
    id: 25,
    title: "Professional Training Institute",
    category: "Training",
    rating: 4.5,
    verified: true,
    location: "Banjara Hills, Hyderabad, Telangana",
    tags: ["Corporate Training", "Online Courses", "Expert Instructors"],
    phone: "040-32345678",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
  }
];

const servicesList = initialServices;

const ServicesListing=()=> {
  const [searchParams, setSearchParams] = useSearchParams();
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [showVerified, setShowVerified] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Get category from URL parameters on component mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(decodeURIComponent(categoryFromUrl));
    }
  }, [searchParams]);

  // Filtering and Sorting
  const filteredServices = servicesList
    .filter(
      (s) =>
        (!showVerified || s.verified) &&
        s.rating >= minRating &&
        (s.location.toLowerCase().includes(location.toLowerCase()) || location === "") &&
        (s.title.toLowerCase().includes(search.toLowerCase()) || search === "") &&
        (selectedCategory === "" || s.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sort === "ratingHigh") return b.rating - a.rating;
      if (sort === "ratingLow") return a.rating - b.rating;
      if (sort === "titleAsc") return a.title.localeCompare(b.title);
      return 0;
    });

  // Handlers
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleSortChange = (e) => setSort(e.target.value);
  const handleVerifiedChange = () => setShowVerified((v) => !v);
  const handleRatingChange = (e) => setMinRating(Number(e.target.value));
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    
    // Update URL parameters
    if (newCategory) {
      setSearchParams({ category: newCategory });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="servicespage-container">
      <h2 className="servicespage-title">
        {selectedCategory ? `Best ${selectedCategory} Services in Andhra Pradesh` : 'Most Trusted Services in Andhra Pradesh'}
      </h2>
      <div className="servicespage-search-filters">
        <input
          className="servicespage-location-input"
          value={location}
          onChange={handleLocationChange}
          placeholder="Location"
          type="text"
        />
        <input
          className="servicespage-search-input"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search anything"
          type="text"
        />
        <button
          className="servicespage-search-btn"
          onClick={() => { /* Could trigger side-effects or analytics */ }}
        >
          🔍
        </button>
        <div className="servicespage-filter-group">
          <select
            className="servicespage-filter-btn"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            <option value="Auto Care">Auto Care</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Hotel">Hotel</option>
            <option value="Electronics">Electronics</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Beauty">Beauty</option>
            <option value="Plumber">Plumber</option>
            <option value="Training">Training</option>
          </select>
          <select
            className="servicespage-filter-btn"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="">Sort By</option>
            <option value="ratingHigh">Top Rated</option>
            <option value="ratingLow">Low Rated</option>
            <option value="titleAsc">A-Z</option>
          </select>
          <button
            className={`servicespage-filter-btn${showVerified ? " servicespage-verified" : ""}`}
            onClick={handleVerifiedChange}
          >
            MTS Verified
          </button>
          <select
            className="servicespage-filter-btn"
            value={minRating}
            onChange={handleRatingChange}
          >
            <option value={0}>All Ratings</option>
            <option value={4}>4+</option>
            <option value={4.5}>4.5+</option>
          </select>
        </div>
      </div>
      {filteredServices.length === 0 && (
        <div style={{ color: "#db4444", marginTop: "20px" }}>
          No services found with the selected filters.
        </div>
      )}
      {filteredServices.map((service) => (
        <div className="servicespage-card" key={service.id}>
          <img
            src={service.img}
            className="servicespage-card-image"
            alt={service.title}
          />
          <div className="servicespage-card-details">
            <div className="servicespage-card-title-row">
              <span className="servicespage-card-title">{service.title}</span>
              <span className="servicespage-card-rating">{service.rating} ★</span>
              {service.verified && (
                <span className="servicespage-card-verified">
                  MTS Verified ✔️
                </span>
              )}
            </div>
            <div className="servicespage-card-location">{service.location}</div>
            <div className="servicespage-card-tags">
              {service.tags.map((tag, i) => (
                <span className="servicespage-card-tag" key={i}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="servicespage-card-actions">
              <a href={`tel:${service.phone}`} className="servicespage-card-call">
                {service.phone}
              </a>
              <button className="servicespage-card-whatsapp">WhatsApp</button>
              <button className="servicespage-card-enquiry">Send Enquiry</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServicesListing;
