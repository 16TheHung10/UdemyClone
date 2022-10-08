import styled from "styled-components";
// css
const LoginFacebookStyled = styled.div`
  &&& {
    span {
      .kep-login-facebook {
        height: 40px;
        width: 100%;
        line-height: 1px;
        text-transform: inherit;
        padding-top: 12px;
        font-size: 14px;
        font-family: inherit;
      }
    }
    .ant-btn {
      span{
          &:last-child
          {
              font-weight: 700;
          }
      }
    }
  }
`;
export default LoginFacebookStyled;
