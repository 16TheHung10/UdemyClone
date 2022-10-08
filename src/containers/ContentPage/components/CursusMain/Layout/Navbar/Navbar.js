import React, { useContext, useState } from "react";
import { NavbarCursusMainRoute } from "routes";
import { Context } from "../LayoutCursusMain";
import { LinkNavbar, NavbarWraper } from "./NavbarStyled";

export default function Navbar() {
  const renderNavbarItem = () => {
    const html = NavbarCursusMainRoute.map((item, index) => {
      return (
        <LinkNavbar to={item.path} key={index}>
          {item.name}
        </LinkNavbar>
      );
    });
    return html;
  };
  return <NavbarWraper>{renderNavbarItem()}</NavbarWraper>;
}
