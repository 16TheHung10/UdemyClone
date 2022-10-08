import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    padding: 30px 0px 20px 20px;
    height:10%;
    .title-noti h2 {
      font-size: 20px;
      font-weight: 501;
      font-family: "Roboto", sans-serif;
      color: #333;
    }
    .button-setting {
      margin-top: 40px;
    }
    .noti-area {
      background: #fff;
      margin-top: 30px;
      padding: 0;
      float: left;
      width: 100%;
      overflow-y:scroll;
      height:60vh
    }
  }
`;

export default Wrapper;
