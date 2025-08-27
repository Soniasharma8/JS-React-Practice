/* --------------------ThemeContext.jsx  -------------------- */

import { createContext } from "react";

export const ThemeContext = createContext();
/* --------------------Child.jsx  -------------------- */
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";


function Child() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`child-box ${theme}`}>
      <h2>Current Theme: {theme}</h2>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default Child;

/* --------------------App.jsx.jsx  -------------------- */
import React, { useState } from "react";
import { ThemeContext } from "./components/ThemeContext";
import Child from "./components/Child";
import "./index.css";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-container ${theme}`}>
        <h1>Theme Toggle Using Context API</h1>
        <Child />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;


/* --------------------index.css  -------------------- */

.child-box {
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin: 20px auto;
  max-width: 400px;
  transition: all 0.3s ease-in-out;
}

/* Light Theme */
.child-box.light {
  background: white;
  color: black;
  border: 1px solid #ddd;
}

/* Dark Theme */
.child-box.dark {
  background: #222;
  color: white;
  border: 1px solid #444;
}

.child-box button {
  padding: 10px 20px;
  margin-top: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.child-box button:hover {
  background: #0056b3;
}


/* General Reset */
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  transition: background 0.3s ease, color 0.3s ease;
}

/* App container theme */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
}

/* Light Theme */
.app-container.light {
  background: #f9f9f9;
  color: #222;
}

/* Dark Theme */
.app-container.dark {
  background: #121212;
  color: #f9f9f9;
}

/* Heading */
h1 {
  margin-bottom: 20px;
  font-size: 28px;
}
