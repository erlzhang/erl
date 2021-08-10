import React from "react"
import { graphql } from "gatsby"
import "../styles/index.css"
//import "../sass/main.scss"
import Layout from "../components/layout"

function Block({ children, title, link }) {
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
      <a href={item.url} target="_blank">
        <img src={item.img} />
      </a>
    </li>
  )
}

function LabIndex({ items }) {
  return (
    <Block title="🎄 Something Interesting" link="/lab">
      <ul className="labs-block clearfix">
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
    <Block title="🖊️ Recent Posts" link="/blog">
      <ul>
        { items.map(item => <PostItem item={item}></PostItem>) }
      </ul>
    </Block>
  )
}

function About({about, children}) {
  return (
    <Block>
      <article className="content" dangerouslySetInnerHTML={{ __html: about.html }} />
      { children }
    </Block>
  )
}

function Social({items}) {
  let labels = items.map((item) => {
    return (
      <a href={item.url} className="about-link">{ item.title }</a>
    )
  })
  return (
    <div className="social">
      { labels }
    </div>
  )
}

export default function Index({ data }) {
  let siteInfo = data.site.siteMetadata;
  //<Posts items={data.allMarkdownRemark.nodes}></Posts>
  return (
    <Layout siteInfo={siteInfo}>
      <About about={data.about}>
        <Social items={data.allSocialYaml.nodes}></Social>
      </About>
      <LabIndex items={data.allLabYaml.nodes}></LabIndex>
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
    allSocialYaml {
      nodes {
        title
        url
      }
    }
    allLabYaml(sort: {fields: year, order: DESC}, limit: 10) {
      nodes {
        title
        url
        img
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
      sort: {fields: frontmatter___date, order: DESC},
      limit: 5,
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