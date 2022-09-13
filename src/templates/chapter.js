import React from "react";
import {
  Ellipsis
} from "../components/icons";
import { graphql } from "gatsby"
import Header from "../components/header";
import Footer from "../components/footer";
import ContextConsumer from "../layouts/Context"
import Subscribe from "../components/subscribe";
import Navigation from "../components/navigation";
import {
  parseSummary,
  getPrevAndNext
} from "../utils/summary";

export default function Chapter({ data }) {
  const post = data.markdownRemark;
  const site = data.site.siteMetadata;
  const summary = parseSummary(data.summary, data.book, post.fields.slug);
  const { prev, next } = getPrevAndNext(post.fields.slug, summary);

  const title = post.headings[0].value;

  return (
    <>
      <div className="body__inner">
        <Header
          site={site}
        ></Header>
        <div className="book-header" role="navigation">
          <ContextConsumer>
            {({ data, set }) => (
              <a
                href="#"
                id="summaryToggler"
                className={`summary__toggler${data.showSummary?' active':''}`}
                onClick={() => set({showSummary: !data.showSummary})}
              >
                <Ellipsis></Ellipsis>
              </a>
            )}
          </ContextConsumer>
          <h1>
            {title} - {data.book.fields.title}
          </h1>
        </div>
        <main className="chapter__wrapper" tabindex="-1" role="main">
          <div className="chapter__inner">
            <article
              className="chapter__content content"
              dangerouslySetInnerHTML={{ __html: post.html.replaceAll('/img/', site.imgPrefix+'/img/') }}
            />
            <div className="mobile-navigation">
              <Navigation prev={prev} next={next}></Navigation>
            </div>
            <Subscribe book={data.book.fields.title} site={site}/>
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
  return (
    <>
      <title>{ post.headings[0].value } - { book.fields.title } | { site.title }</title>
    </>
  )
}

export const query = graphql`
  query($slug: String!, $book: String!) {
    site {
      siteMetadata {
        description
        title
        imgPrefix
        logo
        email
        github
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html,
      fields {
        slug
      }
      headings(depth: h1) {
        value
      }
    }
    book(slug: {eq: $book}) {
      fields {
        title
      }
      slug
    }
    summary: markdownRemark(fields: {
      book: {eq: $book},
      summary: {eq: true}
    }) {
      htmlAst
    }
  }
`