import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    min-height: 60vh;
    max-width: 85vw;
    padding: 20px 40px;
    .headerReportPage {
      font-size: 20px;
      font-weight: 600;
      font-family: "Roboto", sans-serif;
      margin-bottom: 40px;
    }
    .flagIcon {
      margin-right: 6px;
    }
    .headerThankYou {
      font-size: 16px;
      font-weight: 600;
      text-transform: none;
      color: #333;
      font-family: "Roboto", sans-serif;
      text-align: left;
      margin-bottom: 20px;
    }
    a {
      color: #4183c4;
    }

    .submittedReportArea {
      margin-top: 20px;
    }
    .submittedReportArea p {
      text-align: center;
    }
  }
`;

export default Wrapper;
