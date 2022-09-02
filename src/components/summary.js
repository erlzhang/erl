import React from "react";
import { Link } from "gatsby";

function ListItem({ item }) {
  const children = item.children && item.children.map(sub => {
    return (
      <ListItem key={sub.href} item={sub}></ListItem>
    )
  })
  return (
    // <li className="chapter {% if part.url == page.url -%}active{% endif -%}">
    <li className={`chapter${item.active ? ' active': ''}`}>
      <Link to={item.href}>{ item.title }</Link>
      {
        children && children.length &&
        <ul className="articles">
          { children }
        </ul>
      }
    </li>
  )
}

export default function({ summary }) {
  console.warn('summary', summary);
  const posts = summary.slice(1).map(post => {
    return (
      <ListItem key={post.href} item={post}></ListItem>
    )
  })
  return (
    <>
      <div className="book-summary" id="bookSummary">
        <nav role="navigation">
          <ul className="summary">
            {
              summary[0] &&
              <ListItem item={summary[0]}></ListItem>
            }
            <li className="divider"></li>
            { posts }
          </ul>
        </nav>
      </div>
    </>
  )
}