import styled from "styled-components";

const CourseContentWrapper = styled.div`
  &&& {
    padding: 32px;
    .course-content_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-title {
        margin: 0;
      }
      margin-bottom: 16px;
    }
    .ant-collapse-header-text {
      width: 100%;
    }
    .ant-collapse-content-box {
      padding: 0;
    }
    .course-content_collapse {
      background-color: #f0f2f5;
      .ant-collapse-item {
        background-color: #fff;
        margin-bottom: 8px;
        border: 1px solid #efefef;
      }
      & > div > .ant-collapse-header {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #efefef;
        & > div:first-child {
          display: flex;
          align-items: center;
        }
      }
     
    }
    .ant-typography.course-content_toggle-collapse{
  cursor: pointer;
  &:hover {
    color: red;
  }
}
    @media (max-width: 676px) {
      .course-content_header {
        gap: 8px;
      }
      .course-content_header-ant-space {
          & > .ant-space-item {
            text-align: center;
          }
        }
    }
  }
`;

export default CourseContentWrapper;
