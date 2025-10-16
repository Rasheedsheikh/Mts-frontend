import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaMicrophone, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getAdvertisements, deleteAdvertisement, createAdvertisement } from '../../../apis/Advertisements';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

// --- Main Container for the entire component ---
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  padding: 20px;
  align-items: stretch;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    gap: 30px;
    padding: 15px;
  }

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 20px;
    padding: 10px;
  }

  @media (max-width: 768px) {
    gap: 15px;
    padding: 8px;
  }

  @media (max-width: 480px) {
    gap: 12px;
    padding: 5px;
  }
`;

// --- Left Side Container ---
const LeftSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px; 
  width: 60%;
  
  @media (max-width: 1200px) {
    width: 65%;
    gap: 25px;
  }
  
  @media (max-width: 992px) {
    width: 100%;
    gap: 20px;
  }

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

// --- Search Section Styles ---
const SearchSection = styled.section`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 1024px) {
    padding: 25px;
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 15px;
    border-radius: 8px;
  }

  @media (max-width: 320px) {
    padding: 12px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const Heading = styled.h1`
  font-family: Epilogue;
  font-weight: 700;
  font-style: Bold;
  font-size: 28px;
  line-height: 110%;
  letter-spacing: 0%;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    font-size: 26px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 120%;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    line-height: 125%;
    margin-bottom: 12px;
  }

  @media (max-width: 320px) {
    font-size: 18px;
  }
`;

const Highlight = styled.span`
  color: #007bff;
  font-weight: bold;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  width: 100%;

  @media (max-width: 992px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    gap: 8px;
    margin-bottom: 12px;
  }
`;

const InputGroup = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #E5F2FF;
  border-radius: 8px;
  padding: 10px 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  min-height: 48px;

  @media (max-width: 768px) {
    padding: 12px 15px;
    border-radius: 6px;
  }

  @media (max-width: 480px) {
    padding: 10px 12px;
    min-height: 44px;
  }
`;

const LocationInput = styled(InputGroup)`
  background-color: #E5F2FF;
`;

const Icon = styled.span`
  color: #888;
  margin-right: 10px;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  flex-grow: 1;
  font-size: 16px;
  background: transparent;
  color: #333;

  &::placeholder {
    color: #888;
  }

  @media (max-width: 768px) {
    font-size: 16px; /* Prevents zoom on iOS */
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const SearchButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  min-height: 48px;
  min-width: 48px;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 20px;
    border-radius: 6px;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 14px;
    min-height: 44px;
  }
`;

const Tagline = styled.p`
  font-family: Work Sans;
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0%;
  margin: 0;
  color: #666;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 145%;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 150%;
  }

  @media (max-width: 320px) {
    font-size: 13px;
  }
`;

const TaglineHighlight = styled.span`
  color: #007bff;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// --- Right Side Slider Styles ---
const RightSliderWrapper = styled.div`
  width: 35%;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: auto;

  @media (max-width: 1200px) {
    width: 35%;
  }

  @media (max-width: 992px) {
    width: 100%;
    min-height: 400px;
    border-radius: 12px;
  }

  @media (max-width: 768px) {
    min-height: 350px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    min-height: 300px;
    border-radius: 8px;
  }
`;

const AdsSliderContent = styled.div`
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${props => props.$currentIndex * 100}%);
`;

const AdsSlide = styled.div`
  min-width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-width: 992px) {
    min-height: 400px;
  }

  @media (max-width: 768px) {
    min-height: 350px;
  }

  @media (max-width: 480px) {
    min-height: 300px;
  }
`;

const AdsSlideImage = styled.img`
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  object-fit: fill;

  
`;

const AdsSlideContent = styled.div`
  padding: 25px;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }

  @media (max-width: 320px) {
    padding: 12px;
  }
`;

const AdsSlideTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.2;
  
  @media (max-width: 992px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }

  @media (max-width: 320px) {
    font-size: 1rem;
  }
`;

const AdsSlideDescription = styled.p`
  margin: 0 0 15px 0;
  font-size: 0.95rem;
  opacity: 0.9;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 10px;
    line-height: 1.3;
  }

  @media (max-width: 320px) {
    font-size: 0.8rem;
  }
