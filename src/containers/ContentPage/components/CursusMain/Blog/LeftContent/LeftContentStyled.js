import styled from "styled-components";
export const LeftContentStyled = styled.div`
  padding: 1.5rem;
  background: white;
  box-shadow: rgba(50, 50, 93, 0.055) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  &&& {
    .ant-input-search-button {
      background: white;
      color: black;
      border: 1px solid #d9d9d9;
      border-left: none;
    }
    .hr {
      padding-bottom: 1rem;
      border-bottom: 1px solid #00000026;
    }
    .ant-menu-submenu-title {
      padding: 0 !important;
    }
    .btn-group {
      padding: 1rem;
      .follow-btn {
        width: 100%;
        margin-top: 1rem;
        color: white;
        font-weight: 600;
        border-radius: 3px;
      }
      .twister {
        background: #1da1f2;
      }
      .facebook {
        background: #3b5998;
      }
    }
    .footer {
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 2rem 0;
      &-link {
        margin-top: 1rem;
        &:hover {
          color: black;
        }
      }
    }
  }
`;
