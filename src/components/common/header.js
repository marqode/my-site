import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <ul className="nav nav-top justify-content-center">
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      <NavLink to="/resume" activeStyle={activeStyle}>
        Resume
      </NavLink>
        <NavLink to="/lessons" activeStyle={activeStyle}>
            Online Tutoring
        </NavLink>
      <NavLink to="/sinesthesia" activeStyle={activeStyle}>
        Sinesthesia Project
      </NavLink>
    </ul>
  );
};

export default Header;
