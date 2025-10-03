import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaMicrophone, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
  object-fit: cover;
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
const productsSlides = [
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

const adsSlides = [
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
    title: 'Quick Booking',
    description: 'Book top services instantly. No hassle, no waiting.',
    buttonText: 'Book Now'
  },
];

// --- Combined Component ---
const HeroWithSliders = () => {
  // State for location
  const [userLocation, setUserLocation] = useState('Detecting location...');
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [rightHeight, setRightHeight] = useState('auto');
  
  // State and logic for Products & Services Slider
  const [productsCurrentIndex, setProductsCurrentIndex] = useState(0);
  const productsGoToPrev = () => {
    setProductsCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : productsSlides.length - 1));
  };
  const productsGoToNext = () => {
    setProductsCurrentIndex(prevIndex => (prevIndex < productsSlides.length - 1 ? prevIndex + 1 : 0));
  };
  const productsGoToSlide = (index) => {
    setProductsCurrentIndex(index);
  };

  // State and logic for Ads Slider
  const [adsCurrentIndex, setAdsCurrentIndex] = useState(0);
  const adsGoToPrev = () => {
    setAdsCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : adsSlides.length - 1));
  };
  const adsGoToNext = () => {
    setAdsCurrentIndex(prevIndex => (prevIndex < adsSlides.length - 1 ? prevIndex + 1 : 0));
  };
  const adsGoToSlide = (index) => {
    setAdsCurrentIndex(index);
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

  // Auto-slide functionality
  useEffect(() => {
    getUserLocation();
    
    // Auto-slide for products slider
    const productsInterval = setInterval(() => {
      setProductsCurrentIndex(prevIndex => 
        prevIndex < productsSlides.length - 1 ? prevIndex + 1 : 0
      );
    }, 3000);

    // Auto-slide for ads slider
    const adsInterval = setInterval(() => {
      setAdsCurrentIndex(prevIndex => 
        prevIndex < adsSlides.length - 1 ? prevIndex + 1 : 0
      );
    }, 3000);

    return () => {
      clearInterval(productsInterval);
      clearInterval(adsInterval);
    };
  }, []);

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
      <LeftSideContainer ref={leftRef}>
        {/* Search Section */}
        <SearchSection>
          <ContentWrapper>
            <Heading>
              Search for anything, anywhere in <Highlight>India</Highlight>
            </Heading>
            <SearchContainer>
              <LocationInput>
                <Icon>
                  <FaMapMarkerAlt />
                </Icon>
                <StyledInput type="text" placeholder={userLocation} value={userLocation} readOnly />
              </LocationInput>
              <InputGroup>
                <StyledInput type="text" placeholder="Search anything" />
                <Icon>
                  <FaMicrophone />
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
              {productsSlides.map(slide => (
                <Slide key={slide.id}>
                  {slide.id === 1 ? (
                    <img src='https://www.conradpune.com/wp-content/uploads/elementor/thumbs/1-8-pswvh5j9lcihi56uuj9gun5ioocukcetkfh2rb2t1s.png' alt={`Slide ${slide.id}`} />
                  ) : (
                    <img src={slide.image} alt={`Slide ${slide.id}`} />
                  )}
                </Slide>
              ))}
            </SliderContent>

            <PrevButton onClick={productsGoToPrev}>
              <FaChevronLeft />
            </PrevButton>
            <NextButton onClick={productsGoToNext}>
              <FaChevronRight />
            </NextButton>
          </SliderWrapper>
          <DotsContainer>
            {productsSlides.map((_, index) => (
              <Dot
                key={index}
                $active={index === productsCurrentIndex}
                onClick={() => productsGoToSlide(index)}
              />
            ))}
          </DotsContainer>
        </ProductsServicesWrapper>
      </LeftSideContainer>
      
      {/* Right Side Slider */}
      <RightSliderWrapper ref={rightRef} style={{ height: rightHeight }}>
        <AdsSliderContent $currentIndex={adsCurrentIndex}>
          {adsSlides.map(slide => (
            <AdsSlide key={slide.id}>
              <AdsSlideImage src={slide.image} alt={slide.title} />
              <AdsSlideContent>
                <AdsSlideTitle>{slide.title}</AdsSlideTitle>
                <AdsSlideDescription>{slide.description}</AdsSlideDescription>
                <AdsSlideButton>{slide.buttonText}</AdsSlideButton>
              </AdsSlideContent>
            </AdsSlide>
          ))}
        </AdsSliderContent>

        <AdsPrevButton onClick={adsGoToPrev}>
          <FaChevronLeft />
        </AdsPrevButton>
        <AdsNextButton onClick={adsGoToNext}>
          <FaChevronRight />
        </AdsNextButton>
        
        <AdsDotsContainer>
          {adsSlides.map((_, index) => (
            <AdsDot
              key={index}
              $active={index === adsCurrentIndex}
              onClick={() => adsGoToSlide(index)}
            />
          ))}
        </AdsDotsContainer>
      </RightSliderWrapper>
    </MainContainer>
  );
};

export default HeroWithSliders;
