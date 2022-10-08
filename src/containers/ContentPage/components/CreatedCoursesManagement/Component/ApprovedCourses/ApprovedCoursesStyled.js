import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    /* Area 2 */
    margin-top: 2rem;
    width: 100%;

    .actionContent .iconAction {
      width: 2.2rem;
      height: 2.2rem;
      margin: 0rem 0.3rem;
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
