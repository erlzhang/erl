import React, { useState } from "react";
import { Link } from "gatsby";

export default function({site, book}) {
  return (
    <div className="subscribe">
      <p style={{
        marginBottom: 30
      }}>🍀 By <Link to="/about">叶夕青兮</Link> 🍀</p>
      <p>
        如果有什么想对她吐槽的，💌
        <a href={`mailto:${site.email}?subject=读《${book}》有感`}>
          写封邮件给她
        </a>
        吧！</p>
    </div>
  )
}
