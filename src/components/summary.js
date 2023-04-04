import React from "react";
import Link from "gatsby-plugin-transition-link";
import { Close } from "./icons";
import { onEnterChapter } from "../utils/transitions/chapter";

function ListItem({ item, onClick, current, className }) {
  const children = item.children && item.children.map(sub => {
    return (
      <ListItem
        onClick={onClick}
        key={sub.slug}
        item={sub}
        current={current}
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
  if (item.slug === current) {
    _className += " active";
  }
  return (
    <li className={_className}>
      <Link
        title={item.title}
        onClick={onClick}
        to={item.slug}
        entry={onEnterChapter}
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

export default function({ summary, current, handleClose }) {
  const handleLinkClick = (e) => {
    const width = window.innerWidth;
    if (width > 1200) {
      return;
    }

    setTimeout(() => {
      handleClose && handleClose();
    }, 300);
  }

  const chapters = summary.chapters;

  const posts = chapters.map(post => {
    return (
      <ListItem
        onClick={handleLinkClick}
        key={post.slug}
        item={post}
        current={current}
      ></ListItem>
    )
  })

  return (
    <>
      <div className="book-summary" id="bookSummary">
        <span className="close-summary" onClick={handleClose}>
          <Close></Close>
        </span>
        <nav role="navigation">
          <ul className="summary">
            <ListItem onClick={handleLinkClick} item={summary} className="header"></ListItem>
            { posts }
          </ul>
        </nav>
      </div>
    </>
  )
}
