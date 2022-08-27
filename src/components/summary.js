import React from "react";

function ListItem({ item }) {
  const children = item.children && item.children.map(sub => {
    return (
      <ListItem key={sub.href} item={sub}></ListItem>
    )
  })
  return (
    // <li class="chapter {% if part.url == page.url -%}active{% endif -%}">
    <li className={`chapter${item.active ? ' active': ''}`}>
      <a href={item.href}>{ item.title }</a>
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
  const posts = summary.slice(1).map(post => {
    return (
      <ListItem key={post.href} item={post}></ListItem>
    )
  })
  return (
    <>
      <div class="book-summary" id="bookSummary">
        <nav role="navigation">
          <ul class="summary">
            {/* <li class="chapter {% if page.book.index.url == page.url -%}active{% endif -%}">
              <a href="{{ page.book.url | relative_url }}" class="custom-link">{{ page.book.title }}</a>
            </li> */}
            <ListItem item={summary[0]}></ListItem>
            <li class="divider"></li>
            { posts }
          </ul>
        </nav>
      </div>
    </>
  )
}