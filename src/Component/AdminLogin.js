import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      navigate('/admin-dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-container">
            <header className="admin-header">
        <h1>Pharmacy system</h1>
        <nav className="header-buttons">
        <Link to="/about-Us" className="btn">
            About Developers
          </Link>
          <Link to="/user-login" className="btn">
            User
          </Link>
          <Link to="/admin-login" className="btn">
            Admin
          </Link>
        </nav>
      </header>
      <main className="admin-content">
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn login-btn">
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default AdminLogin;
