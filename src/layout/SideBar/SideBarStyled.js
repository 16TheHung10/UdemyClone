import styled from "styled-components";
const MenuWrapper = styled.div`
  display: flex;
  background-color: white;

  & * {
    transition: ease 0.8s;
  }
  &&& {
    .sidebar-custom {
      overflow-x: hidden;
      overflow-y: scroll;
      position: sticky;
      width: 24rem;
      height: calc(100vh - 5.8rem);
      flex-direction: column;
      &.collapsed {
        width: 0;
      }
      &::-webkit-scrollbar {
        display: none;
        width: 3px;
        background: white;
      }
      &:hover {
        &::-webkit-scrollbar {
          display: inline-block;
        }
      }
      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 2px lightblue;
      }
      &::-webkit-scrollbar-thumb {
        background: #ff9999;
      }
    }

    /* MENU ITEMS  */

    /* --for line separate-- */
    .line-separate {
      width: 100%;
      border-bottom: 0.5px solid;
      opacity: 0.2;
    }
  
    /* --End for line separate--
    .sidebar-custom .subscription-title {
      font-weight: bold;
      padding-left: 0;
    }
    .sidebar-custom .group-link {
      display: flex;
    }
    .sidebar-custom .copyright {
      font-size: 1.15rem;
      font-weight: 500;
    }
    .copyright .copyright-brand {
      font-weight: bold;
    }

    /* CUSTOM ANTD MENU */
    .ant-menu-submenu-title,
    .ant-menu-item {
      color: #0d0d0d;
      margin-bottom: 0px;
      margin-top: 0px;
      &:hover {
        background-color: #ffe6e6;
        color: red;
      }
    }
    .ant-menu-sub {
      background-color: #ffe6e6;
    }
    .ant-menu-item {
      margin-bottom: 0px;
      &:hover {
        background-color: #ffe6e6;
        color: red;
      }
    }
    .ant-menu-item-selected a,
    .ant-menu-item-selected a:hover {
      color: red;
    }
    .ant-menu-item a:hover {
      color: red;
    }
    .ant-menu-item-selected {
      background-color: #ffe6e6;
      color: #0d0d0d;
      &::after {
        content: none;
      }
    }
    .ant-menu-title-content {
      font-weight: 600;
      font-size: 1.3rem;
      &:hover {
        color: red;
      }
    }

    .common-url {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      // Remove last child link wrap
      a:before {
        content: none;
      }
      a {
        margin-right: 1rem;
        padding: 0;
        span:hover {
          color: red;
        }
      }
    }
    @media (max-width: 576px) {
      .sidebar-custom {
        position: fixed;
        z-index: 999999;
      }
    }
  }
`;

export default MenuWrapper;
