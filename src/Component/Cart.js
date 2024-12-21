import React, { useState, useEffect } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
 
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
 
  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);
 
  // Calculate total cart amount
  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(total.toFixed(3));
  };
 
  // Update quantity of a specific product
  const updateQuantity = (productId, delta) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
 
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };
 
  // Remove a specific product from the cart
  const removeItem = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };
 
  // Navigate to billing page
  const handleCheckout = () => {
    navigate('/billing');
  };
 
  return (
    <div className="cart-container">
      <div className="cart-left">
        <h1>Cart</h1>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div className="cart-item" key={item.productId}>
              <img
                src={item.imageURL || 'placeholder.png'} // Fallback image if imageURL is missing
                alt={item.productName}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h2>{item.productName}</h2>
                <p>OMR {item.price.toFixed(3)}</p>
                <div className="cart-item-actions">
                  <button
                    onClick={() => updateQuantity(item.productId, -1)}
                    disabled={item.quantity === 1} // Prevent quantity from going below 1
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, 1)}>+</button>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="cart-right">
        <h2>Cart Summary</h2>
        <div className="summary-details">
          <p>Total amount</p>
          <p>OMR {totalAmount}</p>
        </div>
        {cart.length > 0 && (
          <button onClick={handleCheckout} className="checkout-btn">
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};
 
export default Cart;