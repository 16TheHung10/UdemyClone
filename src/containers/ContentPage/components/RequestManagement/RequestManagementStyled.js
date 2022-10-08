import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    padding: 30px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    /* Section 1 */
    .header {
      color: #333;
      font-weight: 600;
      margin-bottom: 0px;
      font-size: 26px;
      &.title-page
      {
          font-size: 20px;
      }
    }
    .header .bookIcon {
      margin-right: 20px;
    }

    /* Section 2 */
    .section-action {
      background-color: white;
      margin: 40px 0px;
      height: 100px;
      border: 1px solid #efefef;
      .buttonCreate {
        background-color: #ed2a26;
        color: #fff;
        padding: 0px 20px;
        border-radius: 3px;
        border: 0;
        height: 40px;
        font-weight: 600;
      }
      .area1 {
        padding-left: 30px;
        display: flex;
        justify-content: start;
        align-items: center;
      }
      .area2 {
        padding-right: 30px;
        display: flex;
        justify-content: end;
        align-items: center;
      }
    }

    /* Section 3 */
    .section-table {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      .tabControl {
        display: flex;
        background-color: white;
      }
      .tabControlItem {
        width: 20%;
        height: 57px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
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
        margin-top: 30px;
      }
    }
  }
`;

export default Wrapper;
