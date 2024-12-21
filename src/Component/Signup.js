import React, { useState } from 'react';
import './AdminLogin.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/user-login');
        setSuccess('User registered successfully');
        setFormData({ fullName: '', username: '', email: '', password: '' });
      } else {
        const data = await response.json();
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again later.');
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
        <h2>Signup</h2>
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignup}>
          <label>Full Name</label>
            <input  type="text"  placeholder="Enter Your Full Name"  value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}  required />
          <label>Username</label>
            <input type="text" placeholder="Enter Your Username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
          <label>Email</label>
            <input type="email" placeholder="Enter Your Email" value={formData.email}  onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <label>Password</label>
            <input type="password" placeholder="Enter Your Password"  value={formData.password}  onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
          <button type="submit" className="btn login-btn"> Signup  </button>
        </form>
        <p>
          Already have an account? <Link to="/user-login">Signin</Link>
        </p>
      </main>
    </div>
  );
};

export default Signup;
