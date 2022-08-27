import React from "react";
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";
import { graphql } from "gatsby";
import Social from "../components/social";

export default function({data}) {
  const post = data.markdownRemark;
  const site = data.site.siteMetadata;

  return (
    <Layout>
      <div className="page sidebar-top">
        <Header site={site}></Header>
        <main class="post__wrapper">
          <article class="post">
            <header class="post__header">
              <h1 class="post__title page__title">{ post.frontmatter.title }</h1>
            </header>
            <div
              class="post__content content"
              dangerouslySetInnerHTML={{ __html: post.html }}
            >
            </div>
          </article>
          <aside class="post__contact">
            <h4>{ site.title}</h4>
            <p>{ site.description }</p>
            <Social site={site}></Social>
          </aside>
        </main>
        <Footer site={site}></Footer>
      </div>
    </Layout>
  )
}

export const Head = ({data}) => {
  const site = data.site.siteMetadata;
  const post = data.markdownRemark;
  return (
    <>
      <title>{ post.frontmatter.title } | { site.title }</title>
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