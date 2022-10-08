import styled from "styled-components";
const ResponsePageStyled = styled.div`
  &&& {
    .ant-result-title {
      &.success {
        color: #b7eb8f;
      }
      &.failed {
        color: #ffccc7;
      }
    }
  }
`;

export default ResponsePageStyled;
