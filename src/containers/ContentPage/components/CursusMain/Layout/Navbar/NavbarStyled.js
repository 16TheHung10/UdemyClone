import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
export const NavbarWraper = styled.div`
  display: flex;
  justify-content: center;
  .active {
    border-bottom: 2px solid red;
  }
`;
export const LinkNavbar = styled(NavLink)`
  color: black;
  font-weight: 500;
  padding: 0.7rem 2rem;

  &:hover {
    color: black;
  }
`;
