import React, { useState } from "react";
import Footer from "../components/footer";
import { graphql, Link } from "gatsby";
import { getAllCategories, getDate, formatNum } from "../utils/book";
import Social from "../components/social";
import Subscribe from "../components/subscribe";

function SiteInfo({ site }) {
  return (
    <>
      <h1>{site.title}</h1>
      <div className="archive__header_intro">{site.description}</div>
      <Social site={site}></Social>
    </>
  );
}

function BookEntry({ book, fade, onHover }) {
  return (
    <div
      className={`archive__item${fade ? "" : " fade"}`}
      onMouseEnter={() => onHover(book.name)}
    >
      <Link to={book.summary[0].slug} className="archive__link clearfix">
        <h2 class="archive__item_header">
          <span className="archive__title">{book.title}</span>
          <span className="archive__time">{getDate(book)}</span>
        </h2>
        <div class="archive__desc">{book.content}</div>
        {/* <div class="archive__item_footer">
          <span className="archive__meta">{formatNum(book.wordCount)}</span>
        </div> */}
      </Link>
    </div>
  );
}

export default function ({ data }) {
  const books = data.allBook.nodes;
  const site = data.site.siteMetadata;
  const categories = getAllCategories(books);

  const [hovered, setHovered] = useState(false);
  const [filtered, setFiltered] = useState(categories[0]);

  const items = books
    .filter((book) => filtered == "全部" || filtered === book.category)
    .map((book) => {
      return (
        <BookEntry
          book={book}
          fade={!hovered || hovered === book.name}
          onHover={() => setHovered(book.name)}
        />
      );
    });

  const tags = categories.map((category) => {
    return (
      <span
        className={`archive__tag${filtered === category ? " active" : ""}`}
        key={category}
        onClick={() => setFiltered(category)}
      >
        {category}
      </span>
    );
  });

  return (
    <div className="archive-container">
      <main className="archive">
        <div className="archive__header">
          <SiteInfo site={site}></SiteInfo>
        </div>
        <div className="archive__content">
          <div className="archive__list">
            <div className="archive__tags">{tags}</div>
            <div onMouseLeave={() => setHovered(0)}>{items}</div>
          </div>
        </div>
        <Subscribe></Subscribe>
        <Footer site={site}></Footer>
      </main>
    </div>
  );
}

export const Head = ({ data }) => {
  const site = data.site.siteMetadata;
  return (
    <>
      <title>{site.title}</title>
    </>
  );
};

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
    allBook(sort: { fields: [end, start], order: [DESC, DESC] }) {
      nodes {
        slug
        wordCount
        title
        start
        end
        category
        content
        summary {
          slug
        }
        name
      }
    }
  }
`;
