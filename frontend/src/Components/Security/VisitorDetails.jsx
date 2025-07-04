import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './VisitorDetails.css';

export const VisitorDetails = () => {
    const { visitorId } = useParams();
    const [visitor, setVisitor] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        toMeetWhom: '',
        purposeOfVisit: '',
        phoneNo: '',
        entrytime: '',
        exittime: '',
        date: '',
    });

    useEffect(() => {
        const fetchVisitor = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/Visitor/${visitorId}`);
                setVisitor(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching visitor:', error);
            }
        };

        fetchVisitor();
    }, [visitorId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/Visitor/edit/${visitorId}`, formData);
            setVisitor(response.data);
            setIsEditing(false);
            navigate('/home/security/login/visitor/list', { state: { refresh: true } });
        } catch (error) {
            console.error('Error updating visitor:', error);
        }
    };

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/home/security/login/visitor/list');
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="visitor-details-container">
            {visitor ? (
                <div className="visitor-details">
                    <div className="header">
                        <h2>Visitor Pass #{visitorId}</h2>
                    </div>
                    {isEditing ? (
                        <div className="visitor-form">
                            <label>
                                Name:
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                            </label>
                            <label>
                                To Meet:
                                <input type="text" name="toMeetWhom" value={formData.toMeetWhom} onChange={handleInputChange} />
                            </label>
                            <label>
                                Purpose:
                                <input type="text" name="purposeOfVisit" value={formData.purposeOfVisit} onChange={handleInputChange} />
                            </label>
                            <label>
                                Phone:
                                <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange} />
                            </label>
                            <label>
                                Entry Time:
                                <input type="time" name="entrytime" value={formData.entrytime} onChange={handleInputChange} />
                            </label>
                            <label>
                                Exit Time:
                                <input type="time" name="exittime" value={formData.exittime} onChange={handleInputChange} />
                            </label>
                            <label>
                                Date:
                                <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
                            </label>
                            <div className="button-group">
                                <button className="save-button" onClick={handleUpdate}>Save</button>
                                <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div className="visitor-info">
                            <form className='form-group5'>
                            <p><strong>Name:</strong> {visitor.name}</p>
                            <p><strong>To Meet:</strong> {visitor.toMeetWhom}</p>
                            <p><strong>Purpose:</strong> {visitor.purposeOfVisit}</p>
                            <p><strong>Phone:</strong> {visitor.phoneNo}</p>
                            <p><strong>Entry Time:</strong> {visitor.entrytime}</p>
                            <p><strong>Exit Time:</strong> {visitor.exittime}</p>
                            <p><strong>Date:</strong> {visitor.date}</p>
                            </form>
                            <div className="button-group">
                                <button className="edit-button11" onClick={() => setIsEditing(true)}>Edit</button>
                                <button className="back-button11" onClick={handleCancel}>Back</button>
                                <button className="print-button" onClick={handlePrint}>Print</button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
