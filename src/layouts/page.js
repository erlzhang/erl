import React, { useState } from "react";
import Social from "../components/social";
import Footer from "../components/footer";
import { graphql, Link } from "gatsby";

function SiteInfo({ site }) {
  return (
    <>
      <Link href="/"><h1>{site.title}</h1></Link>
      <div className="archive__header_intro">
        {site.description}
      </div>
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
