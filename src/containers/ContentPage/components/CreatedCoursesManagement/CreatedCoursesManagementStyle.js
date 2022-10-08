import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    padding: 40px 16px;
    min-height: 50vh;
    /* Area 1 */
    .title-area h2 {
      padding-right: 15px;
      padding-left: 15px;
      font-size: 20px;
      font-weight: 501;
      font-family: roboto, sans-serif;
      color: #333;
      display: flex;
      align-items: center;
    }

    /* Area 2 */
    .table-area {
      margin-top: 20px;
      width:100%;
      overflow-x:scroll
    }

    .actionContent .iconAction {
      width: 22px;
      height: 22px;
      margin: 0px 3px;
    }

    .actionContent .iconAction:hover {
      color: red;
      cursor: pointer;
    }
    .long-content {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;

export default Wrapper;
