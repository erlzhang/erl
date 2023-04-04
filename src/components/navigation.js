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
          to={prev.slug}
          className={'navigation navigation-prev'}
          aria-label={`上一章: ${ prev.title }`}
          entry={onEnterChapter}
        >
          <Left></Left>
          <span className="navi-title">{ prev.title }</span>
        </Link>
      }
      {
        next &&
        <Link
          to={next.slug}
          className="navigation navigation-next"
          aria-label={`下一章: ${ next.title }`}
          entry={onEnterChapter}
        >
          <Right></Right>
          <span className="navi-title">{ next.title }</span>
        </Link>
      }
    </>
  )
}
