import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [showCookieNotice, setShowCookieNotice] = useState(true);
    const [isWorkingDay, setIsWorkingDay] = useState(true);
    const [nonWorkingReason, setNonWorkingReason] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/main', { username, password });
            console.log(response.data);
            const newLogin = { userName: username, date: new Date().toString() };
            const storedLoginHistory = JSON.parse(localStorage.getItem('loginHistory')) || [];
            const updatedLoginHistory = [...storedLoginHistory, newLogin];
            localStorage.setItem('loginHistory', JSON.stringify(updatedLoginHistory));

            navigate('/admin');
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Login failed. Please check your credentials.');
        }
    };

    const handleCookieAccept = () => {
        setShowCookieNotice(false);
        localStorage.setItem('cookieNoticeAccepted', 'true');
    };

    useEffect(() => {
    }, []);

    useEffect(() => {
        if (localStorage.getItem('cookieNoticeAccepted') === 'true') {
            setShowCookieNotice(false);
            };
        
        const getDateInfo = () => {
          const date = new Date();
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          return date.toLocaleDateString(undefined, options);
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
        checkWorkingDay();
      }, []);
    

    return (
        <div className='wrapper'>
            <form onSubmit={handleLogin}>
                <h1><b>Admin Login</b></h1>
                <div className='input-box'>
                    <FaUser />
                    <input 
                        type='text' 
                        placeholder='Username' 
                        required 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className='input-box'>
                    <FaLock />
                    <input 
                        type='password' 
                        placeholder='Password' 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                <button type='submit'>Login</button>
            </form>
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
      <div className='cooks'>
         {showCookieNotice && (
            <div className="cookie-notice">
                <p>Cookie Notice <br></br>We use necessary cookies to make our site work. We'd also like to set performance and targeting cookies to help us to make future improvements to the site. These will be set only if you accept. For more details about cookies and how they are used, refer to theCAE Cookie Policy.</p>
                <button onClick={handleCookieAccept}>Accept</button>
      </div>
      )}
    </div>
  </div>
    );
};
