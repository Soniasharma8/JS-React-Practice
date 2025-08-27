  /* --------------------App.jsx  -------------------- */
//npm install react-hook-form

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "./index.css"; 

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <h1 className="logo">MyApp</h1>
        <div className="nav-links">
          <Link to="/signup">SignUp</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

  /* --------------------SignUp.jsx  -------------------- */  
import React from "react";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = [...existingUsers, data];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert(`Signup Successful for ${data.name}`);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign Up</h2>
        <input {...register("name")} placeholder="Name" /> <br />
        <input {...register("email")} placeholder="Email" /> <br />
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        <br />
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
}

 /* --------------------Login.jsx  -------------------- */  
import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data: ", data);
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userFound = storedUsers.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (userFound) {
      alert(`Login Successful, Welcome ${userFound.name}`);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <input {...register("email")} placeholder="Email" /> <br />
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

 /* --------------------indec.css  -------------------- */  
/* Container ko center karna */
.signup-container {
 display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ff512f, #dd2476); /* pinkish gradient */
  font-family: Arial, sans-serif;
}

/* Form style */
.signup-form {
   background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
}

/* Heading */
.signup-form h2 {
  margin-bottom: 20px;
  color: #333;
}

/* Input fields */
.signup-form input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 14px;
  transition: border 0.3s ease;
}

/* Input focus effect */
.signup-form input:focus {
 border: 1px solid #ff512f;
}

/* Button */
.signup-form button {
  width: 100%;
  padding: 10px;
  margin-top: 12px;
  border: none;
  border-radius: 8px;
  background: #ff512f;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

/* Button hover */
.signup-form button:hover {
 background: #e03a2f;
}


/* Page Center */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ff512f, #dd2476); /* pinkish gradient */
  font-family: Arial, sans-serif;
}

/* Form style */
.login-form {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
}

/* Heading */
.login-form h2 {
  margin-bottom: 20px;
  color: #333;
}

/* Input */
.login-form input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 14px;
  transition: border 0.3s ease;
}

.login-form input:focus {
  border: 1px solid #ff512f;
}

/* Button */
.login-form button {
  width: 100%;
  padding: 10px;
  margin-top: 12px;
  border: none;
  border-radius: 8px;
  background: #ff512f;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-form button:hover {
  background: #e03a2f;
}


/* Reset */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fffbfb;
  padding: 12px 20px;
}

.logo {
  color: rgb(241, 17, 17);
  font-size: 20px;
  font-weight: bold;
}

/* Links */
.nav-links a {
  color: rgb(241, 17, 17);
  text-decoration: none;
  margin-left: 20px;
  font-weight: bold;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #f0a32f; /* orange on hover */
}



