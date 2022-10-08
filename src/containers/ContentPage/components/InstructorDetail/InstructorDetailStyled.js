import styled from "styled-components";

const InstructorDetailWrapper = styled.div`
  &&& {
    .instructor-detail_text-white {
      color: #fff;
    }
    .instructor-detail_header {
      background-color: #333;
      padding: 30px 0;
      .instructor-detail_name {
        margin: 0;
      }
      .instructor-detail_stats {
        width: 100%;
        display: flex;
        &-item {
          display: flex;
          flex: 1;
          flex-direction: column;
          text-align: center;
          padding: 15px 10px;
          border-bottom: 1px solid #4f4848;
          border-top: 1px solid #4f4848;
          border-right: 1px solid #4f4848;
          &:first-child {
            border-left: 1px solid #4f4848;
          }
          & > .ant-typography:first-child {
            margin-bottom: 8px;
          }
          & > .ant-typography {
            color: #fff;
          }
        }
      }
    }
    .instructor-detail_setting.instructor-detail_setting-reponsive {
      display: none;
    }
    .instructor-detail_setting {
      display: inline-flex;
      cursor: pointer;
      &-icon {
        color: #fff;
      }
      & > .ant-space > .ant-typography {
        color: #fff;
      }
    }
    .instructor-detail_header-right {
      display: flex;
      justify-content: flex-end;
      &-wrapper {
        text-align: right;
      }
    }
    .instructor-detail_btn-action {
      height: 40px;
      font-weight: bold;
    }
    .ant-tabs-nav-wrap {
      padding: 30px 30px 0;
    }

    @media (max-width: 1120px) {
      .instructor-detail_stats-item:last-child {
        border-left: 1px solid #4f4848;
      }
    }

    @media (max-width: 991.99px) {
      .instructor-detail_header {
        padding: 30px 60px;
      }
      .instructor-detail_header-left_wrapper {
        flex-direction: column;
        text-align: center;
        width: 100%;
        position: relative;
      }
      .instructor-detail_header-right {
        justify-content: center;
        margin-top: 32px;
        &-wrapper {
          text-align: center;
        }
      }
      .instructor-detail_setting {
        display: none;
      }
      .instructor-detail_setting.instructor-detail_setting-reponsive {
        display: inline-flex;
        position: absolute;
        top: 16px;
        right: 0;
      }
    }
  }
`;

export default InstructorDetailWrapper;