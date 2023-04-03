import React from "react";
import { graphql } from "gatsby"

import Slides from "../components/slides";
import Header from "../components/header";

export default function({ data }) {
  const slides = data.allBook.nodes;
  const site = data.site.siteMetadata;
  return (
    <div className="home">
      <Header site={site}></Header>
      <Slides site={site} slides={slides}></Slides>
    </div>
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
    allBook(sort: {fields: [summary___end,summary___start], order: [DESC,DESC]}, limit: 4) {
      nodes {
        summary {
          title
          start
          end
          img
          slug
        }
        name
      }
    }
  }

`
