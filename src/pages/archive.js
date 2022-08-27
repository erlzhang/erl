import React, { useState } from "react";
import Layout from "../components/layout";
import Footer from "../components/footer";
import Header from "../components/header";
import { graphql } from "gatsby"
import { getAllCategories, getDate, getWordCountOfBooks } from "../utils/book";
import Social from "../components/social";

function SiteInfo({ site }) {
  return (
    <>
      <h1>
        <a href="/about">{ site.title }</a>
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

  const wordCounts = getWordCountOfBooks(
    data.allMarkdownRemark.nodes,
    books
  );

  const items = books.filter(book => filtered == "全部" || filtered === book.fields.category).map((book) => {
    return (
      <li
        className={`archive__item${(!hovered || hovered === book.slug)?'':' fade'}`}
        key={book.slug}
        onMouseEnter={() => setHovered(book.slug)}
      >
        <a href={`/${book.slug}`} className="archive__link clearfix">
          <span className="archive__time">{ getDate(book) }</span>
          <span className="archive__title">{ book.fields.title }</span>
          <span className="archive__tag">{ book.fields.category }</span>
          <span className="archive__meta">{ wordCounts[book.slug] }字</span>
        </a>
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
    books.filter(book => filtered == "全部" || filtered === book.fields.category)
         .forEach(book => {
            sum += wordCounts[book.slug];
         });
    return sum;
  }

  return (
    <Layout>
      <Header site={site} isArchive={true}></Header>
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
              <span className="archive__meta">总字数：{getWordCountSum()}</span>
            </div>
          </div>
        </div>
        <Footer site={site}></Footer>
      </main>
    </Layout>
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
    allBook(sort: {fields: fields___end, order: DESC}) {
      nodes {
        fields {
          title
          start
          end
          img
          category
        }
        slug
      }
    }
    allMarkdownRemark(
      filter: {
        fields: {
          index: {ne: true},
          summary: {ne: true}
        }
      }
    ) {
      nodes {
        fields {
          book,
          wordCount
        }
      }
    }
  }
  
`