import styled from "styled-components";

const NavbarMiniWrapper = styled.div`
  box-shadow: 0px 0.052083333in 11.25pt -9px rgb(0 0 0 / 10%);
  background-color: white;
  height: 5.8rem;
  position: sticky;
  top: 0;
  min-width: 37.5rem;
  background-color: white;
  z-index: 100;
  &&& {
    .btn-back-to-cursus {
      background-color: white;
      color: black;
      border: 1px solid grey;
      border-radius: 2.5rem;
      &:hover {
        background-color: black;
        color: white;
      }
    }
    .brand-logo {
      width: 12rem;
      min-width: 5rem;
    }
    .navbar-right {
      width: 15%;
      display: flex;
      justify-content: flex-end;
    }
    .navbar-left {
      width: 15%;
    }
  }
`;

export default NavbarMiniWrapper;
