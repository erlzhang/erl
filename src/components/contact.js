import React from "react";
import Social from "../components/social";

export default function({ site }) {
  return (
    <>
        <h4>{ site.title }</h4>
        <p>{ site.description }</p>
        <!--<Social site={site}></Social>-->
    </>
  );
}
