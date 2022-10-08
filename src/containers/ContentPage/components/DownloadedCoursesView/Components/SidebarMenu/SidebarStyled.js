import styled from "styled-components";
export const SidebarMenuWraper = styled.div`
  width: 100%;
  &&& {
    .ant-menu-item-selected a,
    .ant-menu-item-selected a:hover {
      color: white;
    }
    .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left {
      border-right:none;
      padding:1rem 0;
    }
    .ant-menu-root {
      width: 100% !important;
    }
    .ant-menu-submenu {
      margin-bottom:1rem;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
    .ant-menu-submenu-selected {
      background: #f0f2f5;
    color: black;
    border-radius: 5px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    &:hover{
      .ant-menu-submenu-title{
        color:black;
      }
    }
}
      .ant-menu-submenu-title {
        &:hover {
          color: black;
        }
      }
    }
    .ant-menu-submenu-active {
      color: black;
    }
    .ant-menu-item-selected {
      background: #ed2a26 !important;
      color: white;
    }
    .ant-menu-item {
      width: 94%;
    margin-left: auto !important;
    border-radius: 5px;
    padding: 1rem !important;
      font-weight: 500;
      margin: 0;
      &:hover {
        background: #ed2a26;
        color: white;
        .ant-menu-submenu-title {
          color: black;
        }
        .lecture-icon {
          fill: white;
        }
        a {
          color: white;
        }
      }
      &::after {
        border: none;
      }
    }
    .ant-menu-submenu-title {
      font-weight: 600;

      &:hover {
        color: black;
      }
    }
  }
  .menu-lecture-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    .attachment-icon {
      &:hover {
        fill: white;
      }
    }
  }
  .link-sidebar {
    &:hover {
      color: black;
    }
    &:active {
      color: black;
    }
    &::before {
      z-index: -1;
    }
  }
`;
