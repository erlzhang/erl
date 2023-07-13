import React from "react";
import { Github, Mail } from "./icons";

export default function({ site }) {
    return (
        <div className="icon__list">
            <a href={`mailto:${site.email}`} className="icon__link" target="_blank">
                <Mail></Mail>
            </a>
            <a href={`https://github.com/${site.github}`} className="icon__link" target="_blank">
                <Github></Github>
            </a>
            <a
              href="https://corner.erl.im"
              className="text__link"
              title="一些日常吐槽的地方，可能随时会关闭"
              target="_blank"
            >角落</a>
        </div>
    )
}
