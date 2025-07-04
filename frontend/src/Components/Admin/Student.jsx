import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Student.css';

const Student = () => {
  const [leaveForms, setLeaveForms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/leave-forms/getAll') 
      .then(response => {
        setLeaveForms(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the leave forms!", error);
      });
  }, []);
  

  return (
    <div className="student-leave-container">
      <h2>Students Leave Applications</h2>
      <table className="student-leave-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Reason</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Days</th>
          </tr>
        </thead>
        <tbody>
          {leaveForms.map((form, index) => (
            <tr key={index}>
              <td>{form.name}</td>
              <td>{form.department}</td>
              <td>{form.semester}</td>
              <td>{form.reason}</td>
              <td>{form.fromDate}</td>
              <td>{form.toDate}</td>
              <td>{form.daysLeave}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Student;
