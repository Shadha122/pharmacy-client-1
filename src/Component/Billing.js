import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Billing.css';

const Billing = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handlePayment = async () => {
    const userId = localStorage.getItem('userId');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderData = {
      userId,
      items: cartItems.map((item) => ({
        productId: item.productId, 
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      deliveryAddress: address,
    };

    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Order placed successfully!');
        // Clear the cart from localStorage
        localStorage.removeItem('cart');
        navigate('/orders');
      } else {
        const errorData = await response.json();
        alert(`Failed to place order: ${errorData.error}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while placing the order.');
    }
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const fetchedAddress = data.display_name || 'Address not found';
            setAddress(fetchedAddress);
          } catch (error) {
            console.error('Error fetching address:', error);
            alert('Unable to fetch your address. Please enter it manually.');
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location. Please allow location access or enter it manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="billing-container">
      <h2>Enter Billing Details</h2>
      <form>
        <label>Card Number</label>
        <input
          type="text"
          placeholder="0000 0000 0000 0000"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <label>Exp Date</label>
        <input
          type="text"
          placeholder="MM/YY"
          value={expDate}
          onChange={(e) => setExpDate(e.target.value)}
        />
        <label>CVV</label>
        <input
          type="text"
          placeholder="000"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Address</label>
        <div className="address-container">
          <input
            type="text"
            placeholder="Enter Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            type="button"
            className="btn location-btn"
            onClick={fetchCurrentLocation}
          >
            Fetch Current Location
          </button>
        </div>
        <button type="button" className="btn pay-btn" onClick={handlePayment}>
          Pay
        </button>
      </form>
    </div>
  );
};

export default Billing;
