import React from 'react';
import { Link } from 'react-router-dom';
import { FcLeave } from "react-icons/fc";

export const StudentDash = () => {
    return (
        <div className="home-container">
            <div className="form-container">
                <div className='form123'>
                <p></p></div>
                <nav aria-label="Main Navigation" className="button-nav">
                    <Link className="btn btn-success btn-lg" to='/home/student/dashboard/LeaveForm'>
                        <FcLeave />
                        <h4>Instant Leave Form Maker</h4>
                    </Link>
                </nav>
            </div>
        </div>
    );
};
