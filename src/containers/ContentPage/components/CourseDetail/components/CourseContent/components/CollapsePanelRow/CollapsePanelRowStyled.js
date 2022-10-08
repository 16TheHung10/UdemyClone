import styled from "styled-components";

const CollapseHeaderWrapper = styled.div`
  &&& {
    display: flex;
    align-items: center;
    width: 100%;
    .course-content_collapse-panel-row_preview {
      flex: 1;
      color: var(--text-color);
      text-align: right;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
    .course-content_collapse-panel {
      width: 100%;
      & > .ant-space-item:nth-child(1) {
        display: flex;
        align-items: center;
      }
      & > .ant-space-item:nth-child(2) {
        width: 100%;
      }
    }
    .collapse-panel-row_ant-space {
      width: 100%;
      padding: 10px 16px;
      cursor:pointer;
      border-bottom: 1px solid #efefef;
      &:hover {
        background-color: rgba(0,0,0,0.05);
      }
      .ant-space-item:not(:first-child) {
        width: 100%;
      }
    }
    .collapse-panel-row_wrapper {
      width: 100%;
      display: flex;
      justify-content: "space-between";
    }
    .course-content_collapse-panel {
      padding: 10px 15px;
      border: 1px solid #efefef;
    }
    .collapse-panel-row_title {
      flex: 4;
    }
    .course-content_collapse-panel-row_preview {
      text-align: center;
      padding-left: 8px;
    }
    .collapse-panel-row_duration {
      flex: 1;
      color: var(--text-color);
      min-width: 80px;
      text-align: right;
      padding-left: 8px;
    }
    @media (max-width: 676px) {
      .collapse-panel-row_title {
        flex: 3;
      }
    }
  }
`;

export default CollapseHeaderWrapper;
