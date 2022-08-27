import React, { useState } from "react";

import "normalize.css";
import "../sass/main.scss";

export default function Layout({ children, layout }) {

  return (
    <div className={`container`}>
      { children }
    </div>
  )
}