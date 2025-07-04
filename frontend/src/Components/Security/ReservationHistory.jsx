import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaShare } from "react-icons/fa";

const ReservationHistory = () => {
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const formatTime = (timeString) => {
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    useEffect(() => {
        const fetchVisitors = async () => {
            try {
                const response = await axios.get('http://localhost:8080/reservations/getAll');
                setVisitors(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching pre-registered visitors');
                setLoading(false);
            }
        };

        fetchVisitors();
    }, []);

    const handleForward = async (visitorId) => {
        try {
            const response = await axios.post(`http://localhost:8080/reservations/forward/${visitorId}`);
            console.log('Forward response:', response);

            if (response.status === 200) {
                // Update the local state to reflect the forwarded status
                setVisitors(prevVisitors => prevVisitors.map(visitor =>
                    visitor.id === visitorId ? { ...visitor, status: 'Forwarded' } : visitor
                ));
                alert('Forwarded successfully');
                navigate('/home/security/login/visitor/list');
            } else {
                alert('Failed to forward visitor');
                console.log('Failed to forward visitor:', response);
            }
        } catch (error) {
            console.error('Error forwarding visitor:', error);
            alert('Error forwarding visitor');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <div className='header'>
                <button className="back-button" onClick={() => navigate('/home/security/login/visitor/list')}>
                    <span>&larr;</span> Back to Visitor's List
                </button>
                <h2>Pre-Registered Visitors</h2>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Entry Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {visitors.map(visitor => (
                        <tr key={visitor.id}>
                            <td>{visitor.name}</td>
                            <td>{visitor.phoneNo}</td>
                            <td>{formatDate(visitor.date)}</td>
                            <td>{formatTime(visitor.entrytime)}</td>
                            <td>{visitor.status}</td>
                            <td>
                                <button className="forward-button555" onClick={() => handleForward(visitor.id)}>
                                    <FaShare />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationHistory;
