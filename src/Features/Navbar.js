import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Pharmacy System</h1>
      <ul className="nav-links">
        <li>
          <Link to="/products" className="nav-link">Products</Link>
        </li>
        <li>
          <Link to="/cart" className="nav-link">Cart</Link>
        </li>
        <li>
          <Link to="/orders" className="nav-link">Orders</Link>
        </li>
      </ul>
      <button className="btn logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
