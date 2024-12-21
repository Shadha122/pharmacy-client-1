import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Features/Navbar';
import Footer from './Features/Footer';
import Home from './Component/Home';
import Login from './Component/Login';
import Signup from './Component/Signup';
import AdminDashboard from './Component/AdminDashboard';
import ProductList from './Component/ProductList';
import Cart from './Component/Cart';
import OrderHistory from './Component/OrderHistory';
import Billing from './Component/Billing';
import './App.css';
import AdminLogin from './Component/AdminLogin';
import AboutUs from './Component/AboutUs';
function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/about-Us" element={<AboutUs />} />

        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                
                <Route path="/products" element={<ProductList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/billing" element={<Billing />} />
              </Routes>
              
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
