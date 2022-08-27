import React from "react";

export default function({ site }) {
  return (
    <footer class="site-footer">
      <a href="/about">{ site.title }</a> © { new Date().getFullYear() }
    </footer>
  )
}