`;

const AdsSlideButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  padding: 8px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  align-self: center;
  min-height: 40px;

  &:hover {
    background-color: white;
    color: #007bff;
  }

  @media (max-width: 768px) {
    padding: 10px 18px;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 0.8rem;
    min-height: 36px;
  }

  @media (max-width: 320px) {
    padding: 6px 14px;
    font-size: 0.75rem;
  }
`;

const AdsNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.4rem;
  color: #007bff;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: white;
    transform: translateY(-50%) scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AdsPrevButton = styled(AdsNavButton)`
  left: 15px;
`;

const AdsNextButton = styled(AdsNavButton)`
  right: 15px;
`;

const AdsDotsContainer = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

const AdsDot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => (props.$active ? 'white' : 'rgba(255, 255, 255, 0.5)')};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
  }
`;


const SectionWrapper = styled.div`
  background-color: #ffffff;
  padding: 30px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const ProductsServicesWrapper = styled(SectionWrapper)`
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }

  @media (max-width: 480px) {
    padding: 15px 12px;
  }

  @media (max-width: 320px) {
    padding: 12px 10px;
  }
`;

const SectionTitle = styled.h2`
  font-family: Epilogue;
  font-weight: 600;
  font-size: 24px;
  line-height: 110%;
  letter-spacing: 0%;
  color: #05B6FA;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    font-size: 22px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 12px;
  }

  @media (max-width: 320px) {
    font-size: 16px;
  }
`;

// --- Products & Services Slider Specific Styles ---
const SliderWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const SliderContent = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${props => props.$currentIndex * 100}%);
`;

const Slide = styled.div`
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  @media (max-width: 1200px) {
    height: 280px;
  }

  @media (max-width: 1024px) {
    height: 240px;
  }

  @media (max-width: 768px) {
    height: 200px;
  }

  @media (max-width: 480px) {
    height: 180px;
  }

  @media (max-width: 320px) {
    height: 160px;
  }
`;

const SliderNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: #007bff;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 123, 255, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(SliderNavButton)`
  left: 10px;
`;

const NextButton = styled(SliderNavButton)`
  right: 10px;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const Dot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => (props.$active ? '#007bff' : '#d1d1d1')};
  border: none;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;


// --- Data for Sliders ---
const initialProductsSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 2,
    image: 'https://amgglobaltrading.com/assets/images/electonic-banner.jpg',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1600&auto=format&fit=crop',
  },
];

const initialAdsSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop',
    title: 'Advertise with MTS',
    description: 'Promote your business locally and reach ready-to-buy customers.',
    buttonText: 'Start Advertising'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop',
    title: 'Verified Providers',
    description: 'Find trusted, verified professionals near you in minutes.',
    buttonText: 'Find Providers'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?q=80&w=1600&auto=format&fit=crop',
    title: 'Free Booking',
    description: 'Book top services instantly. No hassle, no waiting.',
    buttonText: 'Book Now'
  },
];

