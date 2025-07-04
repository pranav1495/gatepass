import React from 'react';
import { Link } from 'react-router-dom';
import './AuthDash.css';

export const AuthDash = () => {
    
  return (
    <div className="auth-container">
      <div className="form-container1111">
      <nav aria-label="Main Navigation" className="button-nav1111">
      <Link className="btn btn-danger btn-lg" to='/home/authority/login/dashboard/Faculty/login'><h4>Faculty</h4></Link><br></br><br></br>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <Link className="btn btn-success btn-lg" to='/home/authority/login/dashboard/Principal'><h4>Principal</h4></Link><br></br><br></br>
      &nbsp; &nbsp; &nbsp; &nbsp;
      <Link className="btn btn-primary btn-lg" to='/home/authority/login/dashboard/VicePrincipal'><h4>VicePrincipal</h4></Link>
      </nav>
    </div></div>
  );
};
