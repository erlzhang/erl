import React from "react";
import { graphql } from "gatsby"

export default function Header({siteInfo}) {
  return (
    <div className="header">
      <h1 className="site-title">{ siteInfo.title }</h1>
      <p className="site-description">{ siteInfo.description }</p>
    </div>
  )
}