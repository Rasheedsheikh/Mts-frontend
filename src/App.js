// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/reset.css';

import Header from './layout/header/Header'; // Ensure path is correct
import Footer from './layout/footer/Footer'; // Ensure path is correct

// Import all your page components
import HomePage from './components/homePageMain/HomePage';
import RegisterLanding from './components/auth/register/RegisterLanding';
import Signup from './components/auth/register/Signup';
import Login from './components/auth/login/Login'; // Assuming this is your login component
import ForgotPassword from './components/auth/forgotPassword/ForgotPassword';
import EmailConfirm from './components/auth/emailConfirm/EmailConfirm';
import UpdatePassword from './components/auth/updatePassword/UpdatePassowrd';
import MerchantRegistration from './components/merchantRegistration/MerchantRegistration';
import ServicesListing from './components/servicesListing/ServicesListing';
import PopularServices from './components/homepageComponents/popularServices/PopularServices';
import MerchantRegistration2 from './components/merchantRegistration2/MerchantRegistration2';
import PaymentGateway from './components/registrations/payments/PaymentGateway';
import Vendorstep1 from './components/registrations/vendor/vendorstep1/vendorstep1';
import AllServices from './components/allServices/AllServices';
import QuickBooking1 from './components/registrations/quickBooking/QuickBooking1';
import QuickBooking2 from './components/registrations/quickBooking/QuickBooking2';
import Advertise from './components/registrations/advertise/Advertise';
import DigitalPlatform from './components/registrations/digitalPlatform/DigitalPlatform';
// import PaymentGateway2 from './components/registrations/payments/paymentGateway2';



// A component that wraps all pages that need the header and footer
const MainLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout.Content style={{ paddingTop: '64px' }}>
        <div className="site-layout-content" style={{ background: '#fff', minHeight: 280 }}>
          {children}
        </div>
      </Layout.Content>
      <Footer />
    </Layout>
  );
};

// Main App component with conditional rendering logic
// Ensures each navigation starts at the top of the page
function ScrollToTopOnRouteChange() {
  const location = useLocation();
  React.useEffect(() => {
    // instant jump to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname, location.search, location.hash]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const noHeaderFooterPaths = ['/login', '/forgotPassword','/updatePassword', '/verifyEmail'];
  const showHeaderFooter = !noHeaderFooterPaths.includes(location.pathname);

  return (
    <React.Fragment>
      <ScrollToTopOnRouteChange />
      {showHeaderFooter && <Header />}
      <Layout.Content style={{ paddingTop: showHeaderFooter ? '64px' : '0' }}>
        <div className="site-layout-content" style={{ background: '#fff', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterLanding />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotPassword" element={<ForgotPassword/>} />
            <Route path="/verifyEmail" element={<EmailConfirm/>} />
            <Route path='/updatePassword' element={<UpdatePassword/>}/>
             <Route path='/merchantRegistration' element={<MerchantRegistration/>}/>
             <Route path='/merchantRegistration2' element={<MerchantRegistration2/>}/>
               <Route path='/payment' element={<PaymentGateway/>}/>
                   <Route path='/vendorStep1' element={<Vendorstep1/>}/>
                   <Route path='/digitalMarketing' element={<DigitalPlatform/>}/>
                   {/* <Route path='/payment2' element={<PaymentGateway2/>}/> */}
                  <Route path='/listAll' element={<AllServices/>}/>
             <Route path='/serviceListing' element={<ServicesListing/>}/>
             <Route path='/pop' element={<PopularServices/>}/>
             <Route path='quickBooking' element={<QuickBooking1/>}/>
                     <Route path='quickBooking2' element={<QuickBooking2/>}/>
                       <Route path='advertise' element={<Advertise/>}/>
            
            {/* Pages with no Header/Footer */}
            {/* <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/create-new-password" element={<CreateNewPassword />} /> */}
            {/* <Route path="/merchantRegistration" element={<MerchantRegistration />} />
            <Route path="/merchantRegistration2" element={<MerchantRegistrationPart2 />} />
            <Route path="/payment" element={<PaymentGateway />} /> */}
            {/* Add other pages here */}
          </Routes>
        </div>
      </Layout.Content>
      {showHeaderFooter && <Footer />}
    </React.Fragment>
  );
}

function App() {
  return (
<BrowserRouter>
      <AppContent />
</BrowserRouter>
  );
}

export default App;