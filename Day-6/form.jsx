/* -------------------- Signup.jsx (new hook use - useStateAction ) -------------------- */

"use client";
import React from "react";
import { useActionState } from "react";

export default function SignUp() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const username = formData.get("username");
      const email = formData.get("email");
      const password = formData.get("password");

      if (!username || !email || !password) {
        return { success: false, message: "⚠️ All fields are required!" };
      }

      // Save user in localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push({ username, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      return { success: true, message: "✅ Signup Successful!" };
    },
    { success: null, message: "" }
  );

  return (
    <div>
      <h2>Signup Form</h2>

      <form action={formAction}>
        <input type="text" name="username" placeholder="Username" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit" disabled={isPending}>
          {isPending ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {state.message && (
        <p style={{ color: state.success ? "green" : "red" }}>
          {state.message}
        </p>
      )}
    </div>
  );
}

/* -------------------- Login.jsx (new hook use - useStateAction ) -------------------- */

"use client";
import React from "react";
import { useActionState } from "react";

export default function Login() {
  // useActionState -> (function, initialState)
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      // form se values le rahe hain
      const username = formData.get("username");
      const password = formData.get("password");

      if (!username || !password) {
        return { success: false, message: "⚠️ All fields are required!" };
      }

      // localStorage me users check karna
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userFound = users.find(
        (u) => u.username === username && u.password === password
      );

      if (userFound) {
        return { success: true, message: "✅ Login Successful!" };
      } else {
        return { success: false, message: "❌ Invalid Username or Password" };
      }
    },
    { success: null, message: "" } // initial state
  );

  return (
    <div>
      <h2>Login Form</h2>

      <form action={formAction}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* message show */}
      {state.message && (
        <p style={{ color: state.success ? "green" : "red" }}>
          {state.message}
        </p>
      )}
    </div>
  );
}


// 1. Function Components (basic use)
function welcome() {
  return <h2>Hello World!</h2>;
}
export default welcome;

//Counter Practice
import { useState, useEffect } from "react";
function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrease() {
    setCount(count + 1);
    console.log("Button Clicked! Clicked is", count + 1);
    // alert("clicked me")
  }

  function handleClick() {
    console.log("Button clicked!");
    
  }


  function handleMouseEnter() {
    console.log("Mouse Entered");
    
  }

  useEffect(() => {
    console.log("Counter value:", count);
  }, [count]);

  return (
    <>
      <h2>Count: {count}</h2>
      <button onClick={handleIncrease}  >Increase</button>
      { <button onClick={() => setCount(count + 1)}>Increase</button> }
  <button onClick={() => setCount(count - 1)}>Decrease</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={handleClick} onMouseEnter={handleMouseEnter}></button>
      
   
    </>
  );
}
export default Counter;

//Todo list
import { useState, useEffect } from "react";
function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInputs] = useState("");

  const addToDo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, input]);
    setInputs("");
  };
  useEffect(() => {
    console.log("Todo List:", todos);
  }, [todos]);

  return (
    <div>
      <h2>ToDo List</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInputs(e.target.value)}
        placeholder="Enter Task"
      />
      <button onClick={addToDo}>Add</button>

      <ul>
        {todos.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}
export default ToDoList;
