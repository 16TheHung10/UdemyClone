import styled from "styled-components";
const Wrapper = styled.div`
  &&& {
    padding:12px 0px;
    .title{
      font-size: 18px;
      font-family: Roboto, sans-serif;
      font-weight: 550;
    }
    .content{
      padding:30px;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center
    }

    .content p{
      margin-top:12px;
      text-align:center
    }

  }
`;

export default Wrapper;
