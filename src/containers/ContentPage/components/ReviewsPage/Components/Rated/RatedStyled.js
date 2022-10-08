import styled from "styled-components";
export const RatedWrapper = styled.div`
  &&& {
    .ant-space {
      .ant-space-item:nth-child(2) {
        width: 100%;
      }
    }
  }
  .header {
    justify-content: center;
    width: 100%;
    &-title {
      margin: 0;
      text-align: center;
      text-transform: uppercase;
    }
  }
  .update-btn {
    margin-top: 1rem !important;
  }
  .form-update {
    width: 100%;
  }
`;
