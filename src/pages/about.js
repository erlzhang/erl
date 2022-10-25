import React, { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { graphql } from "gatsby";
import hoverShowImages from "../utils/hoverShowImages";
import Contact from "../components/contact";
import { init } from '@waline/client';
import '@waline/client/dist/waline.css';

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

    const locale = {
      placeholder: '有什么想说的呢~',
      sofa: '这里一片空白~',
    };

    init({
      el: '#waline',
      serverURL: 'https://waline-comment-two.vercel.app/',
      locale,
      login: 'disable'
      // ...
    });
  });

  return (
    <>
      <div className="page sidebar-top">
        <Header site={site}></Header>
        <main className="post__wrapper">
          <article className="post">
            <header className="post__header">
              <h1 className="post__title page__title">{ post.frontmatter.title }</h1>
            </header>
            <div className="post__avatar">
              <img src="https://erlim.oss-cn-hongkong.aliyuncs.com/img/avatar.jpg"/>
            </div>
            <div
              className="post__content content"
              dangerouslySetInnerHTML={{ __html: post.html }}
            >
            </div>
          </article>
          {/* <Contact site={site}/> */}
          <div id="waline"></div>
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