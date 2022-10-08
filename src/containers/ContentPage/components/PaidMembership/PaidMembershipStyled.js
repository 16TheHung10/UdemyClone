import styled from "styled-components";
export const Wrapper = styled.div`
  &&& {
    padding: 2.4rem 0;
    background: rgba(0, 0, 0, 0.1);
    .row-paid {
      padding: 1.6rem 0;
      justify-content: space-between;
    }
    .col-paid {
      background: white;
      max-width: 49%;
      border-radius: 0.5rem;
      padding: 1.8rem !important;
      box-shadow: rgba(100, 100, 111, 0.2) 0 0.7rem 2.9rem 0;
    }
    .img-paid {
      height: 10rem;
      width: 10rem;
    }
    .save-price {
      color: #686f7a;
      font-size: 1.4rem;
      font-weight: 500;
    }
    .des-text {
      margin: 4rem 0;
      font-size: 1.6rem;
      font-weight: 500;
      color: #686f7a;
    }
    .disable-checkout {
      padding: 0.8rem;
      font-size: 1.7rem;
      font-weight: 700;
    }
    .benefit-checkout {
      padding: 0.8rem;
      color: red;
      font-size: 1.7rem;
      font-weight: 700;
    }
    .ant-collapse-item {
      border-bottom: 1px solid #efefef;
    }
    .benefit-text {
      padding: 0.5rem;
      font-size: 1.7rem;
      font-weight: 600;
    }
    .icon-paid {
      font-size: 1.7rem;
      font-weight: 600;
    }
    .btn-purchase {
      margin-top: 3.2rem;
      font-size: 1.8rem;
      padding: 1.6rem;
      height: auto;
      background-color: #ed2a26;
    }
    .img-container {
      padding: 1rem;
    }
    .btn-purchase:hover {
      background: black;
      border-color: black;
    }
    .qa-text {
      text-align: center;
      margin-top: 2rem;
    }
    .qa-text.des-text {
      margin-top: 2rem;
    }
    @media (max-width: 57.6rem) {
      .col-paid {
        max-width: 100%;
      }
    }
  }
`;
export const WrapperHead = styled.div`
  background: white;
  padding: 3.2rem;
  margin-top: -3rem;
`;
export const WrapperPaid = styled.div`
  &&& {
    padding: 3.2rem;
  }
`;
export const WrapperFaq = styled.div`
  background: white;
  padding: 3.2rem;
  border-radius: 0.5rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0 0.7rem 2.9rem 0;
`;
