import React from "react";
import { graphql } from "gatsby"

import Layout from "../components/layout"

export default function Post({data}) {
  const siteInfo = data.site.siteMetadata;
  const post = data.markdownRemark;
  return (
    <Layout siteInfo={siteInfo}>
      <article>
        <h1>{ post.frontmatter.title }</h1>
        <div className="content" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        description
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`