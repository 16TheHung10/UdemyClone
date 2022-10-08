import styled from "styled-components";
const NavbarWrapper = styled.div`
  width: 100vw;
  box-shadow: 0px 0.052083333in 11.25pt -9px rgb(0 0 0 / 10%);
  background-color: white;
  height: 5.8rem;
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  min-width: 37.5rem;
  background-color: white;
  z-index: 100;
  margin-left: -1px;
  &&& {
    /* NAVBAR LEFT */
    .navbar-left {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > * {
        margin-right: 1rem;
        display: flex;
        align-items: center;
      }
      .menu-icon {
        transition: all 1s ease-in-out;
        /* position: relative;
        top: 0;
        left: 0; */
        display: flex;
        justify-content: center;
        background-color: rgb(255, 22, 22);
        background-size: cover;
        width: 5.8rem;
        height: 5.8rem;
        cursor: pointer;
        .button-menu-icon {
          width: 100%;
          height: 100%;
        }
        .button-close-icon {
          font-size: 3rem;
          position: absolute;
          color: white;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .brand-logo_wrapper {
        position: relative;
        display: inline-block;
        cursor: pointer;
        &:after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1;
        }
      }
      .brand-logo {
        width: 12rem;
        min-width: 5rem;
      }
      .categories {
        .categories-icon {
          color: grey;
          background-color: white;
          svg {
            cursor: pointer;
          }
        }
        @media (max-width: 768px) {
          display: none;
        }
      }
      .search-input {
        background-color: whitesmoke;
        color: grey;
        width: 20vw;
        & > * {
          font-size: 1.3rem;
        }
        @media (max-width: 1200px) {
          display: none;
        }
      }
    }

    /* NAVBAR RIGHT */
    .navbar-right {
      display: flex;
      justify-content: end;
      align-items: center;
      & > * {
        margin-right: 1rem;
        display: flex;
        align-items: center;
      }
      .ant-badge {
        margin-right: 20px;
        cursor: pointer;
      }
      .dropdown-container {
        margin-right: 20px;
        cursor: pointer;
      }
      .notification {
        font-size: 2rem;
      }
    }

    .menu {
      background-color: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      padding: 0;
    }
    .line {
      fill: none;
      stroke: white;
      stroke-width: 6;
      transition: stroke-dasharray 800ms cubic-bezier(0.4, 0, 0.2, 1),
        stroke-dashoffset 800ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .line1 {
      stroke-dasharray: 60 207;
      stroke-width: 6;
    }
    .line2 {
      stroke-dasharray: 60 60;
      stroke-width: 6;
    }
    .line3 {
      stroke-dasharray: 60 207;
      stroke-width: 6;
    }
    .opened .line1 {
      stroke-dasharray: 90 207;
      stroke-dashoffset: -134;
      stroke-width: 6;
    }
    .opened .line2 {
      stroke-dasharray: 1 60;
      stroke-dashoffset: -30;
      stroke-width: 6;
    }
    .opened .line3 {
      stroke-dasharray: 90 207;
      stroke-dashoffset: -134;
      stroke-width: 6;
    }
    @media (max-width: 576px) {
      .create-course-btn {
        display: none;
      }
    }
  }
`;

export default NavbarWrapper;
