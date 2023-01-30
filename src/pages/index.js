import React from "react";
import { graphql } from "gatsby"

import Slides from "../components/slides";
import Header from "../components/header";

export default function({ data }) {
  const slides = data.allBook.nodes;
  const site = data.site.siteMetadata;
  return (
    <>
      <Header site={site}></Header>
      <Slides site={site} slides={slides}></Slides>
    </>
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
        imgPrefix
        logo
      }
    }
    allBook(sort: {fields: [fields___end,fields___start], order: [DESC,DESC]}, limit: 4) {
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