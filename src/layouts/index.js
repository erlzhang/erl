import React from "react";
import Container from "./container";
import Summary from "../components/summary";
import Navigation from "../components/navigation";
import ContextConsumer, { ContextProviderComponent }  from "./Context"

function ChapterLayout({ data, children }) {
    const post = data.markdownRemark;
    const prev = post.fields.prev;
    const next = post.fields.next;
    const summary = data.book.summary;

    return (
      <>
        <ContextProviderComponent>
          <ContextConsumer>
            {({ data, set }) => {
              let _className = 'book__wrapper sidebar-right';
              if (data.showSummary) {
                _className += ' with-summary';
              }
               return(<div className={_className} id="bookMain">
                <Summary
                  summary={summary}
                  current={post.fields.slug}
                  handleClose={() => set({showSummary: false})}></Summary>
                <div className="book__body" id="book-body">
                  { children }
                  <Navigation prev={prev} next={next}></Navigation>
                </div>
              </div>);
            }}
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
