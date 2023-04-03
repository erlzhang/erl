import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { graphql, Link } from "gatsby"
import { getImgCover } from "../utils/style";
import {
  getDate,
  formatNum
} from "../utils/book";
import {
  Logo
} from "../components/icons";
import {
  getLastReadChapter
} from "../utils/reader";

export default function({ data, pageContext }) {
  const book = data.markdownRemark;
  const site = data.site.siteMetadata;
  //let next = book.fields.next;
  const wordCount = data.book.summary.wordCount;
  const chapters = data.book.summary.chapters;

  let next = getLastReadChapter(pageContext.book, chapters);

  return (
    <>
      <div className="book sidebar-right">
        <Link to="/archive" className="logo">
          <Logo/>
        </Link>
        <div
          className="book__cover"
          style={getImgCover(site.imgPrefix + book.frontmatter.img)}
        >
        </div>
        <div className="book__content">
          <div className="book__content_inner">
            <footer className="book__meta">
              <span>{ book.frontmatter.category }</span>
              <span>{ getDate(book.frontmatter) }</span>
              <span>{ formatNum(wordCount) }字</span>
            </footer>
            <h1 className="book__title">{ book.frontmatter.title }</h1>
            <div className="book__desc" dangerouslySetInnerHTML={{ __html: book.html }}>
            </div>
            {
              next &&
              <Link
                to={next.slug}
                title={`继续阅读：${next.title}`}
                className="book__more"
              >
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
  const book = data.markdownRemark;
  return (
    <>
      <title>{ book.frontmatter.title } | { site.title }</title>
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
      }
    }
    book(name: {eq: $book}) {
      summary {
        wordCount
        chapters {
          title
          slug
          children {
            title
            slug
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html,
      fields {
        slug
      }
      frontmatter {
        title
        img
        start
        end
        category
      }
    }
  }
`
