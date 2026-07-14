import React, { useState } from "react";
import Layout from "../layouts/page";
import axios from "axios";
import { graphql } from "gatsby";
import Subscribe from "../components/subscribe";

export default function App({data}) {
  const site = data.site.siteMetadata;
  return (
    <Layout site={site}>
      <h1 className="page-title">取消订阅</h1>
      <Subscribe
        action="unsubscribe"
        hint="输入您的邮箱，我们将停止向您发送邮件。"
        btnText="取消订阅"
        btnLoading="取消中..."
        successMsg="您已成功取消订阅"
        errorMsg="失败了，可重新尝试"
      />
    </Layout>
  );
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
      }
    }
  }
`;
