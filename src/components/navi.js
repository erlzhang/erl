import React from "react";
import { Link } from "gatsby";
import { onEnterChapter } from "../utils/transitions/chapter";

export default function({ prev, next }) {
  return (
    <>
      {
        prev &&
        <Link
          to={prev.slug}
          className="navi"
          aria-label={`上一章: ${ prev.title }`}
          entry={onEnterChapter}
        >
          上一章：
          <span className="navi-title">{ prev.title }</span>
        </Link>
      }
      {
        next &&
        <Link
          to={next.slug}
          className="navi"
          aria-label={`下一章: ${ next.title }`}
          entry={onEnterChapter}
        >
          下一章：
          <span className="navi-title">{ next.title }</span>
        </Link>
      }
    </>
  )
}
