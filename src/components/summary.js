import React from "react";
import { Link } from "gatsby";
import { Close } from "./icons";

function ListItem({ item, onClick }) {
  const children = item.children && item.children.map(sub => {
    return (
      <ListItem onClick={onClick} key={sub.href} item={sub}></ListItem>
    )
  })
  return (
    // <li className="chapter {% if part.url == page.url -%}active{% endif -%}">
    <li className={`chapter${item.active ? ' active': ''}`}>
      <Link title={item.title} onClick={onClick} to={item.href}>{ item.title }</Link>
      {
        children && children.length &&
        <ul className="articles">
          { children }
        </ul>
      }
    </li>
  )
}

export default function({ summary, handleClose }) {
  const handleLinkClick = (e) => {
    const width = window.innerWidth;
    if (width > 1200) {
      return;
    }

    setTimeout(() => {
      handleClose && handleClose();
    }, 100);
  }

  const posts = summary.slice(1).map(post => {
    return (
      <ListItem onClick={handleLinkClick} key={post.href} item={post}></ListItem>
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
            {
              summary[0] &&
              <ListItem onClick={handleLinkClick} item={summary[0]}></ListItem>
            }
            <li className="divider"></li>
            { posts }
          </ul>
        </nav>
      </div>
    </>
  )
}
