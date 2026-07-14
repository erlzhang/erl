import { graphql, Link } from "gatsby";
import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import {
    getDate,
    formatNum
} from '../utils/book'

function BookInfoBlock({ book }) {
    return (
        <div className="archive__header book__header">
            <h2 className="book__title">{book.title}</h2>
            <div className="book__desc">{book.content}</div>
            <div className="book__meta">
                <span>{getDate(book)}</span>
                <span>{book.finished ? '已完成' : '连载中' }</span>
                <span>{(book.wordCount / 10000).toFixed(1)}万字</span>
            </div>
        </div>
    )
}

function VolumeEntry({ volume, fade, onHover }) {
    const lines = volume.content.split('\n');
  return (
    <div
      className={`archive__item${fade ? "" : " fade"}`}
      onMouseEnter={() => onHover(volume.slug)}
    >
      <Link to={volume.indexPath} className="archive__link clearfix">
        <h2 class="archive__item_header">
          <span className="archive__title">{volume.title}</span>
        </h2>
        <div class="archive__desc volume__desc">
            {lines.map((line, i) => (
                <p key={i} className="volume__line">{line}</p>
            ))}
        </div>
        {/* <div class="archive__item_footer">
          <span className="archive__meta">{formatNum(book.wordCount)}</span>
        </div> */}
      </Link>
    </div>
  );
}


export default function Book({ data }) {
    const book = data.book;
    console.log('book', data);
    const site = data.site.siteMetadata;

     const [hovered, setHovered] = useState(false);

     const [partId, setPartId] = useState(book.parts[0].id);

    return (
        <div className="archive" style={{
            marginTop: "0.5rem"
        }}>
            <div className="site-info">
                <Link to="/"><h1 class="book-page-site">{site.title}</h1></Link>
            </div>
            <BookInfoBlock book={book}></BookInfoBlock>
            <div className="book__parts">
                {
                    book.parts.map(part => {
                        return <span
                            key={part.id}
                            className={part.id === partId ? 'active' : ''}
                            onClick={() => setPartId(part.id)}
                        >{part.title}</span>
                    })
                }
            </div>
            <div
                onMouseLeave={() => setHovered(0)}
                className="archive__content"
            >
                {
                    book.summary.filter(item => item.partId === partId).map(volume => {
                        return (
                            <VolumeEntry
                                key={volume.slug}
                                volume={volume}
                                fade={!hovered || hovered === volume.slug}
                                onHover={() => setHovered(volume.slug)}
                            />
                        );
                    })
                }
            </div>
            <Footer site={site}></Footer>
        </div>
    )
}

export const Head = ({ data }) => {
  const site = data.site.siteMetadata;
  const book = data.book.title;
  return (
    <>
      <title>{site.title}-{book}</title>
    </>
  );
};

export const query = graphql`
    query($book: String!) {
        site {
            siteMetadata {
                title
                imgPrefix
                description
            }
        }

        book(name: {eq: $book}) {
            parts {
                id
                title
            }
            summary {
                slug
                title
                content
                indexPath
                partId
            }
            title
            start
            end
            name
            content
            wordCount
            bookStatus
        }
    }
`