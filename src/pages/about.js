import React, { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { graphql } from "gatsby";
import Social from "../components/social";
import hoverShowImages from "../utils/hoverShowImages";

export default function({data}) {
  const post = data.markdownRemark;
  const site = data.site.siteMetadata;

  let inited = false;

  useEffect(() => {
    if (inited) {
      return;
    }

    hoverShowImages();
    inited = true;
  })

  return (
    <>
      <div className="page sidebar-top">
        <Header site={site}></Header>
        <main className="post__wrapper">
          <article className="post">
            <header className="post__header">
              <h1 className="post__title page__title">{ post.frontmatter.title }</h1>
            </header>
            <div
              className="post__content content"
              dangerouslySetInnerHTML={{ __html: post.html }}
            >
            </div>
          </article>
          <aside className="post__contact">
            <h4>{ site.title}</h4>
            <p>{ site.description }</p>
            <Social site={site}></Social>
          </aside>
        </main>
        <Footer site={site}></Footer>
      </div>
    </>
  )
}

export const Head = ({data}) => {
  const site = data.site.siteMetadata;
  const post = data.markdownRemark;
  return (
    <>
      <title>关于 | { site.title }</title>
    </>
  )
}

export const query = graphql`
query {
  site {
    siteMetadata {
      description
      title
      email
      github
      imgPrefix
      logo
    }
  }
  markdownRemark(fields: {slug: {eq: "/about/"}}) {
    html
    frontmatter {
      title
    }
  }
}

`