import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    padding: 40px 16px;
    min-height:50vh;
    /* Area 1 */
    .title-area h2 {
      padding-right: 15px;
      padding-left: 15px;
      font-size: 20px;
      font-weight: 501;
      font-family: roboto, sans-serif;
      color: #333;
      display:flex;
      align-items:center
    }

    /* Area 2 */
    .info-area {
      min-width: 320px;
      display: flex;
      align-content: center;
      justify-content: space-between;
      padding: 20px;
      background: #fff;
    }

    .info-area h5 {
      font-size: 16px;
      color: #333;
      font-family: roboto, sans-serif;
      font-weight: 501;
    }

    .info-area h2 {
      font-size: 24px;
      color: #333;
      font-family: roboto, sans-serif;
      font-weight: 501;
    }

    .info-area span {
      font-size: 12px;
      font-weight: 500;
      font-family: roboto, sans-serif;
      color: #fff;
      padding: 5px 10px;
      border-radius: 3px;
    }

  }
`;

export default Wrapper;
