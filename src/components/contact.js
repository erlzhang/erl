import React from "react";
import Social from "../components/social";

export default function({ site }) {
  return (
    <>
        <h4>关于作者</h4>
        {
          site.about.split('\n').map(line => {
            return (
              <p>{ line }</p>
            )
          })
        }
        <Social site={site}></Social>
    </>
  );
}
