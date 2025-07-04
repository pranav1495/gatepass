import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './LeaveForm.css';
import LeaveSubs from './LeaveSubs';
import { RxReset } from "react-icons/rx";

const LeaveForm = () => {
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [nameError, setNameError] = useState('');
  const [daysLeave, setDaysLeave] = useState(0);
  const navigate = useNavigate();

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z][A-Za-z\s]*$/;
    if (!nameRegex.test(name)) {
      setNameError('Name must start with a letter and contain only alphabets.');
      return false;
    }
    setNameError('');
    return true;
  };

  // Function to calculate number of days between two dates
  useEffect(() => {
    const calculateDaysLeave = () => {
      if (fromDate && toDate) {
        const start = new Date(fromDate);
        const end = new Date(toDate);
        const difference = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        setDaysLeave(difference);
      }
    };

    calculateDaysLeave();
  }, [fromDate, toDate]);

  const postData = (e) => {
    e.preventDefault();
    if (!name || !reason || !fromDate || !toDate || !department || !semester || !daysLeave) {
      alert("All fields are required");
      return;
    }

    if (!validateName(name)) {
      return;
    }

    const formData = {
      name,
      reason,
      fromDate,
      toDate,
      department,
      semester,
      daysLeave
    };

    axios.post("http://localhost:8080/leave-forms/add", formData)
      .then(response => {
        if (response.status === 200) {
          alert("Failed to add leave form");
          console.log("Failed to add leave form");
        } else {
          alert("Leave form added successfully");
          console.log("Leave form added successfully");
          setSubmitted(true);
        }
      })
      .catch(error => {
        alert("Error adding leave form");
        console.error("Error:", error);
      });
  };

  const handleReset = () => {
    setName('');
    setReason('');
    setFromDate('');
    setToDate('');
    setDepartment('');
    setSemester('');
    setSubmitted(false);
    setDaysLeave(0);
  };

  return (
    <div className="leave-form-container">
      <div className="leave-form-header">
        <h2><b><u>LEAVE APPLICATION FORM</u></b></h2>
      </div> 
      <div className="leave-form-header1">
       <h5><i>Christ College Vizhinjam,Kalluvettankuzhi, Vizhinjam</i></h5>
      <h5><i>Trivandrum – 695 021</i></h5></div>
      {!submitted ? (
        <form onSubmit={postData}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            {nameError && <div className="error">{nameError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              value={department}
              placeholder="Enter your Department"
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="semester">Semester:</label>
            <input
              type="text"
              id="semester"
              value={semester}
              placeholder="Enter Semester in 'Number'"
              onChange={(e) => setSemester(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reason">Reason:</label>
            <textarea
              id="reason"
              value={reason}
              placeholder="Enter your reason for leave"
              onChange={(e) => setReason(e.target.value)}
              required
              rows="4"
              cols="50"
            />
          </div>
          <div className="form-group">
            <label htmlFor="fromDate">From Date:</label>
            <input
              type="date"
              id="fromDate"
              value={fromDate}
              placeholder="Enter 'from date' here"
              onChange={(e) => setFromDate(e.target.value)}
              min="2024-01-01"
              max={getTodayDate()}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="toDate">To Date:</label>
            <input
              type="date"
              id="toDate"
              value={toDate}
              placeholder="Enter 'to date' here"
              onChange={(e) => setToDate(e.target.value)}
              min="2024-01-01"
              max={getTodayDate()}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="days">Days:</label>
            <input
              type="text"
              id="days"
              value={daysLeave}
              onChange={(e) => setDaysLeave(e.target.value)}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-dark small-button" onClick={handleReset}>
            <RxReset />
            </button>
            <button type="button" className="btn btn-dark small-button" onClick={() => navigate('/home/student')}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
          </div>
        </form>
      ) : (
        <LeaveSubs formData={{ name, department, semester, reason, fromDate, toDate, daysLeave }} />
      )}
    </div>
  );
};

export default LeaveForm;
