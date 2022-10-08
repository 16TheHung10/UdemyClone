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
    .area1, .area2{
      .creation-course {
        .earnings-header {
          padding: 2rem;
          border-bottom: solid 1px #f0f2f5;
          font-weight: 700;
        }
        .earnings-body {
          padding: 2rem;
          padding-top: 1rem;
          .price {
            &.my-funds h1 {
              color: black;
            }
            &.earnings h1 {
              color: #82b541;
            }
            &.cursus-fee h1 {
              color: #ed2a26;
            }
            h1 {
              font-weight: 500;
            }
          }
        }
      }
    }
    .creation-course {
      background-color: white;
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
      min-width: 45rem;
    }
    .tabControlItem {
      min-width: 15%;
      max-width: 30rem;
      height: 7rem;
      padding: 8px;
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
