import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { SecurityLogin } from './Components/Security/SecurityLogin';
import { AddVisitor } from './Components/Security/AddVisitor';
import { VisitorList } from './Components/Security/VisitorList';
import LeaveForm from './Components/Student/LeaveForm';
import './App.css';
import AuthorityLogin from './Components/Authority/AuthorityLogin';
import { StudentDash } from './Components/Student/StudentDash';
import { AuthDash } from './Components/Authority/AuthDash';
import FacultyLogin from './Components/Authority/FacultyLogin';
import FacultyPanel from './Components/Authority/FacultyPanel';
import { ReservationTicket } from './Components/Security/ReservationTicket';
import ReservationHistory from './Components/Security/ReservationHistory';
import Profile from './Components/Admin/Profile';
import { FaHome } from "react-icons/fa";
import { VisitorDetails } from './Components/Security/VisitorDetails';
import Statement from './Components/Security/Statement';
import {Home } from './Components/Admin/Home';
import Student from './Components/Admin/Student';
import { LoginForm } from './Components/Admin/LoginForm';
import Feedback from './Components/CustomerSupport/Feedback';
import Contact from './Components/CustomerSupport/Contact';

const App = () => {
    const [userName, setUserName] = useState(localStorage.getItem('user') || 'User');
    const [nightMode, setNightMode] = useState(localStorage.getItem('nightMode') === 'true');
    const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('profilePhoto') || null);

    const toggleNightMode = () => {
        const newMode = !nightMode;
        setNightMode(newMode);
        localStorage.setItem('nightMode', newMode.toString());
    };

    const handleUserNameChange = (newUserName) => {
        setUserName(newUserName);
        localStorage.setItem('user', newUserName);
    };

    const handleProfilePhotoChange = (newProfilePhoto) => {
        setProfilePhoto(newProfilePhoto);
        localStorage.setItem('profilePhoto', newProfilePhoto);
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <BrowserRouter>
            <Main 
                nightMode={nightMode} 
                toggleNightMode={toggleNightMode} 
                userName={userName} 
                setUserName={handleUserNameChange}
                profilePhoto={profilePhoto}
                setProfilePhoto={handleProfilePhotoChange} 
            />
        </BrowserRouter>
    );
}

const Main = ({ nightMode, toggleNightMode, userName, setUserName, profilePhoto, setProfilePhoto }) => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleSecurity = () =>{
        navigate('/home/security/login')
    }

    const handleStudent = () =>{
        navigate('/home/student')
    }

    const handleAuth = () =>{
       navigate('/home/authority/login')
    }

    const handleContact = () =>{
        navigate('/home/contact-us')
    }
    const handleFeedback = () =>{
        navigate('/home/feedback')
    }

    return (
        <div className={`card text-center ${nightMode ? 'night-mode' : ''}`}>
            <div className="card-body">
                <div className="marquee-container">
                    <h3 className="marquee">Chris Access Edge</h3>
                </div>
                <ul className="nav">
                    <button onClick={handleHomeClick} className="btn btn-primary"><b><FaHome /></b></button>
                    <button onClick={toggleNightMode} className="btn btn-secondary">
                        {nightMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
                    </button>
                    <button onClick={handleSecurity} className="btn btn-primary">Security</button>
                    <button onClick={handleStudent} className="btn btn-primary">Student</button>
                    <button onClick={handleAuth} className="btn btn-primary">Authority</button>
                    <button onClick={handleContact} className="btn btn-dark">Contact Us</button>
                    <button onClick={handleFeedback} className='btn btn-warning'>Feedback</button>
                </ul><br></br>
                <Routes>
                    <Route path='/' element={<LoginForm />} />
                    <Route path='/admin' element={<Home userName={userName} profilePhoto={profilePhoto} />} />
                    <Route path='/home/contact-us' element={<Contact />} />
                    <Route path='/home/feedback' element={<Feedback />} />
                    <Route path='/home/ReservationTicket' element={<ReservationTicket />} />
                    <Route path='/home/security/login' element={<SecurityLogin />} />
                    <Route path='/home/security/addvisitor' element={<AddVisitor />} />
                    <Route path='/home/security/login/visitor/list' element={<VisitorList/>} />
                    <Route path='/home/security/ReservationHistory' element={<ReservationHistory />} />
                    <Route path='/home/student/dashboard/leaveform' element={<LeaveForm />} />
                    <Route path='/home/authority/login' element={<AuthorityLogin/>} />
                    <Route path='/home/student' element={<StudentDash />} />
                    <Route path='/admin/student-leave-forms' element={<Student/>}/>
                    <Route path='/home/authority/login/dashboard' element={<AuthDash />} />
                    <Route path='/home/authority/login/dashboard/faculty/login' element={<FacultyLogin/>} />
                    <Route path='/home/authority/dashboard/faculty/visitor-approval/visitor-list' element={<FacultyPanel />} />
                    <Route path='/profile' element={<Profile userName={userName} setUserName={setUserName} setProfilePhoto={setProfilePhoto}/>}/>
                    <Route path='/Visitor/Statement' element={<Statement/>}/>
                    <Route path="/home/security/visitor/:visitorId" element={<VisitorDetails/>} />
                </Routes>
            </div>

            <div className="blog-section">
                <h4>Christ College</h4>
                <p>&copy; Christ College Vizhinjam Gatepass Web application<br />
                    Address: Christ College, Vizhinjam, Thiruvananthapuram, Kerala, India<br />
                    Phone: +91 94471 31089<br />
                    Email: <a href="mailto:christcollegevizhinjam@gmail.com">christcollegevizhinjam@gmail.com</a>
                </p>
                <p>
                    <a href="/home/contact-us">Contact Us</a>
                </p>
            </div>

            <div className="card-footer text-muted text-center">
                <div className="social-icons">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube"></i>
                    </a>
                </div>
                <div className="credits">
                    Credits: 
                    <b>K Pranav Eswar,
                    Sivapradeesh M,
                    Parvathy M Haima</b>
                </div>
                <p>&copy; 2024 CAE TEAM. All Rights Reserved</p>
            </div>
        </div>
    );
}

export default App;
