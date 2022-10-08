import styled from "styled-components";

const ChangePasswordWrapper = styled.div`
  &&& {
    .change-password_space {
      width: 100%;
    }
    .ant-form-item {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .ant-form-item-label {
        text-align: left;
      }
    }
    .ant-form-item-control-input-content {
      max-width: 40%;
      min-width: 280px;
    }
    .change-password_form-item {
      margin: 0;
    }
    .change-password_submit-btn {
      font-weight: bold;
      height: 40px;
    }
    .change-password_error {
      color: red;
    }
  }
`;

export default ChangePasswordWrapper;