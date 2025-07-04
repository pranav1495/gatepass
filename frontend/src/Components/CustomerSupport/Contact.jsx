// Contact.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Contact.css'; // Ensure you have appropriate CSS for custom styles

const Contact = () => {
    return (
        <div className="blog-section333">
            <div className="contact-container">
                <h2>GET IN TOUCH WITH US</h2>
                <p>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                    <span className="contact-info">
                        <strong>CHRIST COLLEGE</strong><br />
                        St Peter’s Carmel Campus, Kalluvettankuzhi, Vizhinjam, Trivandrum – 695 021
                    </span>
                </p>
                <p>
                    <FontAwesomeIcon icon={faPhoneAlt} className="icon" />
                    <span className="contact-info">
                        <strong>Phone:</strong> <a href="tel:+919447131089">+91 94471 31089</a>
                    </span>
                </p>
                <p>
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                    <span className="contact-info">
                        <strong>Email:</strong> <a href="mailto:christcollegevizhinjam@gmail.com">christcollegevizhinjam@gmail.com</a>
                    </span>
                </p>
            </div>
            <div className="gmap">
            <iframe
                title="Google Maps"
                width="100%"
                height="400"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.578394283479!2d76.94363491436612!3d8.365428193939298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05f42f2ebac809%3A0xb14f764b6448f94!2sChrist%20College%2C%20Vizhinjam!5e0!3m2!1sen!2sin!4v1625607010494!5m2!1sen!2sin"
                allowFullScreen
            ></iframe>

            </div>
        </div>
    );
}

export default Contact;
