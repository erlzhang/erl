import React from "react";
import { Link } from "gatsby";
import {
  Left, Right
} from "../components/icons";

export default function({ prev, next }) {
  return (
    <>
      {
        prev &&
        <Link
          to={prev.slug}
          className={'navigation navigation-prev'}
          aria-label={`上一章: ${ prev.title }`}
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
        >
          <Right></Right>
          <span className="navi-title">{ next.title }</span>
        </Link>
      }
    </>
  )
}
