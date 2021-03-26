import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

function Item({ item }) {
  return (
    <div className="lab-item">
      <h1><a href={item.url} target="_blank">{ item.title }</a></h1>
      <p>Keywords: { item.keywords.join(",") }</p>
      <p>Made in { item.year }</p>
      { item.description }
    </div>
  )
}

export default function Lab({data}) {
  const items = data.allLabYaml.nodes;
  const siteInfo = data.site.siteMetadata;
  return (
    <Layout siteInfo={siteInfo}>
      { items.map(item => <Item item={item}></Item>) }
    </Layout>
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
    allLabYaml(sort: {fields: year, order: DESC}) {
      nodes {
        id
        img
        description
        title
        url
        year
        keywords
      }
    }
  }
  
`