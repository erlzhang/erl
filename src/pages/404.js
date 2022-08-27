import React from "react";
import { graphql } from "gatsby";

export default function({ site }) {
  return (
    <div class="error-container">
      <h1 class="error-title">404</h1>
      <p class="error-hint"><strong>Page not found :(</strong></p>
      <a href="/" class="error-link">Back to { site.title }</a>
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