import React, { useState } from 'react';
import { Layout, Menu, Button, Dropdown, Space, Drawer } from 'antd';
import { MenuOutlined, GlobalOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import './Header.css';
import mtsLogo from "../../assets/Frame 427318348.png"

// const { Header } = Layout;

const Header = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

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

  return (
    // No need for a wrapping Layout here, as it will be used in App.js
    <div className="app-header">
      <div className="logo-container">
        <Link to="/">
          <img src={mtsLogo} alt="MTS INDIA Logo" className="logo" />
        </Link>
      </div>

      <Menu mode="horizontal" defaultSelectedKeys={['home']} className="header-menu desktop-only">
        {renderMenuItem('home', 'Home', '/')}
        {renderMenuItem('quick-booking', 'Quick Booking', '/quickBooking')}
        {/* {renderMenuItem('free-listing', 'Free Listing', '/free-listing')} */}
        {renderMenuItem('advertise', 'Advertise', '/advertise')}

        <Menu.Item key="language">
          <Dropdown overlay={languageMenu} placement="bottomRight">
            <a onClick={e => e.preventDefault()} className="ant-dropdown-link">
              <Space>
                <GlobalOutlined /> EN
              </Space>
            </a>
          </Dropdown>
        </Menu.Item>
      </Menu>

      <div className="header-actions desktop-only">
        <Button type="primary" className="login-button" onClick={handleLoginClick}>Login</Button>
        <Button className="register-button" onClick={handleRegisterClick}>Register</Button>
      </div>

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
          {renderMenuItem('quick-booking', 'Quick Booking', '/quick-booking')}
          {renderMenuItem('free-listing', 'Free Listing', '/free-listing')}
          {renderMenuItem('advertise', 'Advertise', '/advertise')}

          <Menu.Item key="language-mobile">
            <Dropdown overlay={languageMenu} placement="bottomLeft">
              <a onClick={e => e.preventDefault()} className="ant-dropdown-link">
                <Space>
                  <GlobalOutlined /> EN
                </Space>
              </a>
            </Dropdown>
          </Menu.Item>
          <Menu.Item key="login-mobile">
            <Button type="primary" block className="login-button" onClick={handleLoginClick}>Login</Button>
          </Menu.Item>
          <Menu.Item key="register-mobile">
            <Button block className="register-button" onClick={handleRegisterClick}>Register</Button>
          </Menu.Item>
        </Menu>
      </Drawer>
    </div>
    
  );
};

export default Header;