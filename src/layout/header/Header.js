import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Dropdown, Space, Drawer } from 'antd';
import { MenuOutlined, GlobalOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import mtsLogo from "../../assets/IMG-20250710-WA0000 1 (1).png";

const Header = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ✅ Check login state when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  // ✅ Update login state when localStorage changes (for other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const showDrawer = () => setDrawerVisible(true);
  const onCloseDrawer = () => setDrawerVisible(false);

  const languageMenu = (
    <Menu>
      <Menu.Item key="en">English</Menu.Item>
      <Menu.Item key="es">Spanish</Menu.Item>
      <Menu.Item key="fr">French</Menu.Item>
    </Menu>
  );

  const renderMenuItem = (key, text, path) => (
    <Menu.Item key={key}>
      <Link to={path} onClick={onCloseDrawer}>
        {text}
      </Link>
    </Menu.Item>
  );

  const handleLoginClick = () => {
    navigate('/login');
    onCloseDrawer();
  };

  const handleRegisterClick = () => {
    navigate('/register');
    onCloseDrawer();
  };

  const handleLogout = () => {
    // ✅ Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');

    // ✅ Update state + redirect
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="app-header">
      <div className="logo-container">
        <Link to="/">
          <img src={mtsLogo} alt="MTS INDIA Logo" className="logo" />
        </Link>
      </div>

      {/* ✅ Desktop Menu */}
      <Menu mode="horizontal" defaultSelectedKeys={['home']} className="header-menu desktop-only">
        {renderMenuItem('home', 'Home', '/')}
        {renderMenuItem('quick-booking', 'Free Booking', '/quickBooking')}
        {renderMenuItem('advertise', 'Advertise', '/advertise')}
        <Menu.Item key="language">
          <Dropdown overlay={languageMenu} placement="bottomRight">
            <a onClick={(e) => e.preventDefault()} className="ant-dropdown-link">
              <Space>
                <GlobalOutlined /> EN
              </Space>
            </a>
          </Dropdown>
        </Menu.Item>
      </Menu>

      {/* ✅ Desktop Actions */}
      <div className="header-actions desktop-only">
        {isLoggedIn ? (
          <div>
            <Button type="primary" className="logout-button" onClick={handleLogout}>
              Logout
            </Button>


            <Button className="register-button" onClick={handleRegisterClick}>
              Register
            </Button>
          </div>
        ) : (
          <>
            <Button type="primary" className="login-button" onClick={handleLoginClick}>
              Login
            </Button>
            <Button className="register-button" onClick={handleRegisterClick}>
              Register
            </Button>
          </>
        )}
      </div>

      {/* ✅ Mobile Menu Drawer */}
      <div className="mobile-only">
        <Button type="text" onClick={showDrawer} className="menu-button">
          <MenuOutlined />
        </Button>
      </div>

      <Drawer
        title="Navigation"
        placement="right"
        closable={true}
        onClose={onCloseDrawer}
        visible={drawerVisible}
        className="mobile-drawer"
      >
        <Menu mode="vertical" defaultSelectedKeys={['home']}>
          {renderMenuItem('home', 'Home', '/')}
          {renderMenuItem('quick-booking', 'Free Booking', '/quickBooking')}
          {renderMenuItem('advertise', 'Advertise', '/advertise')}

          <Menu.Item key="language-mobile">
            <Dropdown overlay={languageMenu} placement="bottomLeft">
              <a onClick={(e) => e.preventDefault()} className="ant-dropdown-link">
                <Space>
                  <GlobalOutlined /> EN
                </Space>
              </a>
            </Dropdown>
          </Menu.Item>

          {/* ✅ Dynamic Login/Logout for Mobile */}
          {isLoggedIn ? (
            <Menu.Item key="logout-mobile">
              <Button type="primary" block className="register-button" onClick={handleLogout}>
                Logout
              </Button>

              <Button block className="register-button" onClick={handleRegisterClick}>
                Register
              </Button>
            </Menu.Item>
          ) : (
            <>
              <Menu.Item key="login-mobile">
                <Button type="primary" block className="register-button" onClick={handleLoginClick}>
                  Login
                </Button>
              </Menu.Item>
              <Menu.Item key="register-mobile">
                <Button block className="register-button" onClick={handleRegisterClick}>
                  Register
                </Button>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Drawer>
    </div>
  );
};

export default Header;
