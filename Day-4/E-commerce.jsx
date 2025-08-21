/*----------------------------App.jsx--------------------------------*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext";
import Products from "./Products";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";
import "./Ecommerce.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

/*----------------------------Products.jsx--------------------------------*/

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="app-container">
      <h1 className="main-heading">🛍 E-Commerce Shop</h1>
      <h2 className="section-heading">All Products</h2>
      <Link to="/cart">
        <button className="section-cart-btn">Go to Cart</button>
      </Link>
      <div className="products-container">
        <div className="grid">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="card"
            >
              <img
                className="card-image"
                src={product.image}
                alt={product.title}
              />
              <h3 className="card-title">{product.title}</h3>
              <p className="card-price">${product.price}</p>
              <button className="card-button">View Details</button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

/*----------------------------ProductDetail.jsx--------------------------------*/

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "./CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
      <div className="detail-card">
        <img className="detail-image" src={product.image} alt={product.title} />
        <div className="detail-info">
          <h2>{product.title}</h2>
          <p className="detail-category">Category: {product.category}</p>
          <p className="detail-description">{product.description}</p>
          <h3 className="detail-price">${product.price}</h3>
          <button className="card-button" onClick={() => addToCart(product)}>
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

/*----------------------------CartContext.jsx--------------------------------*/


import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // localStorage se cart load karo
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // jab bhi cart update ho, localStorage me save karo
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //  Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  //  Remove from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  //  Quantity decrease
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decreaseQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);



/*----------------------------Cart.jsx--------------------------------*/

import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cart, addToCart, decreaseQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0)
    return (
      <div className="empty-cart-page">
        <h2 className="empty-cart">Your cart is empty 🛒</h2>;
        <button onClick={() => navigate("/")}>⬅ Back to Shop</button>;
      </div>
    );

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} width={80} />
          <div>
            <h4>{item.title}</h4>
            <p>${item.price}</p>
          </div>
          <div className="quantity-control">
            <button onClick={() => decreaseQty(item.id)}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => addToCart(item)}>+</button>
          </div>
          <button onClick={() => removeFromCart(item.id)}>❌ Remove</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;


/*----------------------------Ecommerce.jsx--------------------------------*/

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f4f4f9;
}

.app-container {
  text-align: center;
  padding: 20px;
}

.main-heading {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #222;
}

.products-container {
  max-width: 1200px;
  margin: auto;
}

.section-heading {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #222
}
.section-cart-btn {
  margin-bottom: 15px;
  background: #444;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  max-width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 10px;
}

.card-title {
  font-size: 1rem;
  margin: 10px 0;
  min-height: 40px;
  color: #333;
}

.card-price {
  font-weight: bold;
  margin: 5px 0;
  color: #007bff;
}

.card-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.card-button:hover {
  background: #0056b3;
}

/* Detail Page */

.detail-container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  text-align: left;
  height: 93vh;
}

.detail-card {
  display: flex;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.detail-image {
  width: 300px;
  height: 300px;
  object-fit: contain;
}

.detail-info {
  flex: 1;
  color:#222
}

.detail-description {
  margin: 10px 0;
  color: #555;
}

.detail-price {
  font-size: 1.5rem;
  color: #007bff;
}

.back-button {
  margin-bottom: 15px;
  background: #444;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}


/* Cart Page */
.cart-page {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #222;
  text-align: center;
  height:fit-content

}

.empty-cart {
  color: #222;
  text-align: center;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background:#ffffff;

}

.empty-cart-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;    
  background: #fff;
  color: #222;
  text-align: center;
}

.empty-cart-page button {
  margin-top: 20px;
  background: #444;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 12px 0;
  gap: 12px;
  color: #222;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-control button {
  background: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.quantity-control button:hover {
  background: #0056b3;
}

.cart-item button {
  background: rgb(49, 136, 250);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.cart-item button:hover {
  background: #579eeb;
}

.cart-page h3 {
  margin-top: 20px;
  text-align: right;
  font-size: 1.2rem;
  color: #222;
}
