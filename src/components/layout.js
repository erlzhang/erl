import React, { useState } from "react";

import "normalize.css";
import "../sass/main.scss";

export default function Layout({ children, layout }) {
  const inited = localStorage.getItem("dark-mode");
  console.warn("inited", inited);

  const [darkMode, setDarkMode] = useState(inited === 'true');

  const toggleDarkMode = () => {
    localStorage.setItem("dark-mode", !darkMode);
    setDarkMode(!darkMode);
  }

  return (
    <div className={`container${darkMode?' dark-mode':''}`}>
      {/* <div
        className="dark-btn"
        onClick={toggleDarkMode}
      >
        {
          darkMode ?
          <Moon></Moon> :
          <Sun></Sun>
        }
      </div> */}
      { children }
    </div>
  )
}