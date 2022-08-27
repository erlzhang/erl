import React from "react";
import { graphql } from "gatsby"

import Layout from "../components/layout";
import Slides from "../components/slides";
import Header from "../components/header";

export default function({ data }) {
  const slides = data.allBook.nodes;
  const site = data.site.siteMetadata;
  return (
    <Layout>
      <Header site={site}></Header>
      <Slides slides={slides}></Slides>
    </Layout>
  )
}

export const Head = ({data}) => {
  const site = data.site.siteMetadata;
  return (
    <>
      <title>{ site.title }</title>
    </>
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
    allBook(sort: {fields: fields___end, order: DESC}, limit: 4) {
      nodes {
        fields {
          title
          start
          end
          img
        }
        slug
      }
    }
  }
  
`