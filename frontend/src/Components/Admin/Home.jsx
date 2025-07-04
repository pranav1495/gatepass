import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuButton from '../Admin/MenuButton';
import Sidebar from '../Admin/Sidebar';
import './Home.css';
import { IoIosLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const INACTIVITY_TIMEOUT = 300000;

export const Home = ({ userName, profilePhoto }) => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [isWorkingDay, setIsWorkingDay] = useState(true);
  const [nonWorkingReason, setNonWorkingReason] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userStatus, setUserStatus] = useState('active');

  const navigate = useNavigate();

  useEffect(() => {
    const getDateInfo = () => {
      const date = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    };

    const getTimeInfo = () => {
      const date = new Date();
      return date.toLocaleTimeString();
    };

    const checkWorkingDay = () => {
      const date = new Date();
      const day = date.getDay();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const time = hour * 60 + minutes;
      const publicHolidays = [
        '2024-01-01', '2024-01-02', '2024-01-26', '2024-03-08',
        '2024-03-29', '2024-03-31', '2024-04-14', '2024-05-01',
        '2024-06-17', '2024-08-15', '2024-09-14', '2024-09-15',
        '2024-09-16', '2024-10-02', '2024-10-31', '2024-12-25'
      ];
      const today = date.toISOString().split('T')[0];

      if (day === 0 || day === 6) {
        setIsWorkingDay(false);
        setNonWorkingReason('It is a weekend.');
      } else if (publicHolidays.includes(today)) {
        setIsWorkingDay(false);
        setNonWorkingReason('It is a public holiday.');
      } else if (time < 510 || time >= 960) {
        setIsWorkingDay(false);
      } else {
        setIsWorkingDay(true);
      }
    };

    setCurrentDate(getDateInfo());
    setCurrentTime(getTimeInfo());
    checkWorkingDay();

    const interval = setInterval(() => {
      setCurrentTime(getTimeInfo());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleActivity = () => {
      setUserStatus('active');
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => setUserStatus('inactive'), INACTIVITY_TIMEOUT);
    };

    let inactivityTimer = setTimeout(() => setUserStatus('inactive'), INACTIVITY_TIMEOUT);

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    const newLogout = { userName, date: new Date().toString() };
    const storedLogoutHistory = JSON.parse(localStorage.getItem('logoutHistory')) || [];
    const updatedLogoutHistory = [...storedLogoutHistory, newLogout];
    localStorage.setItem('logoutHistory', JSON.stringify(updatedLogoutHistory));

    setUserStatus('offline');
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };


  return (
    <>
      <div className="menu-button-container">
        <MenuButton onClick={toggleSidebar} />
      </div>
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      <div className="date-info">
        <h3>Today is {currentDate}</h3>
        {isWorkingDay ? (
          <div className="sign opened">
            <span>Opened</span>
          </div>
        ) : (
          <div className="sign closed">
            <span><b>Closed!</b></span>
            <p><strong>{nonWorkingReason}</strong></p>
          </div>
        )}
      </div>
      <div className="header">
        <h2><FaUser /> {userName}'s Dashboard</h2>
        <div className="profile-logout-container">
          <div className="profile-icon" onClick={handleProfileClick}>
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profile" className="profile-photo" />
            ) : (
              <div className="default-profile-photo" />
            )}
            <span className={`status-dot ${userStatus}`}></span>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout <IoIosLogOut />
          </button>
        </div>
      </div>
      <div className="home-container">
        <form className="form-group55">
          <p>{userName} logged in at {currentTime} on {currentDate}</p>
        </form>
      </div>
    </>
  );
};
