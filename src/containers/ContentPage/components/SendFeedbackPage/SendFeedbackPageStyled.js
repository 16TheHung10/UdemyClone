import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    min-height: 60vh;
    max-width: 50vw;
    min-width:324px;
    padding-top: 4px;
    padding-left:8px;
    .headerSendFeedback{
      font-size: 20px;
      font-weight: 600;
      font-family: "Roboto", sans-serif;
      margin-bottom: 40px;
    }
    .titleFeild{
      font-weight: 600;
    }
    .submitBtn{
      height: 40px;
      padding: 0 20px;
      border: 0;
      margin-top: 45px;
      margin-bottom: 20px;
      background-color:#ed2a26;
      border-radius: 3px;
      color: #fff
    }
  }
`;

export default Wrapper;
