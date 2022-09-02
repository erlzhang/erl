import React from "react";
import { graphql, Link } from "gatsby";

export default function({ data }) {
  const site = data.site.siteMetadata
  return (
    <div className="error-container">
      <h1 className="error-title">404</h1>
      <p className="error-hint"><strong>Page not found :(</strong></p>
      <Link to="/" className="error-link">Back to { site.title }</Link>
    </div>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        description
        title
      }
    }
  }
  
`

export const Head = ({data}) => {
  const site = data.site.siteMetadata;
  return (
    <>
      <title>404 | { site.title }</title>
    </>
  )
}