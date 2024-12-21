import React, { useEffect, useState } from 'react';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('User not logged in.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/orders/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error('Failed to fetch orders:', response.statusText);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      {orders.length > 0 ? (
        <table className="order-history-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total Quantity</th>
              <th>Total Price (OMR)</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
              const totalPrice = order.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );

              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{totalQuantity}</td>
                  <td>{totalPrice.toFixed(3)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
