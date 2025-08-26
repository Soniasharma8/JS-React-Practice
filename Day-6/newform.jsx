// new form create using react form new feature

/* -------------------- App.jsx -------------------- */
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

/* -------------------- SignUp.jsx.jsx -------------------- */

import { useForm } from "react-hook-form";

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Signup data:", data);
    alert("SignUp Successful");
    localStorage.setItem("user", JSON.stringify(data));
  };

  const password = watch("password"); 

  return (
    <div>
      <h2>SignUp Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Full Name"
          {...register("fullname", { required: true })}
        />
        {errors.fullname && <p>Name is Required</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && <p>Email is Required</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true, minLength: 8 })}
        />
        {errors.password && <p>Password must be at least 8 characters.</p>}

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) => value === password || "Passwords do not match", 
          })}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <button type="submit">SignUp</button>
      </form>
    </div>
  );
}

export default SignUp;

/* -------------------- Login.jsx.jsx -------------------- */

import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      data.email === savedUser.email &&
      data.password === savedUser.password
    ) {
      alert("Login successsful");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
