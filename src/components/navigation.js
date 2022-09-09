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
          to={prev.href}
          className={'navigation navigation-prev'}
          aria-label={`Previous page: ${ prev.title }`}
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
        >
          <Right></Right>
          <span className="navi-title">{ next.title }</span>
        </Link>
      }
    </>
  )
}