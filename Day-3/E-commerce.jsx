/* This e-commerce website is without styling
***Step: 1   npm install axios react-router-dom
***Step: 2   Then src Folder create a Product.jsx and ProductDetails.jsx file

/*------------------------------------App.jsx------------------------------------------*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./Products";
import ProductDetails from "./ProductDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

/*------------------------------------Products.jsx------------------------------------------*/
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div>
      <h2>🛒 E-Commerce Store</h2>

      <div>
        {products.map((p) => (
          <div key={p.id} onClick={() => navigate(`/products/${p.id}`)}>
            <img src={p.image} alt={p.title} />
            <h4>{p.title}</h4>
            <p>${p.price}</p>
            <p>
              {p.description.length > 50
                ? p.description.substring(0, 50) + "..."
                : p.description}
            </p>
            <p>{p.category}</p>
            <p>⭐ {p.rating.rate} / 5</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("addTocart", p.id);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

/*------------------------------------ProductDetails.jsx------------------------------------------*/
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={() => navigate("/")}>← Back to Products</button>

      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <p>${product.price}</p>
      <p>{product.description}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;


/* This e-commerce website is is with styling both the add to cart button is working.
*** In this styling website add new Ecommerce.css file for styling

/*------------------------------------App.jsx------------------------------------------*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./Products";
import ProductDetail from "./ProductDetails";
import "./Ecommerce.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="main-heading">🛒 My E-Commerce Store</h1>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

/*------------------------------------Products.jsx------------------------------------------*/
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="products-container">
      <h2 className="section-heading">All Products</h2>
      <div className="grid">
        {products.map((p) => (
          <div
            key={p.id}
            className="card"
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <img className="card-image" src={p.image} alt={p.title} />
            <h4 className="card-title">{p.title}</h4>
            <p className="card-price">${p.price}</p>
            <button
              className="card-button"
              onClick={(e) => {
                e.stopPropagation();
                console.log("AddToCart", p.id);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

/*------------------------------------ProductDetails.jsx------------------------------------------*/
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams(); // URL ka id
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

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
          <button
            className="card-button"
            onClick={() => console.log("AddToCart", product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;


/*------------------------------------Ecommerce.css------------------------------------------*/
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

