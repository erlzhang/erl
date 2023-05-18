import React from "react";

import "../sass/main.scss";

export default function Layout({ children }) {

  return (
    <div className={`container`}>
      { children }
    </div>
  )
}
