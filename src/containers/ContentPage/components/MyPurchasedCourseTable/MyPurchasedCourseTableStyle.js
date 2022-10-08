import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    
    /* Area 1 */
    .headerTable span {
      color: #333;
      font-size: 1.4rem;
      font-weight: 600;
    }
    .table-area{
      margin-top:1.6rem;
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
      width: 2.2rem;
      height: 2.2rem;
      margin: 0 0.3rem;
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
