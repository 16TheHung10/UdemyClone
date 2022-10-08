import styled from "styled-components";
export const Wrapper = styled.div`
  &&& {
    padding: 2.4rem 0;
    background: #f7f7f7;
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
    .infinite-scroll-component {
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
  padding: 3.2rem 0;
  margin-top: -3rem;
  .ant-input-group-wrapper.ant-input-search {
    width: 300px !important;
    .ant-input {
      font-size: 14px;
    }
  }
`;
export const WrapperPaid = styled.div`
  &&& {
    padding: 3.2rem 0;
  }
`;
export const WrapperColRight = styled.div`
  &&& {
    min-height: 44vh;
    .count-result {
      font-size: 20px;
      color: #333;
      font-weight: 700;
      margin-top: 60px;
    }
    .infinite-scroll-component__outerdiv {
      width: 100%;
    }
    .infinite-scroll-component {
      width: 100%;
      overflow: visible !important;
    }
  }
`;
export const WrapperFaq = styled.div`
  padding: 3.2rem;
  .divider-col-left {
    margin: 20px 0px;
    margin-bottom: 5px;
  }
  .ant-collapse-ghost > .ant-collapse-item > .ant-collapse-content {
    margin-left: 5px;
  }
  .ant-typography {
    font-size: 20px;
    color: #333;
    font-weight: 700;
    padding-left: 0px !important;
    &.sort-label {
      font-size: 16px;
    }
  }
  .ant-space-item {
    font-size: 16px;
    color: #333;
    font-weight: 700;
    line-height: 30px;
  }
  ul {
    li {
      .ant-typography {
        font-size: 14px;
        white-space: nowrap;
      }
    }
  }
  .ant-collapse-header {
    padding-left: 0px !important;
  }
  .ant-collapse-content-box {
    padding-left: 0px;
    padding-top: 0px !important;
    .ant-radio-group,
    .ant-checkbox-group {
      display: flex;
      flex-direction: column;
      .ant-radio-wrapper,
      .ant-checkbox-wrapper {
        margin-left: 0px;
        padding: 5px 0px;
        span {
          &:last-child {
            color: #333;
          }
          &.ant-radio,
          &.ant-checkbox {
            .ant-radio-inner,
            .ant-checkbox-inner {
              border-radius: 50%;
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }
  }
`;
