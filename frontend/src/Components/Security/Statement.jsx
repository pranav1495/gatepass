import React, { useState, useReducer } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faPrint, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './Statement.css';
import { formatDate, formatTime } from './VisitorList.jsx';
import { useNavigate } from 'react-router-dom';

const statementReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return { ...state, visitors: action.payload, loading: false, error: null };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const Statement = () => {
    const [state, dispatch] = useReducer(statementReducer, { visitors: [], loading: false, error: null });
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleGenerate = async () => {
        dispatch({ type: 'FETCH_LOADING' });
        try {
            const response = await axios.get(`http://localhost:8080/Visitor/getByDateRange`, {
                params: { fromDate, toDate }
            });
            const sortedVisitors = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
            dispatch({ type: 'FETCH_SUCCESS', payload: sortedVisitors });
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', payload: 'Error fetching visitors' });
        }
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(state.visitors.map(visitor => ({
            Name: visitor.name,
            ToMeet: visitor.toMeetWhom,
            Purpose: visitor.purposeOfVisit,
            Phone: visitor.phoneNo,
            EntryTime: formatTime(visitor.entrytime),
            ExitTime: formatTime(visitor.exittime),
            Date: formatDate(visitor.date)
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Visitors');
        XLSX.writeFile(workbook, 'visitors-statement.xlsx');
    };

    const handlePrint = () => {
        window.print();
    };

    const { visitors, loading, error } = state;

    return (
        <div className={styles.statement}>
            <div className='header'>
                <button className="back-button" onClick={() => navigate('/home/security/login/visitor/list')}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Back to Visitor's List
                </button>
                <h2>Visitor Statement</h2>
            </div>
            <div className="date-filters">
                <label>
                    From:
                    <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                </label>
                <label>
                    To:
                    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </label>
                <button onClick={handleGenerate}>Generate</button>
                <button onClick={exportToExcel}>
                    <FontAwesomeIcon icon={faFileExcel} /> Export to Excel
                </button>
                <button onClick={handlePrint}>
                    <FontAwesomeIcon icon={faPrint} /> Print
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {visitors.length > 0 && (
                <table className="statement-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>To Meet</th>
                            <th>Purpose</th>
                            <th>Phone</th>
                            <th>Entry Time</th>
                            <th>Exit Time</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visitors.map(visitor => (
                            <tr key={visitor.id}>
                                <td>{visitor.name}</td>
                                <td>{visitor.toMeetWhom}</td>
                                <td>{visitor.purposeOfVisit}</td>
                                <td>{visitor.phoneNo}</td>
                                <td>{formatTime(visitor.entrytime)}</td>
                                <td>{formatTime(visitor.exittime)}</td>
                                <td>{formatDate(visitor.date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Statement;
