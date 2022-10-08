import styled from "styled-components";
const Wrapper = styled.div`
  &&& {
    padding-top: 30px;
    padding-left: 8px;
    .thumbnail-area {
      width: 50%;
    }
    .ant-tabs-nav-list {
      width: 100%;
    }
    .ant-tabs-tab {
      display: flex;
      justify-content: center;
      flex: 1;
      text-align: center;
      flex-direction: row;
    }
    .ant-tabs-tab:hover {
      border-color: var(--red-color);
    }
    .ant-tabs-tab-active {
      background: var(--red-color);
      color: white;
    }
    .ant-tabs-tab-active:hover {
      border-bottom-color: var(--red-color);
      color: white;
    }
    .ant-tabs-tab-btn .ant-typography {
      color: var(--text-color);
      font-size: 1.6rem;
      font-weight: 600;
    }
    .ant-tabs-tab-active .ant-typography {
      color: white;
    }
    .ant-tabs-tab:hover .ant-typography {
      color: black;
    }
    .ant-tabs-tab-active:hover .ant-typography {
      color: white;
    }
    .ant-tabs-tab:hover .lecture-icon {
      fill: black;
    }
    .ant-tabs-tab-active .lecture-icon {
      fill: white;
    }
    .ant-tabs-tab-active:hover .lecture-icon {
      fill: white;
    }
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: white;
      font-weight: 600 !important;
    }
    .ant-tabs-tab .ant-tabs-tab-btn {
      color: var(--text-color);
      font-weight: 600 !important;
    }
    .ant-tabs-tab:hover {
      color: black;
    }
    .card-video-type.ant-tabs-card {
      margin-top: 2rem;
      margin-bottom: 4rem;
    }
    .file-container {
      width: 100%;
      padding: 5rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      border: 1px dashed var(--text-color);
      border-radius: 0.5rem;
    }
    .btn-upload-file {
      padding: 0.8rem 1.6rem;
      height: auto;
      width: auto;
      border-color: var(--red-color);
      color: var(--red-color);
    }
    .btn-upload-file:hover {
      background-color: var(--red-color);
      color: white;
      border-color: var(--red-color);
    }
    .btn-upload-file:focus {
      background-color: var(--red-color);
      color: white;
      border-color: var(--red-color);
    }
    .paid-area {
      width: 50%;
    }
    .ant-switch-checked {
      background: var(--red-color);
    }
    .ant-tabs > .ant-tabs-nav .ant-tabs-nav-more,
    .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-more {
      display: none;
    }
    .lecture-icon-action {
      fill: var(--text-color);
      width: 2rem;
      height: 2rem;
    }
    .lecture-icon-action:hover {
      fill: black;
      cursor: pointer;
    }
    .uploaded-container {
      position: relative;
      top: 0;
      left: 0;
    }
    .uploaded-container:hover .ant-image-mask {
      opacity: 1;
    }
    .uploaded-container:hover .delete-img-button {
      visibility: visible;
    }
    .delete-img-button {
      position: absolute;
      top: 80%;
      left: 50%;
      fill: white;
      width: 1.6rem;
      height: 1.6rem;
      visibility: hidden;
      cursor: pointer;
      transform: translate(-50%, -50%);
    }
    .delete-img-button:hover {
      fill: var(--red-color);
    }
    @media (max-width: 576px) {
      .thumbnail-area {
        width: 100%;
      }
      .ant-tabs-nav-list {
        flex-direction: column !important;
      }
    }
  }
`;

export default Wrapper;
