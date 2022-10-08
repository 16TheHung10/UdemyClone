import styled from "styled-components";
const MoreDropdownWrapper = styled.div`
  &&& {
    position: relative;
    &:active,
    &:hover {
      cursor: pointer;
      & .comment_more_icon {
        color: rgba(0, 0, 0, 1);
      }
      & .more-dropdown-menu {
        display: block;
      }
    }
    .more-dropdown_icon {
      padding: 6px 10px;
      font-size: 24px;
      color: rgba(0, 0, 0, 0.5);
    }
    .more-dropdown-menu {
      position: absolute;
      display: none;
      z-index: 9;
      padding: 0;
      bottom: ${(props) => props.position?.bottom ? props.position.bottom : "unset"};
      left: ${(props) => props.position?.left ? props.position.left : "unset"};
      right: ${(props) => props.position?.right ? props.position.right : "0"};
      top: ${(props) => props.position?.top ? props.position.top : "unset"};
      list-style: none;
      background-color: #fff;
      box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.04);
      border: 1px solid #efefef;
      border-radius: 3px;
      &_item {
        cursor: pointer;
        padding: 10px 24px;
        &:active,
        &:hover {
          background-color: #efefef;
        }
      }
    }
  }
`;

export default MoreDropdownWrapper;