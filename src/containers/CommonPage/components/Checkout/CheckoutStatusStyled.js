import styled from "styled-components";

export const Wrapper = styled.div`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f7f7f7;
    .logo-invoice {
      width: 20rem;
      height: 8rem;
    }
    .text-white {
      color: white;
      margin: 0;
    }
    .margin-tab {
      margin-top: 2rem;
    }
    .ant-table-thead .ant-table-cell {
      font-weight: 600;
    }
    .btn-print {
      font-size: 1.6rem;
      padding: 1rem;
      height: auto;
      background-color: #ed2a26;
    }
    .btn-print:hover {
      background: black;
      border-color: black;
    }
  }
`;

export const WrapperHeader = styled.div`
  &&& {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-top: 50px;
    background-color: black;
    @media (max-width: 76.8rem) {
      width: 100%;
    }
  }
`;
export const WrapperContent = styled.div`
  padding: 4rem;
  width: 100%;
  background-color: white;
  .brand-logo_checkout-wrapper {
    position: relative;
    display: flex;
    justify-content: flex-end;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
  }
  .checkout-status_image-detail {
    width: 150px;
    height: 100px;
  }

  @media print {
    .hidden-print {
      display: none;
    }
    .ant-table-tbody td:last-child,
    .ant-table-thead th:last-child {
      display: none;
    }
  }

  @media (max-width: 600px) {
    .checkout-status_image-detail {
      width: 75px;
      height: 50px;
    }
    @media (max-width: 490px) {
      .checkout-status_image-detail {
        width: 50px;
        height: 75px;
      }
    }
  }
`;
export const WrapperFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
export const WrapperFlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;
