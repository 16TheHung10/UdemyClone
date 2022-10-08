import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    margin-top: 1.6rem;
    .headerTable span {
      color: #333;
      font-size: 1.4rem;
      font-weight: 600;
    }
    .table-area{
      width:100%;
      overflow-x:scroll
    }

    .statusContent.active {
      color: red;
      font-weight: 600;
    }
    .actionContent {
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
