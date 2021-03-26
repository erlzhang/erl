import React from "react";
import { graphql } from "gatsby"

import Layout from "../components/layout"

export default function Post({data}) {
  const siteInfo = data.site.siteMetadata;
  const post = data.markdownRemark;
  return (
    <Layout siteInfo={siteInfo}>
      <main class="post__wrapper">
        <div class="post__top_navs clearfix">
          <nav class="post__archive_path">
            <a href="/" id="archiveBtn">
              <div class="post__archive_icon">
                <svg width="40" height="40">
                  <circle class="circle-progress" r="18" cy="20" cx="20"  stroke-linejoin="round" stroke-linecap="round" />
                </svg>
                <span class="post__archive_icon"></span>
              </div>
              Home
            </a>
          </nav>
        </div>
        <article class="post">
          <header class="post__header">
            <h1 class="post__title">{ post.frontmatter.title }</h1>
            <div class="post__meta">
              <time></time>
            </div>
          </header>
          <div className="post__content content" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        description
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`