// --- Combined Component ---
const HeroWithSliders = () => {
  // State for location
  // const [userLocation, setUserLocation] = useState('Detecting location...');
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [rightHeight, setRightHeight] = useState('auto');

  const [userLocation, setUserLocation] = useState('Detecting location...');
  const [adsSlides, setAdsSlides] = useState([]);
  const [adsCurrentIndex, setAdsCurrentIndex] = useState(0);
  const [productsCurrentIndex, setProductsCurrentIndex]= useState(0)
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin]= useState(false);
  const navigate= useNavigate('')

   useEffect(() => {
        const checkAdminStatus = () => {
            // 1. Retrieve the role string from Local Storage
            // NOTE: Change 'userRole' if your key is different (e.g., 'role', 'authRole')
            const storedRole = localStorage.getItem('role'); 

            // 2. Define the admin role value(s)
            const ADMIN_ROLE_VALUE = 'admin'; // Use the exact string your backend sends for admin

            // 3. Set the state
            if (storedRole && storedRole.toLowerCase() === ADMIN_ROLE_VALUE) {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        };
        checkAdminStatus();
    
    }, []); 

  // NEW STATE FOR THE ADD AD FORM
    // const [newAdFormData, setNewAdFormData] = useState({
    //     title: '',
    //     city: '',
    //     imageFile: null, 
    //     sliderType:''
    // });

    //    const [newProdFormData, setNewProdFormData] = useState({
    //     title: '',
    //     city: '',
    //     imageFile: null, 
    //     sliderType:''
    // });

    // const handleNewAdChange = (e) => {
    //     const { name, value, files } = e.target;

    //     if (name === 'imageFile') {
    //         // Clear URL if a file is chosen, and vice-versa (not shown here, but good practice)
    //         setNewAdFormData({ ...newAdFormData, imageFile: files[0]}); 
    //     } else {
    //         setNewAdFormData({ ...newAdFormData, [name]: value });
    //     }
    // };

    //     const handleNewProdChange = (e) => {
    //     const { name, value, files } = e.target;

    //     if (name === 'imageFile') {
    //         // Clear URL if a file is chosen, and vice-versa (not shown here, but good practice)
    //         setNewProdFormData({ ...newProdFormData, imageFile: files[0]}); 
    //     } else {
    //         setNewProdFormData({ ...newProdFormData, [name]: value });
    //     }
    // };
// HeroWithSliders.jsx




// 2. Ensure your component has the necessary state (newAdFormData, loading, adsSlides)

// const handleNewAdSubmit = async (e) => { // ⬅️ Must be async
//     e.preventDefault();

//     // 1. Basic Validation
//     // Check for imageFile OR imageUrl, not just imageFile
//     if (!newAdFormData.title || !newAdFormData.city || (!newAdFormData.imageFile && !newAdFormData.imageUrl)) {
//         toast.error('Please fill in at least Title, Location (City), and provide an Image file or URL.');
//         return;
//     }

//     // 2. Prepare Data (using FormData for API POST)
//     const data = new FormData();
//     data.append('title', newAdFormData.title);
//     data.append('description', newAdFormData.description || '');
//     // NOTE: If your API expects 'location' instead of 'city', change the key below.
//     data.append('location', newAdFormData.city); 
//     data.append('sliderType',newAdFormData.sliderType)
    
//     // Append the file or the URL
//     if (newAdFormData.imageFile) {
//         // Use the key your backend expects for file upload (e.g., 'file' or 'image')
//         data.append('image', newAdFormData.imageFile); 
//     } else if (newAdFormData.imageUrl) {
//         data.append('image', newAdFormData.imageUrl);
//     }

//     setLoading(true); // Assuming you have a loading state set up

//     // 3. API Call to post data ⬅️ API Integration
//     try {
//         const newAdFromApi = await createAdvertisement(data); 

//         // 4. Success Actions: Update UI with the NEW AD data from the API response
//         setAdsSlides(prev => [...prev, newAdFromApi]);
        
//         // Reset form data
//         setNewAdFormData({
//             title: '', description: '', city: '', buttonText: '', imageFile: null, sliderType:'',
//         });
        
//         // Move slider to the new ad (adsSlides.length is the index of the newly added slide)
//         setAdsCurrentIndex(adsSlides.length); 

//         console.log('✅ Advertisement created:', newAdFromApi);
//       toast.success(`Ad for "${newAdFromApi.title}" successfully created!`);

//     } catch (error) {
        
//         // 5. Error Handling
//         const errorMessage = error.response?.data?.message || 'Failed to create advertisement. Check API service.';
//         console.error('❌ Error creating advertisement:', error.response || error);
//         toast.error(errorMessage);

//     } finally {
//         setLoading(false);
//     }
// };


// const handleNewProdSubmit = async (e) => { // ⬅️ Must be async
//     e.preventDefault();

//     // 1. Basic Validation
//     // Check for imageFile OR imageUrl, not just imageFile
//     if (!newProdFormData.title || !newProdFormData.city || (!newProdFormData.imageFile && !newProdFormData.imageUrl)) {
//         toast.error('Please fill in at least Title, Location (City), and provide an Image file or URL.');
//         return;
//     }

//     // 2. Prepare Data (using FormData for API POST)
//     const data = new FormData();
//     data.append('title', newProdFormData.title);
//     data.append('description', newProdFormData.description || '');
//     // NOTE: If your API expects 'location' instead of 'city', change the key below.
//     data.append('location', newProdFormData.city); 
//     data.append('sliderType', 'Featured')
    
//     // Append the file or the URL
//     if (newProdFormData.imageFile) {
//         // Use the key your backend expects for file upload (e.g., 'file' or 'image')
//         data.append('image', newProdFormData.imageFile); 
//     } else if (newProdFormData.imageUrl) {
//         data.append('image', newProdFormData.imageUrl);
//     }

//     setLoading(true); // Assuming you have a loading state set up

//     // 3. API Call to post data ⬅️ API Integration
//     try {
//         const newProdFromApi = await createAdvertisement(data); 

//         // 4. Success Actions: Update UI with the NEW AD data from the API response
//         setProductSlides(prev => [...prev, newProdFromApi]);
        
//         // Reset form data
//         setNewProdFormData({
//             title: '', description: '', city: '', buttonText: '', imageFile: null, sliderType:'',
//         });
        
//         // Move slider to the new ad (adsSlides.length is the index of the newly added slide)
//         setProductsCurrentIndex(productSlides.length); 

//         console.log('✅ Advertisement created:', newProdFromApi);
//         toast.success(`Ad for "${newProdFromApi.title}" successfully created!`);

//     } catch (error) {
        
//         // 5. Error Handling
//         const errorMessage = error.response?.data?.message || 'Failed to create advertisement. Check API service.';
//         console.error('❌ Error creating advertisement:', error.response || error);
//         toast.error(errorMessage);

//     } finally {
//         setLoading(false);
//     }
// };
  

const fetchData = async (userLocation) => {
    setLoading(true);

    try {
        const allAds = await getAdvertisements(); 


        const locationFilteredAds = allAds.filter(ad =>
            ad.location.toLowerCase() === userLocation.toLowerCase() || ad.location.toLowerCase() === 'all'
        );

        
        const featuredProducts = [];
        const nonFeaturedAds = [];

        locationFilteredAds.forEach(ad => {

            if (ad.sliderType === 'Featured') {
                featuredProducts.push(ad);
            } else {
                nonFeaturedAds.push(ad);
            }
        });

        const mappedProductSlides = featuredProducts.map(ad => ({
        id: ad.advertisement_id, // Use advertisement_id as the unique key
            image: ad?.imageUrl,      // Map imageUrl to image
            title: ad.title,
            description: ad.description,
            city: ad.location    
        }));
        setProductSlides(mappedProductSlides);

        const mappedAdSlides = nonFeaturedAds.map(ad => ({
        id: ad.advertisement_id, // Use advertisement_id as the unique key
            image: ad?.imageUrl,      // Map imageUrl to image
            title: ad.title,
            description: ad.description,

            city: ad.location  
        }));
        setAdsSlides(mappedAdSlides);

    } catch (err) {
        console.error('Error fetching data:', err);
    } finally {
        setLoading(false);
    }
};
  // const handleDeleteAd = async (advertisement_id) => {
  //   try {
  //     await deleteAdvertisement(advertisement_id);
  //     setAdsSlides(prev => prev.filter(ad => ad.advertisement_id !== advertisement_id));
  //   } catch (err) {
  //     console.error('Failed to delete ad:', err);
  //     toast.error('Failed to delete advertisement');
  //   }
  // };

  // Get Location + Fetch Ads
  useEffect(() => {
    const getUserLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await res.json();
            const city =
              data.city ||
              data.locality ||
              data.principalSubdivision ||
              "All";
            setUserLocation(city);
            fetchData(city);
          },
          () => {
            setUserLocation("All");
            fetchData("All");
          }
        );
      } else {
        setUserLocation("All");
        fetchData("All");
      }
    };
    getUserLocation();
  }, []);


  useEffect(() => {
  if (!userLocation || userLocation === 'Detecting location...') return;

  const delay = setTimeout(() => {
    fetchData(userLocation);
  }, 800); // wait 0.8 sec after typing stops

  return () => clearTimeout(delay);
}, [userLocation]);


  // 👇 Allow manual editing
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setUserLocation(value);
  };

  
  
  // Local state for slides (editable in UI)
  const [productSlides, setProductSlides] = useState([]);
  // const [adsSlides, setAdsSlides] = useState(initialAdsSlides);
  const [newProductImageUrl, setNewProductImageUrl] = useState('');
  const [newAdImageUrl, setNewAdImageUrl] = useState('');
  
  // State and logic for Products & Services Slider
  const productsTotalSlides = productSlides?.length || 0;
  const productsGoToPrev = () => {
    if (productsTotalSlides <= 1) return;
    setProductsCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : productsTotalSlides - 1));
  };
  const productsGoToNext = () => {
    if (productsTotalSlides <= 1) return;
    const lastIndex = productsTotalSlides - 1;
    setProductsCurrentIndex(prevIndex => (prevIndex < lastIndex ? prevIndex + 1 : 0));
  };
  const productsGoToSlide = (index) => {
    if (index >= 0 && index < productsTotalSlides) {
      setProductsCurrentIndex(index);
    }
  };
  const addProductImage = (src) => {
    if (!src) return;
    setProductSlides(prev => {
      const nextId = prev.length ? Math.max(...prev.map(s => s.id || 0)) + 1 : 1;
      return [...prev, { id: nextId, image: src }];
    });
    setNewProductImageUrl('');

  };
  const deleteProductSlide = (index) => {
    setProductSlides(prev => {
      const updated = prev.filter((_, i) => i !== index);
      return updated.length ? updated : prev; // prevent empty state
    });
    setProductsCurrentIndex(0);
  };

  // State and logic for Ads Slider
  const adsTotalSlides = adsSlides?.length || 0;
  const adsGoToPrev = () => {
    if (adsTotalSlides <= 1) return;
    setAdsCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : adsTotalSlides - 1));
  };
  const adsGoToNext = () => {
    if (adsTotalSlides <= 1) return;
    const lastIndex = adsTotalSlides - 1;
    setAdsCurrentIndex(prevIndex => (prevIndex < lastIndex ? prevIndex + 1 : 0));
  };
  const adsGoToSlide = (index) => {
    if (index >= 0 && index < adsTotalSlides) {
      setAdsCurrentIndex(index);
    }
  };
  // const addAdImage = (src) => {
  //   if (!src) return;
  //   setAdsSlides(prev => {
  //     const nextId = prev.length ? Math.max(...prev.map(s => s.id || 0)) + 1 : 1;
  //     return [
  //       ...prev,
  //       {
  //         id: nextId,
  //         image: src,
  //         title: 'New Ad',
  //         description: 'Your description here',
  //         buttonText: 'Learn More'
  //       }
  //     ];
  //   });
  //   setNewAdImageUrl('');
  // };
  const deleteAdSlide = (index) => {
    setAdsSlides(prev => {
      const updated = prev.filter((_, i) => i !== index);
      return updated.length ? updated : prev;
    });
    setAdsCurrentIndex(0);
  };

  // Geolocation function to get user's city
  const getUserLocation = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              // Using a free geocoding service to get city name
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              const data = await response.json();
              const city = data.city || data.locality || data.principalSubdivision || 'Your City';
              setUserLocation(city);
            } catch (error) {
              console.error('Error fetching location:', error);
              setUserLocation('Your City');
            }
          },
          (error) => {
            console.error('Geolocation error:', error);
            setUserLocation('Your City');
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 600000
          }
        );
      } else {
        setUserLocation('Your City');
      }
    } catch (error) {
      console.error('Location detection failed:', error);
      setUserLocation('Your City');
    }
  };

  const [category, setCategory] = useState('');
