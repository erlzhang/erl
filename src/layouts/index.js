import React from "react";
import Container from "./container";
import Summary from "../components/summary";
import {
  parseSummary,
  getPrevAndNext
} from "../utils/summary";
import {
  Left, Right, Ellipsis
} from "../components/icons";
import { Link } from "gatsby"
import ContextConsumer, { ContextProviderComponent }  from "./Context"

export default function({ data, children, pageContext }) {
  if (pageContext.layout === 'chapter') {
    const post = data.markdownRemark;
    const summary = parseSummary(data.summary, data.book, post.fields.slug);
    const { prev, next } = getPrevAndNext(post.fields.slug, summary);
    return ( <Container>
        <ContextProviderComponent>
          <ContextConsumer>
            {({ data }) => (
              <div className={`book__wrapper sidebar-right${data.showSummary?' with-summary': ''}`} id="bookMain">
                <Summary summary={summary}></Summary>
                <div className="book__body">
                  { children }
                  {
                    prev &&
                    <Link
                      to={prev.href}
                      className="navigation navigation-prev"
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
                </div>
              </div>
            )}
          </ContextConsumer>
        </ContextProviderComponent>
      </Container>
    );
  } else {
    return (
      <Container>
        { children }
      </Container>
    )
  }
}