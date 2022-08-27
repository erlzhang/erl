import React from "react";

export default function Header({site, isArchive}) {
  return (
    <>
      <a href="/" class="logo">
        <img src={site.imgPrefix + site.logo} class="logo_img"/>
        <h1>{ site.title }</h1>
      </a>
      {
        !isArchive &&
        <a href="/archive" class="sidebar__toggler">
          <span class="sidebar__toggler_top"></span>
          <span class="sidebar__toggler_middle"></span>
          <span class="sidebar__toggler_bottom"></span>
        </a>
      }
      
    </>
  )
}