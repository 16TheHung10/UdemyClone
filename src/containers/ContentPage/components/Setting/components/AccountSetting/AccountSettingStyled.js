import styled from "styled-components";

const AccountSettingWrapper = styled.div`
  &&& {
    .ql-font-roboto {
      font-family: "Montserrat", sans-serif;
    }
    .account-setting_form {
      margin-top: ${(props) =>
        props.type !== "Student" && props.type !== "Instructor" ? "32px" : "0"};
    }

    .account-setting_avatar {
      &-wrapper {
        position: relative;
        cursor: ${(props) =>
          props.type !== "Student" && props.type !== "Instructor"
            ? "pointer"
            : "auto"};
      }
      &_edit-icon {
        position: absolute;
        color: white;
        right: -12px;
        bottom: -12px;
        font-size: 16px;
        border-radius: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 10px;
      }
    }
    .account-setting_headline-count {
      padding: 5px 8px;
      background-color: #dedfe0;
      border-radius: 3px;
      color: #687699;
      font-weight: 600;
      width: 36px;
      text-align: center;
    }

    .account-setting_input {
      padding: 8px 16px;
      box-shadow: none;
      height: 50px;
      border-radius: 3px;
      &:visited,
      &:active,
      &:hover,
      &:focus {
        outline: #333;
        border-color: #333;
      }
    }
    .account-setting_form-youtube {
      .account-setting_input {
        &:visited,
        &:active,
        &:hover,
        &:focus {
          outline: #ff0000;
          border-color: #ff0000;
        }
      }
    }
    .account-setting_form-linkedin {
      .account-setting_input {
        &:visited,
        &:active,
        &:hover,
        &:focus {
          outline: #8d6cab;
          border-color: #8d6cab;
        }
      }
    }
    .account-setting_form-twitter {
      .account-setting_input {
        &:visited,
        &:active,
        &:hover,
        &:focus {
          outline: #1da1f2;
          border-color: #1da1f2;
        }
      }
    }
    .account-setting_form-facebook {
      .account-setting_input {
        &:visited,
        &:active,
        &:hover,
        &:focus {
          outline: #3b5998;
          border-color: #3b5998;
        }
      }
    }
    .account-setting_note {
      color: var(--text-color);
      font-size: 14px;
    }
    .account-setting-form_fullName-focused {
      border-color: rgb(51, 51, 51);
      border-radius: 3px;
    }
    .account-setting_rich-text {
      background-color: #fff;
    }
    .quill > .ql-container > .ql-editor.ql-blank::before {
      font-style: normal;
      color: var(--text-color);
    }
    .account-setting_btn-submit {
      height: 40px;
      color: #fff;
      font-weight: 600;
      margin-top: 24px;
    }
    .account-setting_form-ant-space {
      display: flex;
      width: 100%;
      .ant-space-item:last-child {
        width: 100%;
      }
      .account-setting_form-ant-space-icon {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
        width: 50px;
        height: 50px;
        padding: 6px;
        background-color: #000000;
      }
    }
    .account-setting_profile-wrap {
      width: 100%;
      .ant-space-item {
        width: 100%;
      }
    }
    .account-setting_socials-wrap {
      width: 100%;
    }
    .account-setting_input-socials {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
    .account-setting_form-icon {
      z-index: 10;
      width: 50px;
      height: 50px;
      font-size: 4rem;
      display: flex;
      padding: 5px;
      fill: #fff;
      border-radius: 3px;
      align-items: center;
      justify-content: center;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    .account-setting_form-icon-facebook {
      background-color: #3b5998;
    }
    .account-setting_form-icon-twitter {
      background-color: #1da1f2;
    }
    .account-setting_form-icon-linkedin {
      background-color: #8d6cab;
    }
    .account-setting_form-icon-youtube {
      background-color: #ff0000;
    }
  }
`;

export default AccountSettingWrapper;
