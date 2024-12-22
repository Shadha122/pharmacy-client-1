import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    price: '',
    quantity: '',
    description: '',
    imageURL: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://pharmacy-server-new.onrender.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  // Handle adding or updating a product
  const handleSaveProduct = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        // Update product
        const response = await fetch(`https://pharmacy-server-new.onrender.com/products/${editingProduct._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct),
        });

        if (response.ok) {
          const updatedProduct = await response.json();
          setProducts(
            products.map((product) =>
              product._id === updatedProduct._id ? updatedProduct : product
            )
          );
          setEditingProduct(null);
          setNewProduct({
            productName: '',
            price: '',
            quantity: '',
            description: '',
            imageURL: '',
          });
        } else {
          setError('Failed to update product');
        }
      } else {
        // Add new product
        const response = await fetch('https://pharmacy-server-new.onrender.com/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct),
        });

        if (response.ok) {
          const product = await response.json();
          setProducts([...products, product]);
          setNewProduct({
            productName: '',
            price: '',
            quantity: '',
            description: '',
            imageURL: '',
          });
          setError('');
        } else {
          setError('Failed to add product');
        }
      }
    } catch (err) {
      console.error('Error saving product:', err);
      setError('An error occurred. Please try again.');
    }
  };

  // Handle editing a product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      productName: product.productName,
      price: product.price,
      quantity: product.quantity,
      description: product.description,
      imageURL: product.imageURL,
    });
  };

  // Handle deleting a product
  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`https://pharmacy-server-new.onrender.com/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id));
      } else {
        console.error('Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Pharmacy system</h1>
        <button className="btn logout-btn" onClick={() => navigate('/')}>
          Logout
        </button>
      </header>
      <main className="admin-content">
        <h2>Admin Dashboard</h2>

        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.productName}</td>
                <td>{product.price} OMR</td>
                <td>{product.quantity}</td>
                <td>{product.description}</td>
                <td>
                  <img src={product.imageURL} alt={product.productName} className="product-image" />
                </td>
                <td>
                  <button
                    className="btn edit-btn"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
        {error && <p className="error">{error}</p>}
        <form className="add-product-form" onSubmit={handleSaveProduct}>
          <input
            type="text"
            placeholder="Enter Product Name"
            value={newProduct.productName}
            onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Enter Product Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Enter Quantity"
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Enter Product Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter Image URL"
            value={newProduct.imageURL}
            onChange={(e) => setNewProduct({ ...newProduct, imageURL: e.target.value })}
            required
          />
          <button type="submit" className="btn add-btn">
            {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AdminDashboard;
