import React from "react";

import "normalize.css";
import "../styles/common.css"
//import "../sass/main.scss";

import Header from "./header"

export default function Layout({ children, siteInfo }) {
  return (
    <div className="container">
      <Header siteInfo={siteInfo}></Header>
      { children }
    </div>
  )
}