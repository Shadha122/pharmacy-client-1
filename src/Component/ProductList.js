import React, { useState, useEffect } from 'react';
import './ProductList.css';
 
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
 
    fetchProducts();
  }, []);
 
  // Search functionality
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  // Add product to the cart
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find((item) => item.productId === product._id);
 
    if (existingProduct) {
      // Increment quantity if the product already exists
      existingProduct.quantity += 1;
    } else {
      // Add the new product with quantity 1
      cart.push({
        productId: product._id, // Use productId for the backend
        productName: product.productName,
        price: product.price,
        imageURL: product.imageURL, // Store imageURL
        quantity: 1,
      });
    }
 
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.productName} added to cart`);
  };
 
  return (
    <div className="product-container">
      <h1 className="product-header">Products</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.imageURL} alt={product.productName} className="product-image" />
            <h2>{product.productName}</h2>
            <p>OMR {product.price.toFixed(3)}</p>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default ProductList;