import styled from "styled-components";
const LoginDropdownWrapper = styled.div`
  &&& {
    background-color: white;
    width: fit-content;
    -webkit-box-shadow: 0 2px 3px 0 rgb(34 36 38 / 15%);
    box-shadow: 0 2px 3px 0 rgb(34 36 38 / 15%);
    border-radius: 10px;
    .dropdown-header {
      padding: 20px;
      padding-bottom: 0px;
      span,
      a {
        display: block;
        &.login-avatar {
          margin-right: 20px;
          max-width: 45px!important;
        }
        &.name-user {
          font-weight: 600;
        }
        &.email-user {
          color: #686f7a;
        }
      }
      a {
        margin: 15px 0px;
        font-weight: 600;
        color: #333;
      }
    }
    ul {
      border-top: 1px solid rgba(0, 0, 0, 0.06);
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      li {
        background-color: white;
        margin: 0;
        padding: 0 20px;
        a, span {
          color: #686f7a;
        }
        &:hover {
          background: #ffecec !important;
          a, span {
            color: #333 !important;
          }
        }
        &:last-child {
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
    }
  }
`;

export default LoginDropdownWrapper;
