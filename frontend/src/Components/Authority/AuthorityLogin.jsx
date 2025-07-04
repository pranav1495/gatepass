import React, { useState } from 'react';
import axios from 'axios';
import './AuthorityLogin.css';
import { useNavigate } from 'react-router-dom';

const AuthorityLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:8080/authority', { email, password });
      console.log('Login successful:', response.data);
      navigate('/home/authority/login/dashboard');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Login failed. Please check your email and password.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className='App445'>
      <div className="login-container">
        <h2>Authority Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder='Enter Email'
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder='Enter Password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className='btn btn-primary' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthorityLogin;
