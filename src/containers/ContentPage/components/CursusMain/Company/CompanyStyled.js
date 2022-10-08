import styled from "styled-components";
export const CompanyStyled = styled.div``;
export const CompanySecsion = styled.div`
  padding: 6.2rem 0;
  background: ${(props) => props.bg || "white"};
  text-align: center;
  .our-origin {
    &-title {
      text-align: left;
    }
    &-paragraph {
      text-align: justify;
    }
  }
`;
