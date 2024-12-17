import React from "react";
import { Github, Mail } from "./icons";

export default function ({ site }) {
  return (
    <div className="icon__list">
      {/* <a className="text__link">关于</a> */}
      <a href={`mailto:${site.email}`} className="text__link" target="_blank">
        {/* <Mail></Mail> */}
        邮箱
      </a>
      <a
        href={`https://github.com/${site.github}`}
        className="text__link"
        target="_blank"
      >
        {/* <Github></Github> */}
        Github
      </a>
    </div>
  );
}
