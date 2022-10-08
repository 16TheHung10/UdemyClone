import styled from "styled-components";
export const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 3rem;
  &&& {
    .ant-steps-item-active .ant-steps-item-icon {
      background: var(--red-color);
      border-color: var(--red-color);
    }
    .ant-steps-item-finish .ant-steps-item-title::after {
      background-color: var(--red-color);
    }
    .ant-steps-item-content .ant-steps-item-title {
      font-size: 1.6rem;
      font-weight: 600;
    }
    .steps-content {
      min-height: calc(100vh - 30rem);
    }
    .ant-steps
      .ant-steps-item:not(.ant-steps-item-active)
      > .ant-steps-item-container[role="button"]:hover
      .ant-steps-item-title,
    .ant-steps
      .ant-steps-item:not(.ant-steps-item-active)
      > .ant-steps-item-container[role="button"]:hover
      .ant-steps-item-subtitle,
    .ant-steps
      .ant-steps-item:not(.ant-steps-item-active)
      > .ant-steps-item-container[role="button"]:hover
      .ant-steps-item-description {
      color: var(--red-color);
    }
    .ant-steps
      .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process)
      > .ant-steps-item-container[role="button"]:hover
      .ant-steps-item-icon {
      border-color: var(--red-color);
    }
    .ant-steps
      .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process)
      > .ant-steps-item-container[role="button"]:hover
      .ant-steps-item-icon
      .ant-steps-icon {
      color: var(--red-color);
    }
    .ant-steps-item-finish .ant-steps-item-icon {
      border-color: var(--red-color);
      .ant-steps-icon {
        color: var(--red-color);
      }
    }
    .basic-container {
      padding: 2rem;
    }
    .basic-header {
      display: flex;
      align-items: center;
      border-top: 1px solid #dddddd;
      border-bottom: 1px solid #dddddd;
      padding: 2rem 0;
    }
    .icon-header {
      font-weight: 600;
      font-size: 2rem;
      margin-right: 1.4rem;
    }
    .text-header {
      font-weight: 600;
      font-size: 1.8rem;
    }
    .section-create {
      margin-top: 2rem;
      background-color: white;
      padding: 2rem 1.7rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .flex-item {
      display: flex;
      align-items: center;
    }
    .basic-content {
      margin-top: 2rem;
      background-color: white;
      padding: 2rem;
    }
    .text-hint {
      font-size: 1.2rem;
      color: #686f7a;
    }
    .ant-form-item-label {
      font-weight: 600;
    }
    .text-editor {
      height: 12rem;
      margin-bottom: 4rem;
    }
    .ant-form-item-label
      > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
      display: none;
    }
    .margin-input {
      margin-top: 3rem;
    }
    .pd-input {
      padding: 0 2rem;
    }
    .icon-size {
      height: 2rem;
      width: 2rem;
      margin-right: 1rem;
    }
    .icon-size-mini {
      height: 1.8rem;
      width: 1.8rem;
      margin: 0 0.5rem;
    }
    .icon-hover {
      fill: var(--text-color);
      &:hover {
        fill: black;
        cursor: pointer;
      }
    }
    .section-item {
      background: white;
      margin-top: 1rem;
    }
    .section-header {
      border-bottom: 1px solid #efefef;
      padding: 1rem 0;
      .ant-collapse-header {
        display: block;
      }
    }
    .section-content {
      padding: 2rem 1.6rem;
    }
    .section-footer {
      background: black;
      color: white;
    }
    .btn-none {
      border: none;
      padding: 0.8rem 1.5rem;
      height: auto;
      font-weight: 600;
      width: auto;
      &:hover {
        color: var(--red-color);
      }
      &:focus {
        color: var(--red-color);
      }
    }
    .btn-hidden {
      display: none;
    }
    .content-list-icon {
      width: 1.6rem;
      height: 1.6rem;
    }
    .content-list-icon-action {
      fill: var(--text-color);
      visibility: hidden;
      &:hover {
        cursor: pointer;
        fill: black;
      }
    }
    .ant-table-row {
      &:hover {
        .content-list-icon-action {
          visibility: visible;
        }
      }
    }
    @media (max-width: 576px) {
      .objective-textarea {
        padding-top: 3rem;
      }
    }
    @media (max-width: 423px) {
      .objective-textarea {
        padding-top: 5rem;
      }
    }
  }
`;
export const WrapperHeader = styled.div`
  padding: 2rem;
  display: flex;
  align-items: center;
  .plus-icon {
    font-weight: 600;
    font-size: 2rem;
    margin-right: 1rem;
  }
  .text-title {
    font-weight: 600;
    font-size: 2rem;
  }
`;
export const WrapperStepContent = styled.div`
  margin-top: 4rem;
`;
export const WrapperStepAction = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const WrapperContent = styled.div`
  padding: 0 1rem;
`;
export const WrapperStepIcon = styled.div`
  margin-top: 4rem;
  padding: 0 4rem;
`;
