import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

function PostItem({ item }) {
  return (
    <li class="post__list_item">
      <a href={item.fields.slug}>
        <span class="archive__time">{ item.frontmatter.date }</span>
        <span class="archive__title">{ item.frontmatter.title }</span>
      </a>
    </li>
  )
}

export default function({data}) {
  const items = data.allMarkdownRemark.nodes;
  const siteInfo = data.site.siteMetadata;

  let nodes = items.map(item => {
    console.log("date", item.frontmatter.date)
    return (
      <PostItem item={item}></PostItem>
    )
  })

  return (
    <Layout siteInfo={siteInfo}>
      <main class="post__archive" id="postArchive">
        <div class="post__list archive__list">
          <ul>
            { nodes }
          </ul>
        </div>
      </main>
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
    allMarkdownRemark(
      sort: {fields: frontmatter___date, order: DESC},
      filter: {frontmatter: {showInIndex: {ne: true}}}
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date
        }
      }
    }
  }
  
`