import React from "react";
import { Link } from "gatsby";
import { Close } from "./icons";

function ListItem({ item, onClick, className }) {
  const children = item.children && item.children.map(sub => {
    return (
      <ListItem
        onClick={onClick}
        key={sub.slug}
        item={sub}
      ></ListItem>
    )
  })
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
      >{ item.title }</Link>
      {
        children && children.length > 0 &&
        <ul className="articles">
          { children }
        </ul>
      }
    </li>
  )
}

export default function({ book, handleClose, content, children }) {
  const handleLinkClick = (e) => {
    const width = window.innerWidth;
    if (width > 1200) {
      return;
    }

    setTimeout(() => {
      handleClose && handleClose();
    }, 300);
  }

  const chapters = book.summary;

  const posts = chapters.map(post => {
    return (
      <ListItem
        onClick={handleLinkClick}
        key={post.slug}
        item={post}
      ></ListItem>
    )
  })

  return (
    <>
    <div className="book-summary" id="bookSummary">
        <span className="close-summary" onClick={handleClose}>
          <Close></Close>
        </span>
          <div className="header">
            <h1>{ book.title }</h1>
            <div className="summary__desc">
              {
                book.content.split('\n').map(line => {
                  return (
                    <p>{ line }</p>
                  )
                })
              }
            </div>
          </div>
        <nav role="navigation">
          <ul className="summary">
            { posts }
          </ul>
        </nav>
        <div className="summary__footer">
          { children }
        </div>
      </div>
    </>
  )
}
