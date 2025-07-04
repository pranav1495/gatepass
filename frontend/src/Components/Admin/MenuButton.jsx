import React from 'react';
import './MenuButton.css';

const MenuButton = ({ onClick }) => {
  return (
    
    <button className="menu-button" onClick={onClick} title='Menu'>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </button>
  );
};

export default MenuButton;