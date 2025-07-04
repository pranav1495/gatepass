import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReservationTicket.css';

export const ReservationTicket = () => {
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [date, setDate] = useState('');
  const [entrytime, setEntryTime] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneNoError, setPhoneNoError] = useState('');

  const navigate = useNavigate();

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z][A-Za-z\s]*$/;
    if (!nameRegex.test(name)) {
      setNameError('Name must start with a letter and contain only alphabets.');
      return false;
    }
    setNameError('');
    return true;
  };

  const validatePhoneNo = (phoneNo) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNo)) {
      setPhoneNoError('Phone number must be a 10-digit number.');
      return false;
    }
    setPhoneNoError('');
    return true;
  };

  const postData = (e) => {
    e.preventDefault();
    if (!name || !phoneNo || !date || !entrytime) {
      alert("All fields are required");
      return;
    }

    if (!validateName(name) || !validatePhoneNo(phoneNo)) {
      return;
    }

    const reservationData = {
      name: name,
      phoneNo: phoneNo,
      date: date,
      entrytime: entrytime
    };

    axios.post("http://localhost:8080/reservations/add", reservationData)
      .then(response => {
        if (response.status === 200) {
          alert("Visitor pre-registered successfully");
          console.log("Visitor pre-registered successfully");
          resetForm();
        } else {
          alert("Failed to pre-register visitor");
          console.log("Failed to pre-register visitor");
        }
      })
      .catch(error => {
        alert("Error pre-registering visitor");
        console.error("Error:", error);
      });
  };

  const resetForm = () => {
    setName('');
    setPhoneNo('');
    setDate('');
    setEntryTime('');
    setNameError('');
    setPhoneNoError('');
  };

  return (
    <div className="reservation-ticket-container">
      <div className="form-container23">
        <h2>Pre-Register Visitor</h2>
        <form onSubmit={postData}>
          <div className="form-group23">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateName(e.target.value);
              }}
              required
            />
            {nameError && <p className="error-message">{nameError}</p>}
          </div>
          <div className="form-group23">
            <label htmlFor="phoneNo">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNo"
              value={phoneNo}
              onChange={(e) => {
                setPhoneNo(e.target.value);
                validatePhoneNo(e.target.value);
              }}
              required
            />
            {phoneNoError && <p className="error-message">{phoneNoError}</p>}
          </div>
          <div className="form-group23">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group23">
            <label htmlFor="entrytime">Entry Time</label>
            <input
              type="time"
              className="form-control"
              id="entrytime"
              value={entrytime}
              onChange={(e) => setEntryTime(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" className="btn btn-primary enter-button">Submit</button>
            <button type="button" className="btn btn-secondary reset-button" onClick={resetForm}>Reset</button>
            <button type="button" className="btn btn-secondary back-button11" onClick={() => navigate('/home/security/login')}>Back to Home</button>
          </div>
        </form>
      </div>
    </div>
  );
};
