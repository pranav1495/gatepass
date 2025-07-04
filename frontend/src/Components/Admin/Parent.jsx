import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';

const Parent = () => {
  const [userName, setUserName] = useState('User');
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('profilePhoto') || '');

  const handleProfilePhotoChange = (newPhoto) => {
    setProfilePhoto(newPhoto);
    localStorage.setItem('profilePhoto', newPhoto);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/"
          element={<Home 
            userName={userName} 
            profilePhoto={profilePhoto} 
          />} 
        />
        <Route 
          path="/profile"
          element={<Profile 
            userName={userName}
            setUserName={setUserName} // Pass setUserName to Profile
            setProfilePhoto={handleProfilePhotoChange}
          />} 
        />
      </Routes>
    </Router>
  );
};

export default Parent;
