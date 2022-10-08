import styled from "styled-components";
export const CardStyled = styled.div`
  padding: 1rem;
  margin-bottom: 3rem;
  background: white;
  border-radius: 7px;
  box-shadow: rgba(50, 50, 93, 0.055) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transition: all 0.5s;

  &:hover {
    transform: translateX(2rem);
  }
  .card-image {
    border-radius: 3px;
    margin-right: 2rem;
  }
  .card-text {
    &-top {
      font-size: 1.2rem;
    }
    &-title {
      margin: 1rem 0;
    }
  }
  .readmore {
    padding: 1rem 0;
    display: flex;
    align-items: center;
    font-weight: 600;
    &:hover {
      background: white;
      transform: scale(1.1);
    }
  }
`;
