import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // Check if user is logged in and has admin role
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If not admin, show unauthorized message
  if (userRole?.toLowerCase() !== 'admin') {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px'
        }}>
          <h1 style={{ color: '#e74c3c', marginBottom: '20px' }}>🚫 Access Denied</h1>
          <p style={{ fontSize: '18px', marginBottom: '20px', color: '#333' }}>
            You don't have permission to access the admin dashboard.
          </p>
          <p style={{ color: '#666', marginBottom: '30px' }}>
            Only administrators can access this page.
          </p>
          <button 
            onClick={() => window.history.back()}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // If user is admin, render the protected component
  return children;
};

export default AdminRoute;