const handleCategoryChange = (e) => {
  setCategory(e.target.value);
};

const handleCategorySearch = () => {
  if (category.trim()) {
    navigate(`/serviceListing?category=${encodeURIComponent(category)}`);
  }
};

const handleCategoryKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleCategorySearch();
  }
};

  // Auto-slide functionality
  useEffect(() => {
    getUserLocation();
    
    // Auto-slide for products slider
    const productsInterval = productsTotalSlides > 1 ? setInterval(() => {
      setProductsCurrentIndex(prevIndex => 
        prevIndex < productsTotalSlides - 1 ? prevIndex + 1 : 0
      );
    }, 3000) : null;

    // Auto-slide for ads slider
    const adsInterval = adsTotalSlides > 1 ? setInterval(() => {
      setAdsCurrentIndex(prevIndex => 
        prevIndex < adsTotalSlides - 1 ? prevIndex + 1 : 0
      );
    }, 3000) : null;

    return () => {
      if (productsInterval) clearInterval(productsInterval);
      if (adsInterval) clearInterval(adsInterval);
    };
  }, [productsTotalSlides, adsTotalSlides]);

  // Reset current index when slides change to prevent index out of bounds
  useEffect(() => {
    if (productsCurrentIndex >= productsTotalSlides && productsTotalSlides > 0) {
      setProductsCurrentIndex(0);
    }
  }, [productsTotalSlides, productsCurrentIndex]);

  useEffect(() => {
    if (adsCurrentIndex >= adsTotalSlides && adsTotalSlides > 0) {
      setAdsCurrentIndex(0);
    }
  }, [adsTotalSlides, adsCurrentIndex]);

  // Match right slider height to left container on desktop/laptop
  useEffect(() => {
    const syncHeights = () => {
      if (!leftRef.current || !rightRef.current) return;
      const isStacked = window.matchMedia('(max-width: 992px)').matches;
      if (isStacked) {
        setRightHeight('auto');
        return;
      }
      const leftHeight = leftRef.current.getBoundingClientRect().height;
      setRightHeight(`${Math.round(leftHeight)}px`);
    };

    syncHeights();
    const resize = () => syncHeights();
    window.addEventListener('resize', resize);
    const id = setInterval(syncHeights, 500); // also sync during async image loads
    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(id);
    };
  }, [productsCurrentIndex, adsCurrentIndex]);

  return (
    <MainContainer>
      {/* Left Side Container */}
      <ToastContainer position="top-right" autoClose={3000} />
      <LeftSideContainer ref={leftRef}>
        {/* Search Section */}
        <SearchSection>
          <ContentWrapper>
            <Heading>
              Search for any Business, any service in <Highlight>India</Highlight>
            </Heading>
            <SearchContainer>
              <LocationInput>
                <Icon>
                  <FaMapMarkerAlt />
                </Icon>
                <StyledInput style={{border:"none",   outline:"none"}} type="text"  placeholder={userLocation} value={userLocation}   onChange={handleLocationChange} />
              </LocationInput>
              <InputGroup>
                <StyledInput type="text" placeholder="Hotels, Shops, Restaurants,"   value={category}
  onChange={handleCategoryChange}
  onKeyDown={handleCategoryKeyPress} style={{border:"none",   outline:"none"}}/>
                <Icon>
                  <FaMicrophone onClick={handleCategorySearch} />
                </Icon>
                <SearchButton>
                  <FaSearch />
                </SearchButton>
              </InputGroup>
            </SearchContainer>
            <Tagline>
              Affordable Ads, Big Results! Grow Your Local Clientele with{' '}
              <TaglineHighlight>My Town Service.</TaglineHighlight>
            </Tagline>
          </ContentWrapper>
        </SearchSection>

        {/* Products & Services Section */}
        <ProductsServicesWrapper>
          <SectionTitle>Products & Services</SectionTitle>
          <SliderWrapper>
            <SliderContent $currentIndex={productsCurrentIndex}>
              {productSlides.map((slide, idx) => (
                <Slide key={slide.id}>
                  <img src={slide.image} alt={`Slide ${slide.id}`} />
                  {/* {isAdmin && (
                  <button
                    style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 8px', cursor: 'pointer' }}
                    onClick={() => deleteProductSlide(slide.id)}
                  >
                    Delete
                  </button>
                  )} */}
                </Slide>
              ))}

              {/* {isAdmin && (
              <Slide key="add-product-slide">
                 <div style={{
        height: '200px',
        overflowY: 'auto' 
    }}>
        <h3 style={{ color: '#007bff', marginBottom: '15px' , textAlign:"center"}}>Create New Ad</h3>
        <form onSubmit={handleNewProdSubmit} className='form-submit' style={{}}>
            
          <div className='form-group'>
            <label style={{ fontWeight: 600 }}>Image (File Upload)</label>
            <input type="file" name="imageFile" onChange={handleNewProdChange}  />
            </div>
           
            <div className='form-group'>
            <label style={{ fontWeight: 600 }}>Ad Title*</label>
            <input type="text" name="title" value={newProdFormData.title} onChange={handleNewProdChange}  />
            
            </div>
        

             <div className='form-group'>
            <label style={{ fontWeight: 600 }}>Location (City)*</label>
            <input type="text" name="city" value={newProdFormData.city} onChange={handleNewProdChange}  />
            </div>
        

             <div className='form-group'>
            <label style={{ fontWeight: 600 }}>Description</label>
            <input type="text" name="description" value={newProdFormData.description} onChange={handleNewProdChange}  />
            </div>

                 <div className='form-group'>
            <label style={{ fontWeight: 600 }}>Type</label>
            <input type="text" name="sliderType" value="Featured" onChange={handleNewProdChange}  />
            </div>


            
      
            <button className='btn'  style={{border:"none", justifyContent:"center"}}  type="submit"  >
                Submit Ad
            </button>
        </form>
    </div>
         
              </Slide>
              )} */}
            </SliderContent>


            {productsTotalSlides > 1 && (
              <>
                <PrevButton onClick={productsGoToPrev}>
                  <FaChevronLeft />
                </PrevButton>
                <NextButton onClick={productsGoToNext}>
                  <FaChevronRight />
                </NextButton>
              </>
            )}
          </SliderWrapper>
          {productsTotalSlides > 1 && (
            <DotsContainer>
              {Array.from({ length: productsTotalSlides }).map((_, index) => (
                <Dot
                  key={index}
                  $active={index === productsCurrentIndex}
                  onClick={() => productsGoToSlide(index)}
                />
              ))}
            </DotsContainer>
          )}
        </ProductsServicesWrapper>
      </LeftSideContainer>
      
      {/* Right Side Slider */}
       {loading ? (
             // Show a loading placeholder while fetching ads
             <RightSliderWrapper style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: rightHeight }}>
                 <p>Loading Advertisements...</p>
             </RightSliderWrapper>
        ) : (
      <RightSliderWrapper ref={rightRef} style={{ height: rightHeight }}>
        <AdsSliderContent $currentIndex={adsCurrentIndex}>
          {adsSlides.map((slide, idx) => (
            <AdsSlide key={slide.id}>
              <AdsSlideImage src={slide.image} alt={slide.title} />
              {/* {isAdmin && (
              <button
                  style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 8px', cursor: 'pointer', zIndex: 2 }}
                  onClick={() => deleteAdSlide(idx)}
                >
                  Delete
                </button>

                )} */}
            


              
              {/* <AdsSlideContent>
                <AdsSlideTitle>{slide.title}</AdsSlideTitle>
                <AdsSlideDescription>{slide.description}</AdsSlideDescription>
                <AdsSlideButton>{slide.buttonText}</AdsSlideButton>
              </AdsSlideContent> */}
            </AdsSlide> 
          ))}

{/* {isAdmin &&(
<AdsSlide key="add-ad-form" style={{padding:10}}>
    <div style={{
     
        overflowY: 'auto' 
    }}>
        <h3 style={{ color: '#007bff', marginBottom: '15px' , textAlign:"center"}}>Create New Ad</h3>
        <form onSubmit={handleNewAdSubmit} className='form-submit' style={{}}>
            
          <div className='form-group'>
            <label style={{ fontWeight: 600 }}>Image (File Upload)</label>
            <input type="file" name="imageFile" onChange={handleNewAdChange}  />
            </div>
           
            <div className='form-group'>
            <label style={{ fontWeight: 600 }}>Ad Title*</label>
            <input type="text" name="title" value={newAdFormData.title} onChange={handleNewAdChange}  />
            
            </div>
       

             <div className='form-group'>
            <label style={{ fontWeight: 600 }}>Location (City)*</label>
            <input type="text" name="city" value={newAdFormData.city} onChange={handleNewAdChange}  />
            </div>
   

             <div className='form-group'>
            <label style={{ fontWeight: 600 }}>Description</label>
            <input type="text" name="description" value={newAdFormData.description} onChange={handleNewAdChange}  />
            </div>


             <div className='form-group'>
            <label style={{ fontWeight: 600 }}>Button Text</label>
            <input type="text" name="buttonText" value={newAdFormData.buttonText} onChange={handleNewAdChange}  />
            </div>
            

            <button className='btn'  style={{border:"none", justifyContent:"center"}}    type="submit"  >
                Submit Ad
            </button>
        </form>
    </div>
</AdsSlide>
)} */}
        </AdsSliderContent>

        {adsTotalSlides > 1 && (
          <>
            <AdsPrevButton onClick={adsGoToPrev}>
              <FaChevronLeft />
            </AdsPrevButton>
            <AdsNextButton onClick={adsGoToNext}>
              <FaChevronRight />
            </AdsNextButton>
          </>
        )}
        
        {adsTotalSlides > 1 && (
          <AdsDotsContainer>
            {Array.from({ length: adsTotalSlides }).map((_, index) => (
              <AdsDot
                key={index}
                $active={index === adsCurrentIndex}
                onClick={() => adsGoToSlide(index)}
              />
            ))}
          </AdsDotsContainer>
        )}
      </RightSliderWrapper>
        )}
    </MainContainer>
  );
};

export default HeroWithSliders;
