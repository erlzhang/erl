import React from "react";
import Container from "./container";
import Summary from "../components/summary";
import Navigation from "../components/navigation";
import Contact from "../components/contact";
import ContextConsumer, { ContextProviderComponent }  from "./Context"

function ChapterLayout({ data, children }) {
    const site = data.site.siteMetadata;
    const post = data.chapter;
    const prev = post.prev;
    const next = post.next;
    const book = data.book;

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
                  book={book}
                  handleClose={() => set({showSummary: false})}
                >
                  <Contact site={site}/>
                </Summary>
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
