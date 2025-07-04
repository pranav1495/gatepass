import React from 'react';
import styles from './FacultyPanel.css';

const FacultyPanel = () => {
    return (
        <div className={styles.facultyPanel}>
            <div className='header'><h2>Faculty Panel</h2></div>
                <div className='image-container'>
                    <img src="/construction.gif" alt="Faculty Panel" className="faculty-image" />
                </div>
        </div>
    );
};

export default FacultyPanel;
