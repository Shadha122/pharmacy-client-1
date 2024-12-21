import React from 'react';
import { Link } from 'react-router-dom';
import {Row , Col} from "react-bootstrap";
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
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
      <main className="home-content">
        <Row>
          <Col>
          <p>
          We are a pharmacy management company dedicated to providing the best
          possible service to our customers. Our team of experienced professionals
          is committed to ensuring that every aspect of our service meets or
          exceeds the highest standards.
        </p>
        <p>
          <strong>Fast and reliable delivery</strong> <br />
          <strong>High quality products</strong> <br />
          <strong>Affordable prices</strong>
        </p>
          </Col>
           <Col>
           <div className="image-container">
          <img src="https://cdn-icons-png.flaticon.com/512/3590/3590519.png" alt="Pharmacy" />
        </div>
           </Col>
        </Row>
       
        
      </main>
    </div>
  );
};

export default Home;
