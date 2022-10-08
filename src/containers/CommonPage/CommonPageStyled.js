import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    background-color: #f0f2f5;
    justify-content: center;
    ${(props) => {
      return (
        !props.background &&
        `
        background-color: #333 !important;
    background-image: -moz-radial-gradient(
      center center,
      circle cover,
      #333333,
      #0d1218 100%
    ) !important;
    background-image: -webkit-radial-gradient(
      center center,
      circle cover,
      #333333,
      #0d1218 100%
    ) !important;`
      );
    }}
    &::before {
      content: "";
      background: url(${({ background }) => background}) no-repeat center;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      position: absolute;
      pointer-events: none;
      background-size: cover;
      opacity: 0.04;
    }
    .ant-layout,
    .ant-layout-footer {
      background-color: transparent;
    }
    .headerLogIn {
      padding: 0px;
      height: 132px;
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
    }
   
    .form-basic {
      background-color: white;
      padding: 50px 50px 30px;
      min-width: 375px;
      border-radius: 3px;
      box-shadow: -0.083333333in 0.5pc 1.125pc -7px rgb(25 42 70 / 13%);
      .formItem {
        margin-bottom: 10px !important;
        .ant-form-item-control-input
        {
          min-height: fit-content;
        }
      }
    }
    .headerForm {
      text-align: center;
      margin-bottom: 17px;
    }
    .subHeader {
      text-align: center;
      color: #686f7a;
      margin-bottom: 47px;
    }
    .socialBtn {
      color: #fff;
      margin: 6px 0px;
      height: 40px;
      border: none;
      border-radius: 3px;
      &.mt-10 {
        margin-top: 10px;
      }
      &.mb-10 {
        margin-bottom: 15px;
      }
    }
    .formInput {
      padding-left: 1.5em !important;
      padding-right: 1.5em !important;
      height: 40px;
      span {
        color: rgb(143 141 141);
      }
      input {
        margin-left: 2rem;
        font-size: 14px;
        font-weight: 400;
      }
    }
    .ant-checkbox {
      span {
        border-radius: 50%;
      }
    }
    .signInBtn {
      background-color: #ed2a26;
      color: #fff;
    }
    .signUpAcc,
    .forgotPass,
    .signInWithAnotherAcc {
      text-align: center;
    }
    .signInWithAnotherAcc span,
    .signUpAcc span,
    .forgotPass span {
      color: #ed2a26;
      cursor: pointer;
    }
    .footerSignUp {
      display: flex;
      justify-content: center;
      align-items: center;
      &.text-white {
        span {
          color: white;
        }
      }
    }
  }
  .result-commonPage {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .ant-result-icon {
      display: none;
    }
    .ant-result-title,
    .ant-result-description {
      font-size: 14rem;
      font-weight: 600;
      color: #fff;
      font-family: "Roboto", sans-serif;
      text-align: center;
      line-height: 1em;
      text-shadow: 1px 10px 6px rgb(0 0 0 / 20%);
      padding-bottom: 29px;
    }
    .ant-result-subtitle {
      font-size: 24px;
      font-weight: 400;
      color: #fff;
      font-family: "Roboto", sans-serif;
      text-align: center;
      line-height: 26px;
      margin-top: 0;
      text-shadow: 1px 10px 6px rgb(0 0 0 / 20%);
    }
    .ant-result-description {
      margin-top: 30px;
      font-size: 24px;
      padding-bottom: 0px;
      line-height: 4rem;
    }
    .ant-result-title {
      &.success {
        color: #b7eb8f;
      }
      &.failed {
        color: #ffccc7;
      }
    }
    @media (max-width: 992px) {

    } 
  }
  #basic {
    /* pointer-events: none;
    input, select{
      cursor: not-allowed;
    } */
  }
`;

export default Wrapper;
