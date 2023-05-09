import React, { useEffect, useState } from "react";
import {
  Ellipsis,
  Logo
} from "../components/icons";
import { graphql, Link } from "gatsby"
import Header from "../components/header";
import Footer from "../components/footer";
import ContextConsumer from "../layouts/Context"
import Subscribe from "../components/subscribe";
import Navigation from "../components/navigation";

function getTitle(title, index, isVolume) {
  let str = "";
  if (!isVolume && index > 0 && index < 100) {
    str += index + ". ";
  }
  str += title;
  return str;
}

export default function Chapter({ data, pageContext }) {
  const post = data.markdownRemark;
  const site = data.site.siteMetadata;
  const summary = data.book.summary.chapters;
  const bookTitle = data.book.summary.title;

  const { title, index, img } = post.frontmatter;
  const { prev, next, isVolume } = post.fields;

  return (
    <>
      <div className="body__inner">
        <div className="book-header" role="navigation">
          <Link to="/archive" className="logo">
            <Logo/>
          </Link>
          <ContextConsumer>
            {({ data, set }) => (
              <div className="book-header-actions">
                <span
                  className="summary__toggler"
                  onClick={() => set({showSummary: !data.showSummary})}
              >
                  <Ellipsis></Ellipsis>
                </span>
              </div>
            )}
          </ContextConsumer>
        </div>
        <main className="chapter__wrapper" tabindex="-1" role="main">
          <div className="chapter__inner">
            <header className="chapter__header">
              <h1 class="chapter__title">{ getTitle(title, index, isVolume) }</h1>
            </header>
            {
              isVolume && img &&
              <figure className="chapter__figure">
                <img src={site.imgPrefix + img} alt={title}/>
              </figure>
            }
            <article
              className="chapter__content content"
              dangerouslySetInnerHTML={{ __html: post.html.replaceAll('/img/', site.imgPrefix+'/img/') }}
            />
            <div className="mobile-navigation">
              <Navigation prev={prev} next={next}></Navigation>
            </div>
            <Subscribe book={bookTitle} site={site}/>
          </div>
          <Footer site={site}></Footer>
        </main>
      </div>
    </>
  )
}

export const Head = ({data}) => {
  const site = data.site.siteMetadata;
  const book = data.book;
  const post = data.markdownRemark;

  const { title, index, img } = post.frontmatter;
  const { prev, next, isVolume } = post.fields;
  return (
    <>
      <title>{ getTitle(title, index, isVolume) } - { book.summary.title } | { site.title }</title>
    </>
  )
}

export const query = graphql`
  query($slug: String!, $book: String!) {
    site {
      siteMetadata {
        title
        imgPrefix
        logo
        email
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
    fields {
      next {
        title
        slug
      }
      prev {
        slug
        title
      }
      slug
      isVolume
    }
    frontmatter {
      title
      index
      img
    }
    html
  }
  book(name: {eq: $book}) {
    summary {
      chapters {
        title
        slug
        children {
          title
          slug
        }
      }
      title
      slug
    }
    name
  }
  }
`
