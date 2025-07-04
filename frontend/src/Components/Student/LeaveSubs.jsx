import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import './LeaveSubs.css';

const LeaveSubs = ({ formData, days }) => {
  const { name, department, semester, reason, fromDate, toDate ,daysLeave } = formData;

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const body = document.body;
    const nightModeEnabled = localStorage.getItem('nightMode') === 'true';

    if (nightModeEnabled) {
      body.classList.add('night-mode');
    }

    return () => {
      if (nightModeEnabled) {
        body.classList.remove('night-mode');
      }
    };
  }, []);

  return (
    <div className="leave-subs-container">
      <div className="leave-subs-content">
        <ul className="leave-subs-list">
          <li><strong>Name:</strong> {name}</li>
          <li><strong>Department:</strong> {department}</li>
          <li><strong>Semester:</strong> {semester}</li>
          <li><strong>Reason:</strong> {reason}</li>
          <li><strong>From Date:</strong> {fromDate}</li>
          <li><strong>To Date:</strong> {toDate}</li>
          <li><strong>Number of Days:</strong> {daysLeave}</li>
        </ul>
      </div>
      <div className="leave-subs-button">
        <button type="button" className="btn btn-secondary" onClick={handlePrint}>
          <FontAwesomeIcon icon={faPrint} /> Print Form
        </button>
      </div>
    </div>
  );
};

export default LeaveSubs;
