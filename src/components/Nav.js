import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Sidebar = styled.div`
  width: 200px;
  background-color: #333;
  min-height: 100vh;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
`;

const NavItem = styled(NavLink)`
  display: block;
  padding: 10px;
  margin: 10px 0;
  color: #f0f0f0;
  text-decoration: none;
  border-radius: 4px;

  &.active {
    background-color: #555;
  }

  &:hover {
    background-color: #444;
  }
`;

const Nav = () => {
  return (
    <Sidebar>
      <NavItem exact to="/" activeClassName="active">
        Home
      </NavItem>
      <NavItem to="/create-new-team" activeClassName="active">
        Lav et nyt hold
      </NavItem>
    </Sidebar>
  );
};

export default Nav;
