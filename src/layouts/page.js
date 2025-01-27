import React, { useState } from "react";
import Social from "../components/social";
import Footer from "../components/footer";
import { graphql, Link } from "gatsby";

function SiteInfo({ site }) {
  return (
    <>
      <h1>{site.title}</h1>
      <div className="archive__header_intro">
        {site.description}
      </div>
      <Social site={site}></Social>
    </>
  );
}

export default function App({ site, children }) {
  return (
      <div className="archive-container">
        <main className="archive">
          <div className="archive__header">
            <SiteInfo site={site}></SiteInfo>
          </div>
          <div className="archive__content">
            { children }
          </div>
          <Footer site={site}></Footer>
        </main>
      </div>
    );
}