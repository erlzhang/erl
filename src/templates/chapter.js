import React, { useState } from "react";
import Summary from "../components/summary";
import {
  Left, Right, Ellipsis
} from "../components/icons";
import { graphql } from "gatsby"
import Layout from "../components/layout";
import {
  parseSummary,
  getPrevAndNext
} from "../utils/summary";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Chapter({ data }) {
  const post = data.markdownRemark;
  const site = data.site.siteMetadata;

  const [showSummary, setShowSummary] = useState(false);

  const summary = parseSummary(data.summary, data.book, post.fields.slug);
  const { prev, next } = getPrevAndNext(post.fields.slug, summary);

  const title = post.headings[0].value;

  return (
    <Layout>
      <div className={`book__wrapper sidebar-right${showSummary?' with-summary': ''}`} id="bookMain">
        <Summary summary={summary}></Summary>
        <div className="book__body">
          <div className="body__inner">
            <Header
              site={site}
            ></Header>
            <div class="book-header" role="navigation">
              <a
                href="#"
                id="summaryToggler"
                class={`summary__toggler${showSummary?' active':''}`}
                onClick={() => setShowSummary(!showSummary)}
              >
                <Ellipsis></Ellipsis>
              </a>
              <h1>
                {title} - {data.book.fields.title}
              </h1>
            </div>
            <main className="chapter__wrapper" tabindex="-1" role="main">
              <div className="chapter__inner">
                <article
                  className="chapter__content content"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
              </div>
              <Footer site={site}></Footer>
            </main>
          </div>
          {
            prev &&
            <a href={prev.href} className="navigation navigation-prev" aria-label={`Previous page: ${ prev.title }`}>
              <Left></Left>
            </a>
          }
          {
            next &&
            <a href={next.href} className="navigation navigation-next" aria-label={`Next page: ${ next.title }`}>
              <Right></Right>
            </a>
          }
        </div>
      </div>
    </Layout>
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