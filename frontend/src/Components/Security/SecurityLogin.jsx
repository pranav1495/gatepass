import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import './SecurityLogin.css';

export const SecurityLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [passwordMismatchError, setPasswordMismatchError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    // Function to log security actions
    const logAction = async (actionType) => {
        try {
            await axios.post('http://localhost:8080/security/action-log', {
                email,
                action: actionType,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            console.error('Failed to log action:', error);
        }
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        if (isSignup) {
            await handleSignup();
        } else {
            await handleLogin();
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/login', { email, password });
            const { visitorList } = response.data;
            logAction('Login');
            navigate('/home/security/login/visitor/list', { state: { visitorList } });
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Login failed. Please check your credentials.');
        }
    };
    
    
    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setPasswordMismatchError(true);
            return;
        }
    
        setPasswordMismatchError(false);
    
        try {
            // Signup user and initialize empty visitor list
            await axios.post('http://localhost:8080/signup/add', { 
                email, 
                password,
                visitorList: [] // Initialize empty visitor list
            });
            alert("Signup was successful!");
        } catch (error) {
            console.error('Signup failed:', error);
            setErrorMessage('Signup failed. Please try again.');
        }
    };    

    const switchMode = () => {
        setIsSignup(!isSignup);
        setErrorMessage(null);
    };

    const handleBookings = () => {
        logAction('Booking');
        navigate('/home/ReservationTicket');
    };

    return (
        <div className="App1">
            <button onClick={handleBookings} className="booking-button">Bookings</button>
            <div className="form-container767">
                <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
                <form onSubmit={handleAuth}>
                    <div className="form-group">
                        <label htmlFor="email"><FaUser /> Email</label>
                        <div className="input-group">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                placeholder='Enter email'
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"><FaLock /> Password</label>
                        <div className="input-group">
                            <input
                                type='password'
                                id="password"
                                value={password}
                                placeholder='Enter password'
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                required
                                pattern=".{1,}"
                                title="Password must be at least 1 character long."
                            />
                        </div>
                    </div>
                    {isSignup && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword"><FaLock /> Confirm Password</label>
                            <div className="input-group">
                                <input
                                    type='password'
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    placeholder='Confirm password'
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                    )}
                    {passwordMismatchError && (
                        <div className="alert alert-danger" role="alert">
                            Passwords do not match
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <div className="button-container">
                        <button type="submit" className="btn btn-primary">
                            {isSignup ? 'Sign Up' : 'Login'}
                        </button>
                        <button type="button" onClick={switchMode} className="btn btn-secondary">
                            {isSignup ? 'Return to Login' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
