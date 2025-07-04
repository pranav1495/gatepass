import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { PiSecurityCameraFill,PiStudentFill  } from "react-icons/pi";
import { SiAuthy } from "react-icons/si";
import { FaHome } from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <nav>
        <ol type='I' className="sidebar-nav">
        <li>
            <Link to="/admin" onClick={onClose} title="DASHBOARD">
            <FaHome /> DASHBOARD
           </Link>
        </li>
        <li>
            <Link to="/home/security/login" onClick={onClose} title="security">
            <PiSecurityCameraFill /> Security
           </Link>
        </li>
        <li>
            <Link to="/admin/student-leave-forms" onClick={onClose} title="student">
            <PiStudentFill /> Student
            </Link>
        </li>
        <li>
            <Link to="/home/authority/dashboard" onClick={onClose} title="authority">
            <SiAuthy /> Authority
            </Link>
        </li>
        </ol>
      </nav>
    </div>
  );
};

export default Sidebar;
