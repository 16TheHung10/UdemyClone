import styled from "styled-components";

const Wrapper = styled.div`
  gap: 0 !important;
  &&& {
    border-radius: 3px;
    background-color: #fff;
    padding: 20px;
    margin-top: 8px;
    .personInfo {
      .personInfo_name {
        font-size: 1.6rem;
        margin: 0;
      }
      .personInfo_time-review {
        font-size: 1.3rem;
        color: var(--text-color);
        font-weight: 100;
      }
    }
    .personInfo_course-title {
      margin-bottom: 20px;
    }
    .personInfo-header_wrapper {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      .user-info {
        gap: 0px !important;
      }
    }
    .personInfo_report {
      cursor: pointer;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
    .personInfo_comment {
      margin-top: 8px;
      color: var(--text-color);
      font-weight: 100;
    }
    .userInfo {
      text-align: left;
    }
  }
`;

export default Wrapper;
