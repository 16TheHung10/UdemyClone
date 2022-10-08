import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    width: 100%;
    min-height: 60vh;
    .headerHelpPage {
      height: 278px;
      background: url(/background-header-helpPage.svg) no-repeat bottom;
      background-color: #333;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .headerHelpPage h2 {
      color: #fff;
      font-size: 30px;
      font-weight: 600;
      font-family: "Roboto", sans-serif;
    }
    .searchBtn {
      width: 550px;
      height: 50px;
    }
    .tabHeader {
      color: #333;
      font-weight: 501;
    }

    .headerContent {
      font-size: 20px;
      font-weight: 600;
      font-family: "Roboto", sans-serif;
      color: #333;
    }
    .tab-item {
      padding: 0 15px;
    }
    .tab-area .ant-tabs-tab{
      padding: 8px 0;
    }

    /* .tab-area .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
      color: #ed2a26;
      text-shadow: 0 0 0.25px currentcolor;
    } */
    
    .help-item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 12px;
      margin-bottom: 30px;
      background-color:#ffe6e6;
      border:12px solid #fff;

    }
    .help-item:hover{
      cursor: pointer;
      opacity:0.8
    }
    .help-item h4 {
      font-size: 18px;
      margin-top: 9px;
      margin-bottom: 9px;
      display: block;
      font-weight: 501;
      font-family: "Roboto", sans-serif;
      color: #333;
    }
    .help-item span{
      font-weight: 400;
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      line-height: 26px;
      color: #686f7a;
      text-align:center
    }
  }
`;

export default Wrapper;
