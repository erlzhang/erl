import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { graphql, Link } from "gatsby"
import {
  parseSummary,
  getPrevAndNext
} from '../utils/summary';
import { getImgCover } from "../utils/style";

export default function({ data }) {
  const post = data.markdownRemark;
  const site = data.site.siteMetadata;
  const book = data.book;

  const path = `/${book.slug}`

  const summary = parseSummary(data.summary, book, null);
  const { next } = getPrevAndNext(path, summary);

  return (
    <>
      <div className="book sidebar-right">
        <Header site={site}></Header>
        <div
          className="book__cover"
          style={getImgCover(site.imgPrefix + book.fields.img)}
        >
        </div>
        <div className="book__content">
          <div className="book__content_inner">
            <h1 className="book__title">{ book.fields.title }</h1>
            <div className="book__desc" dangerouslySetInnerHTML={{ __html: post.html }}>
            </div>
            {
              next &&
              <Link to={next.href} className="book__more">
                <div className="book__icon">
                  <svg width="80" height="80">
                    <circle className="circle-progress" r="36" cy="40" cx="40"  stroke-linejoin="round" stroke-linecap="round" />
                  </svg>
                  <span className="book__icon_arrow"></span>
                </div>
              </Link>
            }
            
            </div>
          <Footer site={site}></Footer>
        </div>
      </div>
    </>
  )
}

export const Head = ({data}) => {
  const site = data.site.siteMetadata;
  const book = data.book;
  return (
    <>
      <title>{ book.fields.title } | { site.title }</title>
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
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html,
      fields {
        slug
      }
    }
    book(slug: {eq: $book}) {
      fields {
        title
        img
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