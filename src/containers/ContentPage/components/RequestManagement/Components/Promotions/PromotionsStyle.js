import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
    min-height:40vh;
    .changeBtn {
      margin-top: 20px;
      height: 40px;
      border-radius: 20px;
      border: 0;
      color: #fff;
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      background: #ed2a26;
      text-align: center;
      padding: 0 30px;
    }
    .changeBtn:hover {
      cursor: pointer;
      opacity:0.8
    }
  }
`;

export default Wrapper;
