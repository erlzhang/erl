import React from "react";
import { Link } from "gatsby";

export default function({ site }) {
  return (
    <footer className="site-footer">
      <Link to="/about">{ site.title }</Link> © { new Date().getFullYear() }
    </footer>
  )
}