import React from 'react';
import styled from 'styled-components'; // Using styled-components for CSS-in-JS
import { FaMapMarkerAlt, FaMicrophone, FaSearch } from 'react-icons/fa'; // For icons
import FirstComponent from "../../../assets/Group (2).png"

// Assuming you have an SVG or image for the illustration,
// or you can embed it directly if it's simple.
// For this example, I'll use a placeholder or assume it's an external asset.
// import Illustration from './illustration.svg'; // Make sure to replace with your actual illustration path

const HeroSection = styled.section`
   
  padding: 40px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 40px; /* Space between text/search and illustration */

  @media (max-width: 992px) {
    flex-direction: column; /* Stack on smaller screens */
    text-align: center;
    padding: 30px 15px;
    gap: 30px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align text to start */
  max-width: 800px; /* Limit content width */
  width: 100%;

  @media (max-width: 992px) {
    align-items: center; /* Center align on smaller screens */
  }
`;

const Heading = styled.h1`
  font-family: Epilogue;
font-weight: 700;
font-style: Bold;
font-size: 24px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;


  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.7rem;
  }
`;

const Highlight = styled.span`
  color: #007bff; /* Blue color for "India" */
  font-weight: bold;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack search inputs on smaller screens */
    gap: 10px;
  }
`;

const InputGroup = styled.div`
  flex: 1; /* Distribute space evenly */
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #E5F2FF;
`;

const LocationInput = styled(InputGroup)`
  background-color: #E5F2FF; // Changed background color
`;

const Icon = styled.span`
  color: #888;
  margin-right: 10px;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  flex-grow: 1;
  font-size: 1rem;
  background-color: #E5F2FF;
  background: transparent; /* Ensure input background matches parent */

  &::placeholder {
    color: #aaa;
  }
`;

const SearchButton = styled.button`
  background-color: #007bff; /* Blue search button */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    width: 100%; /* Full width button on smaller screens */
    padding: 12px 15px;
  }
`;

const Tagline = styled.p`
font-family: Work Sans;
font-weight: 600;
font-style: SemiBold;
font-size: 16px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;


  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TaglineHighlight = styled.span`
  color: #007bff;
  font-weight: bold;
  cursor: pointer; /* Indicate it's clickable */

  &:hover {
    text-decoration: underline;
  }
`;

const IllustrationWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
    display: block; /* Remove extra space below image */
  }

  @media (max-width: 992px) {
    max-width: 400px; /* Adjust size on smaller screens */
  }
`;

const HeroComponent = () => {
  return (
   
    <HeroSection>
      <ContentWrapper>
        <Heading>
      Search for any Business, any service in <Highlight>India</Highlight>
        </Heading>
        <SearchContainer>
          <LocationInput>
            <Icon>
              <FaMapMarkerAlt />
            </Icon>
            <StyledInput type="text" placeholder="Hyderabad" />
          </LocationInput>
          <InputGroup>
            <StyledInput type="text" placeholder="Search anything" style={{border:"none",   outline:"none"}} />
            <Icon>
              <FaMicrophone />
            </Icon>
            <SearchButton>
              <FaSearch />
            </SearchButton>
          </InputGroup>
        </SearchContainer>
        <Tagline>
          Affordables     Adds, Big Results! Grow Your Local Clientele with{' '}
          <TaglineHighlight>My Town Service.</TaglineHighlight>
        </Tagline>
      </ContentWrapper>
      <IllustrationWrapper>
        {/* Replace with your actual illustration component or image tag */}
        <img src={FirstComponent} alt="Local market illustration" />
      </IllustrationWrapper>
    </HeroSection>
  );
};

export default HeroComponent;