import React from "react";
import {
  Ellipsis,
  Logo
} from "../components/icons";
import { graphql, Link } from "gatsby"
import Footer from "../components/footer";
import ContextConsumer from "../layouts/Context"
import Navigation from "../components/navi";

export default function Chapter({ data }) {
  const post = data.chapter;
  const site = data.site.siteMetadata;
  const bookTitle = data.book.title;

  const { title, prev, next } = post;

  return (
    <>
      <div className="body__inner">
        <div className="book-header" role="navigation">
          <Link to="/" className="logo">
            <Logo/>
          </Link>
          <h1 className="book-title">《{ bookTitle }》</h1>
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
              <h1 class="chapter__title">{ title }</h1>
            </header>
            <article
              className="chapter__content content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="mobile-navigation">
              <Navigation prev={prev} next={next}></Navigation>
            </div>
          </div>
        </main>
        <Footer site={site}/>
      </div>
    </>
  )
}

export const Head = ({data}) => {
  const site = data.site.siteMetadata;
  const book = data.book;
  const post = data.chapter;

  const { title } = post;
  return (
    <>
      <title>{ title } - { book.title } | { site.title }</title>
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
        about
        github
      }
    }
    chapter(slug: {eq: $slug}) {
      title
      slug
      prev {
        slug
        title
      }
      content
      next {
        slug
        title
      }
    }
    book(name: {eq: $book}) {
      summary {
        children {
          slug
          title
        }
        slug
        title
      }
      title
      name
      content
    }
  }
`
