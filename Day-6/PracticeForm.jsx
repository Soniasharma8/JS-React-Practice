/* -------------------- App.jsx  -------------------- */
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/signup">SignUp</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

/* -------------------- SignUp.jsx  -------------------- */

"use client";

import { useActionState, useEffect } from "react";

async function handleSignup(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    return "All fields are required";
  }
  console.log("Signup Data:", { name, email, password });

  const userData = { name, email, password };
  localStorage.setItem("user", JSON.stringify(userData));
  // console.log("saved to localstorage: ", userData);

  return `Signup successful for ${name}`;
}

export default function SignUp() {
  const [message, formAction, isPending] = useActionState(handleSignup, "");

  useEffect(() => {
    if (message) {
      console.log("SignUp data: ", message);
    }
  }, [message]);

  return (
    <form action={formAction}>
      <input type="text" name="name" placeholder="Enter name" /> <br />
      <input type="email" name="email" placeholder="Enter Email" /> <br />
      <input type="password" name="password" placeholder="Enter Password" />
      <br />
      <button type="submit" disabled={isPending}>
        SignUp
      </button>
      <p>{message}</p>
    </form>
  );
}

/* -------------------- Login.jsx  -------------------- */

"use client";

import { useActionState } from "react";

async function handleLogin(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return "All fields are required";
  }
  console.log("Login data: ", { email, password });

  return "Login Successful";
}

export default function Login() {
  const [message, formAction, isPending] = useActionState(handleLogin, "");

  return (
    <form action={formAction}>
      <input type="email" name="email" placeholder="Enter Email" /> <br />
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
      />{" "}
      <br />
      <button type="submit" disabled={isPending}>
        Login
      </button>
      <p>{message}</p>
    </form>
  );
}

