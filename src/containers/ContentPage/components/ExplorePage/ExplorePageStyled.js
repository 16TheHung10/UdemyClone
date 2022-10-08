import styled from "styled-components";

const ExplorePageWrapper = styled.div`
  &&& {
    padding: 30px;
    .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled) {
      padding: 12px 16px;
      box-shadow: none;
      &:visited,
      &:active,
      &:hover,
      &:focus {
        outline: #333;
        border-color: #333;
        border-right-width: 1px;
        z-index: 1;
        & .explore_input-icon {
          color: #333;
        }
      }
    }
    .ant-input-affix-wrapper-focused {
      border-color: rgb(51, 51, 51);
    }
    .ant-input {
      margin-left: 8px;
    }
    .explore-page_live-stream-wrapper {
      width: 100%;
      margin-top: 32px;
    }
    .explore-page_section-header-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .explore-page_link {
        color: var(--text-color);
        opacity: 0.5;
        font-weight: bold;
        &:hover {
          opacity: 1;
          color: black;
        }
      }
    }
    .explore-page_list-courses {
      margin-top: 32px;
    }
    .explore-page_loading {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 32px;
    }
  }
`;

export default ExplorePageWrapper;