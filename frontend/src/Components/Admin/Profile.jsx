import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaCamera, FaSave } from "react-icons/fa";
import './Profile.css';

const Profile = ({ userName, setUserName, setProfilePhoto }) => {
  const [newUserName, setNewUserName] = useState(userName);
  const [profilePhotoLocal, setProfilePhotoLocal] = useState(localStorage.getItem('profilePhoto') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [phone, setPhone] = useState(localStorage.getItem('phone') || '');
  const [homeTown, setHomeTown] = useState(localStorage.getItem('homeTown') || '');
  const [state, setState] = useState(localStorage.getItem('state') || '');
  const [country, setCountry] = useState(localStorage.getItem('country') || '');
  const [photoLoading, setPhotoLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedPhoto = localStorage.getItem('profilePhoto');
    const savedEmail = localStorage.getItem('email');
    const savedPhone = localStorage.getItem('phone');
    const savedHomeTown = localStorage.getItem('homeTown');
    const savedState = localStorage.getItem('state');
    const savedCountry = localStorage.getItem('country');

    if (savedPhoto) {
      setProfilePhotoLocal(savedPhoto);
    }
    if (savedEmail) {
      setEmail(savedEmail);
    }
    if (savedPhone) {
      setPhone(savedPhone);
    }
    if (savedHomeTown) {
      setHomeTown(savedHomeTown);
    }
    if (savedState) {
      setState(savedState);
    }
    if (savedCountry) {
      setCountry(savedCountry);
    }
  }, []);

  const handleNameChange = (e) => {
    setNewUserName(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    setPhotoLoading(true);

    reader.onloadend = () => {
      setProfilePhotoLocal(reader.result);
      setPhotoLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value;
    // Regex to allow only digits
    const isValidPhone = /^[0-9]{10}$/.test(inputPhone);

    if (!isValidPhone) {
      setPhoneError('Phone number must be exactly 10 digits');
    } else {
      setPhoneError('');
    }

    setPhone(inputPhone);
  };

  const handleHomeTownChange = (e) => {
    setHomeTown(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final phone validation check before submission
    if (phone.length !== 10) {
      setPhoneError('Phone number must be exactly 10 digits');
      return;  // Prevent form submission if phone number is invalid
    }

    setUserName(newUserName);
    setProfilePhoto(profilePhotoLocal);
    localStorage.setItem('profilePhoto', profilePhotoLocal);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);
    localStorage.setItem('homeTown', homeTown);
    localStorage.setItem('state', state);
    localStorage.setItem('country', country);

    alert('Profile updated successfully!'); 
  };

  const handleBack = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-photo-section">
            <h2>Update Photo <FaCamera />  </h2>
            <div className={`profile-photo-preview ${photoLoading ? 'blur-background' : ''}`}>
              {profilePhotoLocal && (
                <img src={profilePhotoLocal} alt="Profile" className="profile-photo-img" />
              )}
            </div>
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="profile-photo-input" />
          </div>
          <div className="profile-header">
            <h1>{userName}'s Profile</h1>
            <h2>Edit <FaUserEdit /></h2>
          </div>
          <label className="profile-label">
            <span>New Name:</span>
            <input 
              type="text" 
              value={newUserName} 
              onChange={handleNameChange} 
              placeholder="Enter new name" 
              className="profile-input"
            />
          </label>
          <label className="profile-label">
            <span>Email:</span>
            <input 
              type="email" 
              value={email} 
              onChange={handleEmailChange} 
              placeholder="Enter email" 
              className="profile-input"
            />
          </label>
          <label className="profile-label">
            <span>Phone:</span>
            <input 
              type="tel" 
              value={phone} 
              onChange={handlePhoneChange} 
              placeholder="Enter phone number" 
              className="profile-input"
            />
            {phoneError && <p className="error-text">{phoneError}</p>}
          </label>
          <label className="profile-label">
            <span>Home Town:</span>
            <input 
              type="text" 
              value={homeTown} 
              onChange={handleHomeTownChange} 
              placeholder="Enter home town" 
              className="profile-input"
            />
          </label>
          <label className="profile-label">
            <span>State:</span>
            <input 
              type="text" 
              value={state} 
              onChange={handleStateChange} 
              placeholder="Enter state" 
              className="profile-input"
            />
          </label>
          <label className="profile-label">
            <span>Country:</span>
            <input 
              type="text" 
              value={country} 
              onChange={handleCountryChange} 
              placeholder="Enter country" 
              className="profile-input"
            />
          </label>
          <div className="button-group">
            <button type="submit" className="save-button"><FaSave /> Save Changes</button>
            <button type="button" className="back-button777" onClick={handleBack}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
