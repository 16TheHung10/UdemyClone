import styled from "styled-components";

const CollapseHeaderWrapper = styled.div`
  &&& {
    width: 100%;
    display: flex;

    .collapse-header_title {
      flex: 4;
    }
    .collapse-header_lecture {
      color: var(--text-color);
      flex: 1;
      padding-left: 8px;
      text-align: center;
    }
    .collapse-header_totalTime {
      color: var(--text-color);
      flex: 1;
      min-width: 80px;
      padding-left: 8px;
      text-align: right;
    }

    @media (max-width: 676px) {
      .collapse-header_title {
        flex: 3;
      }
    }
  }
`;

export default CollapseHeaderWrapper;
