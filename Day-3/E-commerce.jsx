/* This e-commerce website is withou styling
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
    
