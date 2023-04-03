import React, { useEffect, useState } from "react";
import {
  Ellipsis,
  Moon,
  Sun,
  Setting,
  Logo
} from "../components/icons";
import { graphql, Link } from "gatsby"
import Header from "../components/header";
import Footer from "../components/footer";
import ContextConsumer from "../layouts/Context"
import Subscribe from "../components/subscribe";
import Navigation from "../components/navigation";
import {
  setReadProgress
} from "../utils/reader";

export default function Chapter({ data, pageContext }) {
  const post = data.markdownRemark;
  const site = data.site.siteMetadata;
  const summary = data.book.summary.chapters;
  const bookTitle = data.book.summary.title;

  const { title, index } = post.frontmatter;
  const { prev, next, isVolume } = post.fields;

  const [progress, setProgress] = useState(0);

  let bindEvent = false;

  useEffect(() => {
    if (bindEvent) return;

    bindEvent = true;
    const dom = document.getElementById("book-body");
    const containerHeight = dom.offsetHeight;
    dom.onscroll = (e) => {
      const scroll = dom.scrollTop;
      const inner = document.querySelector(".chapter__wrapper");
      const innerHeight = inner.offsetHeight;
      const per = dom.scrollTop / (innerHeight - containerHeight);
      setProgress(per);
      setReadProgress(pageContext.book, pageContext.slug, per);
    }
  })

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
                <span
                  className="darkmode__toggler"
                  onClick={() => set({darkMode: !data.darkMode})}
              >
                  {
                    data.darkMode ?
                    <Sun/> :
                    <Moon/>
                  }
                </span>
              </div>
            )}
          </ContextConsumer>
        </div>
        <main className="chapter__wrapper" tabindex="-1" role="main">
          <div className="chapter__inner">
            <header className="chapter__header">
              {
                !isVolume && index > 0 && index < 100 &&
                <div className="chapter__index">CHAPTER { index }</div>
              }
              <h1 class="chapter__title">{ title }</h1>
            </header>
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
          <div className="read-progress">
            <div
              className="read-progress__inner"
              style={{
                width: progress * 100 + "%"
              }}
            >
            </div>
          </div>
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
      <title>{ post.frontmatter.title } - { book.summary.title } | { site.title }</title>
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
