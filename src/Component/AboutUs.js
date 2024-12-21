import { Link } from 'react-router-dom';
import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
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
    <br/><br/>
      <main className="developers-content">
        
        <section className="team-info">
            
        <h2>Development Team</h2>
          <p>
            This project was developed by a dedicated team of two members, <strong>Shadha Ibrhaim (16J21194)</strong> and <strong>Maryam Turki (16j2124134)</strong>. 
            Together, we collaborated on all aspects of the project, including front-end design, back-end development, database management, and overall functionality.
            Our goal was to create a user-friendly and efficient pharmacy system.
          </p>
        </section>
        <section className="references">
          <h2>References</h2>
          <p>
            This project was developed using the following resources:
          </p>
          <ul>
            <li>
              <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                React Official Documentation
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/" target="_blank" rel="noopener noreferrer">
                MDN Web Docs
              </a>
            </li>
            <li>
              <a href="https://www.geeksforgeeks.org/reactjs-projects/" target="_blank" rel="noopener noreferrer">
                Geeks for Geeks
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
