import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPrint, faSignOutAlt, faFileExcel, faPlus, faHistory } from '@fortawesome/free-solid-svg-icons';
import styles from './VisitorList.css';
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from 'react-modal';
import { MdOutlineQueryStats } from "react-icons/md";

Modal.setAppElement('#root');

export const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };
    return date.toLocaleTimeString('en-US', options);
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const visitorReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return { ...state, visitors: action.payload, loading: false, error: null };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'DELETE_SUCCESS':
            return { ...state, visitors: state.visitors.filter(visitor => visitor.id !== action.payload) };
        case 'DELETE_ERROR':
            return { ...state, error: action.payload };
        case 'UPDATE_SUCCESS':
            return {
                ...state,
                visitors: state.visitors.map(visitor =>
                    visitor.id === action.payload.id ? action.payload : visitor
                ),
                editingId: null,
            };
        case 'SET_EDITING':
            return { ...state, editingId: action.payload };
        case 'ADD_VISITOR':
            return { ...state, visitors: [...state.visitors, action.payload] };
        default:
            return state;
    }
};

export const VisitorList = () => {
    const [state, dispatch] = useReducer(visitorReducer, { visitors: [], loading: true, error: null, editingId: null });
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchVisitors = async () => {
            const authToken = localStorage.getItem('authToken');
    
            try {
                const response = await axios.get('http://localhost:8080/Visitor/getAll', {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                const sortedVisitors = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                dispatch({ type: 'FETCH_SUCCESS', payload: sortedVisitors });
            } catch (error) {
                dispatch({ type: 'FETCH_ERROR', payload: 'Error fetching visitors' });
            }
        };
    
        fetchVisitors();
    }, []); // Only run this effect once when the component mounts

    const handleDelete = async (visitorId) => {
        const authToken = localStorage.getItem('authToken');
        if (window.confirm("Are you sure you want to delete this visitor?")) {
            try {
                await axios.delete(`http://localhost:8080/Visitor/${visitorId}`, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                dispatch({ type: 'DELETE_SUCCESS', payload: visitorId });
            } catch (error) {
                dispatch({ type: 'DELETE_ERROR', payload: 'Error deleting visitor' });
            }
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/home/security/login');
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
        XLSX.writeFile(workbook, 'visitors-list.xlsx');
    };

    const handlePrintAllVisitors = () => {
        window.print();
    };

    const handleAddVisitor = () => {
        navigate('/home/security/addvisitor');
    };

    const handleStatement = () => {
        navigate('/Visitor/Statement');
    };

    const handleReservationHistory = async () => {
        try {
            const response = await axios.get('http://localhost:8080/reservations/getAll');
            dispatch({ type: 'FETCH_RESERVATIONS_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'FETCH_RESERVATIONS_ERROR', payload: 'Error fetching reservation history' });
        }
        navigate('/home/security/ReservationHistory');
    };
    const handleView = (visitorId) => {
        navigate(`/home/security/visitor/${visitorId}`);
    };

    const filteredVisitors = state.visitors.filter(visitor =>
        visitor.name.toUpperCase().includes(searchQuery.toUpperCase()) ||
        visitor.toMeetWhom.toUpperCase().includes(searchQuery.toUpperCase()) ||
        visitor.purposeOfVisit.toUpperCase().includes(searchQuery.toUpperCase()) ||
        visitor.phoneNo.includes(searchQuery) ||
        formatDate(visitor.date).toUpperCase().includes(searchQuery.toUpperCase())
    );

    const { loading, error } = state;

    return (
        <div className={styles.visitorList}>
            <div className="header">
                <h2>Visitor's List</h2>
                <button className="btn btn-primary" onClick={handleAddVisitor}>
                    <FontAwesomeIcon icon={faPlus} /> Add Visitor
                </button>
                <button className="btn btn-secondary" onClick={handlePrintAllVisitors}>
                    <FontAwesomeIcon icon={faPrint} /> Print All
                </button>
                <button className="btn btn-success" onClick={exportToExcel}>
                    <FontAwesomeIcon icon={faFileExcel} /> Export to Excel
                </button>
                <button className="btn btn-secondary" onClick={handleStatement}>
                    <MdOutlineQueryStats /> View Statement
                </button>
                <button className="btn btn-secondary" onClick={handleReservationHistory}>
                    <FontAwesomeIcon icon={faHistory} /> View Reservation History
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
            </div>

            <div className="search-container">
            <input
                     type="text"
                     className="search-input"
                     placeholder="Search Visitors..."
                     value={searchQuery}
                     onChange={handleSearch}
                 />
                 <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>


            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : filteredVisitors.length === 0 ? (
                <p>No visitors found.</p>
            ) : (
                <table className="visitor-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>To Meet</th>
                            <th>Purpose</th>
                            <th>Phone No.</th>
                            <th>Date</th>
                            <th>Entry Time</th>
                            <th>Exit Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVisitors.map((visitor) => (
                            <tr key={visitor.id}>
                                <td>{visitor.name}</td>
                                <td>{visitor.toMeetWhom}</td>
                                <td>{visitor.purposeOfVisit}</td>
                                <td>{visitor.phoneNo}</td>
                                <td>{formatDate(visitor.date)}</td>
                                <td>{formatTime(visitor.entrytime)}</td>
                                <td>{formatTime(visitor.exittime)}</td>
                                <td>
                                    <button onClick={() => handleView(visitor.id)} className='view-button'>
                                        <FaEye /> View
                                    </button>
                                    <button onClick={() => handleDelete(visitor.id)} className='delete-button11'>
                                        <MdDelete /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
