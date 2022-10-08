import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    padding: 20px;
    height: 115px;
    .content-comment h6 {
      font-size: 14px;
      font-weight: 501;
      font-family: "Roboto", sans-serif;
      margin-bottom: 5px;
      color: #333;
      text-align: left;
    }

    .content-comment p {
      font-weight: 400;
      font-family: "Roboto", sans-serif;
      margin-bottom: 8px;
      color: #686f7a;
      text-align: left;
      margin-top: 8px;
      line-height: 20px;
    }

    .content-comment span {
      font-size: 12px;
      font-weight: 400;
      font-family: "Roboto", sans-serif;
      margin-bottom: 0;
      color: #afafaf;
      text-align: left;
    }
  }
`;

export default Wrapper;
