import React from "react";
import Social from "../components/social";
import { Link } from "gatsby";

export default function({ site }) {
  return (
    <>
      <aside className="post__contact">
        <Link to="/about/"><h4>{ site.title}</h4></Link>
        <p>{ site.description }</p>
        <Social site={site}></Social>
      </aside>
    </>
  );
}