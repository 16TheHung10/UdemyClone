import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    padding: 2rem; /* Section 1 */
    .header {
      color: #333;
      font-weight: 600;
    }
    .header .bookIcon {
      margin-right: 4px;
    }
    .creation-course {
      background-color: white;
      padding: 3rem;
      margin-bottom: 4rem;
      margin-top: 2rem;
    }
    /* Section 2 */
    .area2 {
      display: flex;
      justify-content: flex-end;
    }

    /* Section 3 */
    .tabControl {
      display: flex;
      justify-content: center;
      min-width:45rem
    }
    .tabControlItem {
      min-width: 15%;
      max-width:30rem;
      height: 7rem;
      padding:8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      margin: 0 0.1rem 0 0.1rem;
      border-radius: 0.5rem;
    }
    .tabControlItem:hover span,
    .tabControlItem:hover {
      color: #fff;
      background-color: #ed2a26;
    }

    .tabControlItem.active,
    .tabControlItem.active span {
      color: #fff;
      background-color: #ed2a26;
    }

    .tabControlItem span {
      color: #333;
      font-weight: 500;
      font-size: 14px;
    }
    .contentTab {
      min-height: 30vh;
    }
  }
`;

export default Wrapper;
