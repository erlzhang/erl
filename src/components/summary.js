import React from "react";
import { Link } from "gatsby";
import { Close } from "./icons";
import {formatNum } from "../utils/book";

function ListItem({ item, onClick, className }) {
  const children =
    item.children &&
    item.children.map((sub) => {
      return <ListItem onClick={onClick} key={sub.slug} item={sub}></ListItem>;
    });
  let _className = "chapter";
  if (children && children.length > 0) {
    _className += " volume";
  }
  if (className) {
    _className += " " + className;
  }
  return (
    <li className={_className}>
      <Link
        title={item.title}
        onClick={onClick}
        to={item.slug}
        activeStyle={{ color: "var(--blue)" }}
      >
        {item.title}
      </Link>
      {children && children.length > 0 && (
        <ul className="articles">{children}</ul>
      )}
    </li>
  );
}

export default function ({ book, handleClose, content, children, chapters, volume, wordCount }) {
  const handleLinkClick = (e) => {
    const width = window.innerWidth;
    if (width > 1200) {
      return;
    }

    setTimeout(() => {
      handleClose && handleClose();
    }, 300);
  };

  // const chapters = book.summary;

  const posts = chapters.map((post) => {
    return (
      <ListItem
        onClick={handleLinkClick}
        key={post.slug}
        item={post}
      ></ListItem>
    );
  });

  return (
    <>
      <div className="book-summary" id="bookSummary">
        <span className="close-summary" onClick={handleClose}>
          <Close></Close>
        </span>
        <div className="header">
          {
            volume ?
            <Link
              title={book.title}
              to={'/' + book.name}
            ><h1>{book.title}</h1>
            </Link> :
            <h1>{book.title}</h1>
          }
          {
            volume &&
            <h2>{volume.title}</h2>
          }
          <div className="summary__desc">
            {formatNum(wordCount)}
            {/* {book.content.split("\n").map((line) => {
              return <p>{line}</p>;
            })} */}
          </div>
        </div>
        <nav role="navigation">
          <ul className="summary">{posts}</ul>
        </nav>
        {
          volume &&
          <nav role="navigation">
            <ul className="summary-nav">
              {
                volume.prev &&
                <Link to={volume.prev.indexPath}>
                  <li>上一卷：{volume.prev.title}</li>
                </Link>
              }
              {
                volume.next &&
                <Link to={volume.next.indexPath}>
                  <li>下一卷：{volume.next.title}</li>
                </Link>
              }
            </ul>
          </nav>
        }
        <div className="summary__footer">{children}</div>
      </div>
    </>
  );
}
