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
        </div>
    )
}
