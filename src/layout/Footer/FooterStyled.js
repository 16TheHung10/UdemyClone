import styled from "styled-components";
const FooterWrapper = styled.div`
  background-color: rgb(61, 61, 61);
  color: white;
  padding: 3rem;
  width: 100%;
  height: 15rem;
  &&& {
    .social-icon {
      svg {
        color: white;
        transition: transform 0.3s ease-in-out;
        &:hover {
          transform: scale(1.2);
        }
      }
    }

    .ant-row {
      font-weight: 500;
      margin-bottom: 10px;
      color: white;
      &:hover {
        color: #ed2a26;
      }
    }
    .column {
      margin-left: 1rem;
      margin-right: 1rem;
      font-weight: bold;
    }
    .btn-teach {
      background-color: red;
      color: white;
      font-weight: bold;
      border: 0.1rem solid red;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      &:hover {
        background-color: #cc0000;
      }
    }
    .btn-language {
      background-color: white;
      color: black;
      font-weight: bold;
      border: 0.1rem solid white;
      border-radius: 0.5rem;
    }
    .copyright {
      color: white;
      strong {
        font-weight: 700;
      }
    }
    .ant-space-item {
      a {
        span[role="img"] {
          font-size: 24px;
        }
      }
    }
    .copyright-brand {
      font-weight: bold;
    }
    .social-link {
      color: white;
      font-size: 2.6rem;
      display: flex;
      justify-content: end;
      align-items: center;
    }
    .hr {
      margin-top: 2rem;
      margin-bottom: 2rem;
      width: 100%;
      border: 0;
      height: 0;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }
  }
`;
export default FooterWrapper;
