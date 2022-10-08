import styled from "styled-components";

const SettingWrapper = styled.div`
  &&& {
    padding: 30px;
    .setting_title {
      margin: 0;
    }
    .setting-group-action_btn {
      background-color: transparent;
      outline: none;
      border: none;
      &:not(:first-child) {
        margin-left: 16px;
      }
    }
    .setting_btn {
      height: 40px;
      font-weight: bold;
    }
    a {
      &.active {
        .setting_btn {
          background-color: #ed2a26;
          border: 1px solid #ed2a26;
          color: white;
        }
      }
    }
    .ant-btn-text:hover,
    .ant-btn-text:focus {
      background-color: transparent;
      color: var(--red-color);
    }
  }
`;

export default SettingWrapper;
