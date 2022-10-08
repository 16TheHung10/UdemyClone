import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    background-color: #f7f7f7;
    justify-content: center;
    .headerLogIn {
      background-color: #f7f7f7;
      padding: 0px;
      height: 132px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .contentLogIn {
      display: flex;
      justify-content: center;
    }
    .formLogIn {
      padding: 50px 50px 50px 30px;
      width: 30%;
      min-width: 425px;
      border-radius: 3px;
      box-shadow: -0.083333333in 0.5pc 1.125pc -7px rgb(25 42 70 / 13%);
    }
    .headerForm {
      text-align: center;
    }
    .subHeader {
      text-align: center;
    }
    .socialBtn {
      color: #fff;
      margin: 6px 0px;
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
    .formItem {
      margin-bottom: 0px !important;
    }
  }
`;

export default Wrapper;
