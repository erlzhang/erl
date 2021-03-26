import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import "../styles/index.css"

function Block({ children, title }) {
  let blockTitle = <h2 className="block-title">{ title }</h2>
  return (
    <div className="block">
      { title ? blockTitle : "" }
      { children }
    </div>
  )
}

function LabItem({ item }) {
  return (
    <li className="lab-item">
      <a href={item.url} target="_blank">{ item.title }</a>
    </li>
  )
}

function LabIndex({ items }) {
  return (
    <Block title="Something Interesting">
      <ul>
        { items.map(item => <LabItem item={item}/>) }
      </ul>
    </Block>
  )
}

function PostItem({ item }) {
  return (
    <li className="post-item">
      <a href={item.fields.slug} target="_blank">{ item.frontmatter.title }</a>
    </li>
  )
}

function Posts({ items }) {
  return (
    <Block title="Recent Posts">
      <ul>
        { items.map(item => <PostItem item={item}></PostItem>) }
      </ul>
    </Block>
  )
}

function About({about}) {
  return (
    <Block>
      <article className="content" dangerouslySetInnerHTML={{ __html: about.html }} />
    </Block>
  )
}

export default function Index({ data }) {
  let siteInfo = data.site.siteMetadata;
  return (
    <Layout siteInfo={siteInfo}>
      <About about={data.about}></About>
      <LabIndex items={data.allLabYaml.nodes}></LabIndex>
      <Posts items={data.allMarkdownRemark.nodes}></Posts>
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
    allLabYaml(sort: {fields: year, order: DESC}, limit: 10) {
      nodes {
        title
        url
      }
    }
    about: markdownRemark(frontmatter: {showInIndex: {eq: true}}) {
      html
      frontmatter {
        title
        showInIndex
      }
    }
    allMarkdownRemark(
      sort: {fields: frontmatter___date, order: DESC}
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