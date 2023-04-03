import React from "react";
import { Link } from "gatsby";
import {
  Logo
} from "./icons";

export default function Header({site}) {
  return (
    <>
      <Link to="/" className="logo">
        <Logo/>
        <h1>{ site.title }</h1>
      </Link>
      <Link to="/archive" className="sidebar__toggler">
        <span className="sidebar__toggler_top"></span>
        <span className="sidebar__toggler_middle"></span>
        <span className="sidebar__toggler_bottom"></span>
      </Link>
    </>
  )
}
