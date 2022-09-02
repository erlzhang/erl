import React from "react";

import "normalize.css";
import "../sass/main.scss";

export default function Layout({ children }) {

  return (
    <div className={`container`}>
      { children }
    </div>
  )
}