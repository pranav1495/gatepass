import React, { useState } from 'react';
import axios from 'axios';
import './AddVisitor.css';

export const AddVisitor = () => {
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [date, setDate] = useState('');
  const [entrytime, setEntryTime] = useState('');
  const [exittime, setExitTime] = useState('');
  const [toMeetWhom, setToMeetWhom] = useState('');
  const [otherToMeetWhom, setOtherToMeetWhom] = useState('');
  const [purposeOfVisit, setPurposeOfVisit] = useState('');
  const [otherPurposeOfVisit, setOtherPurposeOfVisit] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');

  const validatePhoneNumber = (phone) => {
    if (phone.length !== 10) {
      setPhoneError('Phone number must be exactly 10 characters.');
      return false;
    }
    setPhoneError('');
    return true;
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

  const postData = (e) => {
    e.preventDefault();
    if (!name || !phoneNo || !date || !entrytime || !exittime || !toMeetWhom || !purposeOfVisit) {
      alert("All fields are required");
      return;
    }

    if (!validatePhoneNumber(phoneNo) || !validateName(name)) {
      return;
    }

    const visitor = {
      name,
      phoneNo,
      date,
      entrytime,
      exittime,
      toMeetWhom: toMeetWhom === "Other" ? otherToMeetWhom : toMeetWhom,
      purposeOfVisit: purposeOfVisit === "Other" ? otherPurposeOfVisit : purposeOfVisit,
    };

    axios.post("http://localhost:8080/Visitor/add", visitor)
      .then(response => {
        if (response.status === 200) {
          alert("Failed to add visitor");
          console.log("Failed to add visitor");
        } else {
          alert("Visitor added successfully");
          console.log("Visitor added successfully");
        }
      })
      .catch(error => {
        alert("Error adding visitor");
        console.error("Error:", error);
      });
  };
  return (
    <div className="add-visitor-container">
      <div className="form-container777">
        <h2>Visitor Panel</h2>
        <form onSubmit={postData}>
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="phoneNo">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phoneNo"
              value={phoneNo}
              onChange={(e) => {
                setPhoneNo(e.target.value);
                validatePhoneNumber(e.target.value);
              }}
              required
            />
            {phoneError && <p className="error-message">{phoneError}</p>}
          </div>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="exittime">Exit Time</label>
            <input
              type="time"
              className="form-control"
              id="exittime"
              value={exittime}
              onChange={(e) => setExitTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="toMeetWhom">To Meet Whom</label>
            <select
              className="form-control"
              id="toMeetWhom"
              value={toMeetWhom}
              onChange={(e) => {
                setToMeetWhom(e.target.value);
                if (e.target.value !== "Other") {
                  setOtherToMeetWhom('');
                }
              }}
              required
            >
              <option value="">Select</option>
              <option value="Principal">Principal</option>
              <option value="Vice Principal">Vice Principal</option>
              <option value="HOD">HOD</option>
              <option value="Other">Other</option>
            </select>
            {toMeetWhom === "Other" && (
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Specify"
                value={otherToMeetWhom}
                onChange={(e) => setOtherToMeetWhom(e.target.value)}
                required
              />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="purposeOfVisit">Purpose Of Visit</label>
            <select
              className="form-control"
              id="purposeOfVisit"
              value={purposeOfVisit}
              onChange={(e) => {
                setPurposeOfVisit(e.target.value);
                if (e.target.value !== "Other") {
                  setOtherPurposeOfVisit('');
                }
              }}
              required
            >
              <option value="">Select</option>
              <option value="Meeting">Meeting</option>
              <option value="Leave Application">Leave Application</option>
              <option value="Delivery">Delivery</option>
              <option value="Other">Other</option>
            </select>
            {purposeOfVisit === "Other" && (
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Specify"
                value={otherPurposeOfVisit}
                onChange={(e) => setOtherPurposeOfVisit(e.target.value)}
                required
              />
            )}
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
