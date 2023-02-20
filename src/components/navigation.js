import React from "react";
//import { Link } from "gatsby";
import Link from "gatsby-plugin-transition-link";
import {
  Left, Right
} from "../components/icons";
import { onEnterChapter } from "../utils/transitions/chapter";

export default function({ prev, next }) {
  return (
    <>
      {
        prev &&
        <Link
          to={prev.href}
          className={'navigation navigation-prev'}
          aria-label={`Previous page: ${ prev.title }`}
          entry={onEnterChapter}
        >
          <Left></Left>
          <span className="navi-title">{ prev.title }</span>
        </Link>
      }
      {
        next &&
        <Link
          to={next.href}
          className="navigation navigation-next"
          aria-label={`Next page: ${ next.title }`}
          entry={onEnterChapter}
        >
          <Right></Right>
          <span className="navi-title">{ next.title }</span>
        </Link>
      }
    </>
  )
}
