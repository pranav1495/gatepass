import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Settings from './Components/Settings/Settings';

const ParentComponent = () => {

  const clearLoginHistory = () => {
    localStorage.removeItem('loginHistory');
  };

  const clearLogoutHistory = () => {
    localStorage.removeItem('logoutHistory');
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/settings"
          element={<Settings 
            clearLoginHistory={clearLoginHistory}
            clearLogoutHistory={clearLogoutHistory}
            setProfilePhoto={handleProfilePhotoChange}
          />} 
        />
      </Routes>
    </Router>
  );
};

export default ParentComponent;
