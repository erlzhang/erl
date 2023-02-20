import React from "react";
import Container from "./container";
import Summary from "../components/summary";
import Navigation from "../components/navigation";
import {
  parseSummary,
  getPrevAndNext
} from "../utils/summary";
import ContextConsumer, { ContextProviderComponent }  from "./Context"

function ChapterLayout({ data, children }) {
    const post = data.markdownRemark;
    const summary = parseSummary(data.summary, data.book, post.fields.slug);
    const { prev, next } = getPrevAndNext(post.fields.slug, summary);
    return (
      <>
        <ContextProviderComponent>
          <ContextConsumer>
            {({ data, set }) => (
              <div className={`book__wrapper sidebar-right${data.showSummary?' with-summary': ''}`} id="bookMain">
                <Summary summary={summary} handleClose={() => set({showSummary: false})}></Summary>
                <div className="book__body">
                  { children }
                  <Navigation prev={prev} next={next}></Navigation>
                </div>
              </div>
            )}
          </ContextConsumer>
        </ContextProviderComponent>
      </>
    )
}

export default function({ data, children, pageContext }) {
    return (
      <Container>
        {
          pageContext.layout === 'chapter' ?
          <ChapterLayout data={data}>
            { children }
          </ChapterLayout> :
          children
        }
      </Container>
    );
}
