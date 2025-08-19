/*---------------------------SignUp Form------------------------------*/
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfmpassword, setCnfmpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let signupData = {
      fullName: username,
      email: email,
      password: password,
      confirmPassword: cnfmpassword,
    };
    const res = await axios.post(
      "https://hr-admin-server.onrender.com/api/auth/register",
      signupData
    );
    if (res.status == 201) {
      console.log(res);
    }
    // let users = localStorage.setItem('users', JSON.stringify(users));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Full Name: </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Full Name"
        />
        <br />
        <label>Email: </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <label>Password: </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <label>Confirm Password: </label>
        <input
          value={cnfmpassword}
          onChange={(e) => setCnfmpassword(e.target.value)}
          type="password"
          placeholder="Confirm Password"
        />
        <br />
        <button type="submit">Submit </button>
      </form>
    </>
  );
};

export default SignUp;

/*---------------------------Login Form------------------------------*/

import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let loginData = {
      email: email,
      password: password,
    };
    const res = axios.post(
      "https://hr-admin-server.onrender.com/api/auth/login",
      loginData
    );
    if (res.status == 201) {
      console.log(res);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="Email"
          placeholder="Email"
        />
        <br />
        <label>Password: </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="Password"
          placeholder="Password"
        />
        <br />
        <button type="submit">Submit </button>
      </form>
    </>
  );
};

export default Login;


/*---------------------------E-commerce with Api call------------------------------*/

import { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>E-Commerce Store</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "25px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
            />
            <h4 style={{ fontSize: "14px", margin: "10px 0" }}>{p.title}</h4>
            <p style={{ fontWeight: "bold" }}>${p.price}</p>
            <button
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
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

