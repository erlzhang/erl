import React from "react";
import Container from "./container";
import Summary from "../components/summary";
import Navigation from "../components/navigation";
import {
  parseSummary,
  getPrevAndNext
} from "../utils/summary";
import ContextConsumer, { ContextProviderComponent }  from "./Context"

export default function({ data, children, pageContext }) {
  if (pageContext.layout === 'chapter') {
    const post = data.markdownRemark;
    const summary = parseSummary(data.summary, data.book, post.fields.slug);
    const { prev, next } = getPrevAndNext(post.fields.slug, summary);
    return ( <Container>
        <ContextProviderComponent>
          <ContextConsumer>
            {({ data, set }) => (
              <div className={`book__wrapper dark-mode sidebar-right${data.showSummary?' with-summary': ''}`} id="bookMain">
                <Summary summary={summary} handleClose={() => set({showSummary: false})}></Summary>
                <div className="book__body">
                  { children }
                  <Navigation prev={prev} next={next}></Navigation>
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