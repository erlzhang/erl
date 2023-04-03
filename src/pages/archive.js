import React, { useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { graphql, Link } from "gatsby"
import {
  getAllCategories,
  getDate,
  formatNum
} from "../utils/book";
import Social from "../components/social";
import {
  Logo
} from "../components/icons";

function SiteInfo({ site }) {
  return (
    <>
      <h1>
        <Link to="/about">{ site.title }</Link>
      </h1>
      <div className="archive__header_intro">
        { site.description }
      </div>
      <Social site={site}></Social>
    </>
  )
}

export default function({ data }) {
  const books = data.allBook.nodes;
  const site = data.site.siteMetadata;
  const categories = getAllCategories(books);

  const [hovered, setHovered] = useState(false);
  const [filtered, setFiltered] = useState(categories[0]);

  const items = books.filter(book => filtered == "全部" || filtered === book.summary.category).map((book) => {
    return (
      <li
        className={`archive__item${(!hovered || hovered === book.name)?'':' fade'}`}
        key={book.name}
        onMouseEnter={() => setHovered(book.name)}
      >
        <Link to={book.summary.slug} className="archive__link clearfix">
          <span className="archive__time">{ getDate(book.summary) }</span>
          <span className="archive__title">{ book.summary.title }</span>
          <span className="archive__tag">{ book.summary.category }</span>
          <span className="archive__meta">{ book.summary.wordCount }字</span>
        </Link>
      </li>
    )
  });

  const tags = categories.map(category => {
    return (
      <span
        className={`archive__tag${filtered === category ? ' active' : ''}`}
        key={category}
        onClick={() => setFiltered(category)}
      >
        { category }
      </span>
    )
  })

  const getWordCountSum = () => {
    let sum = 0;
    books.filter(book => filtered == "全部" || filtered === book.summary.category)
         .forEach(book => {
            sum += book.summary.wordCount;
         });
    return sum;
  }

  return (
    <div className="archive-container">
      <Link to="/" className="logo">
        <Logo/>
      </Link>
      <main className="archive">
        <div
          className="archive__header"
        >
          <SiteInfo site={site}></SiteInfo>
        </div>
        <div className="archive__content">
          <div className="archive__list">
            <div className="archive__tags">
              { tags }
            </div>
            <ul onMouseLeave={() => setHovered(0)}>
              { items }
            </ul>
            <div className="archive__bottom">
              <span className="archive__meta">总字数：{formatNum(getWordCountSum())}</span>
            </div>
          </div>
        </div>
        <Footer site={site}></Footer>
      </main>
    </div>
  )
}

export const Head = ({data}) => {
  const site = data.site.siteMetadata;
  return (
    <>
      <title>归档 | { site.title }</title>
    </>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        description
        title
        email
        github
        imgPrefix
        logo
      }
    }
    allBook(sort: {fields: [summary___end,summary___start], order: [DESC,DESC]}) {
    nodes {
      summary {
        slug
        wordCount
        title
        start
        end
        category
      }
      name
    }
  }
  }

`
