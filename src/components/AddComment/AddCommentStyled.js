import styled from "styled-components";

const AddCommentWrapper = styled.div`
  &&& {
    padding: 20px;
    background-color: #fff;
    border-radius: 3px;
    .add-comment_form {
      text-align: right;
    }
    .add-comment_ant-space {
      width: 100%;
      display: flex;
      align-items: center;
      .ant-row.ant-form-item {
        margin: 0;
      }
      & > .ant-space-item:last-child {
        width: 100%;
      }
      .add-comment_ant-space {
      }
    }
    .textarea.ant-input {
      max-height: 32px;
    }

    #comment {
      background-color: #f9f9f9;
      &::placeholder {
        font-weight: 500;
      }
    }

    .ant-input-focused,
    .ant-input:focus,
    .ant-input:hover {
      border-color: #d9d9d9;
      box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.04);
    }

    .add-comment_btn-submit {
      font-weight: 500;
      background-color: #ed2a26;
      border: 1px solid #ed2a26;
      border-radius: 3px;
      display: inline-flex;
      align-items: center;
      margin-top: 16px;
      height: 40px;
      padding: 10px 20px;
    }
  }
`;

export default AddCommentWrapper;