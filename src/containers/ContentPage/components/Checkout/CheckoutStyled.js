import styled from "styled-components";
export const Wrapper = styled.div`
  &&& {
    width: 100%;
    background: #f7f7f7;
    .ant-page-header.has-breadcrumb {
      padding-top: 0;
    }
    .ant-page-header {
      padding: 0;
    }
    .title-text {
      margin-top: 3rem;
    }
    .collapse-edit {
      margin-top: 4rem;
      margin-bottom: 2rem;
    }
    .edit-addr-txt {
      margin-left: 1rem;
    }
    .icon-checkout {
      font-size: 1.7rem;
      font-weight: 600;
      margin-right: 1rem;
    }
    .row-checkout {
      margin-top: 2rem;
    }
    .col-checkout {
      padding: 0 1rem;
    }
    .academy-text {
      color: #686f7a;
      font-size: 1.2rem;
    }
    .btn-save-change {
      padding: 0.8rem 1.5rem;
      height: auto;
      margin-left: 1rem;
      font-size: 1.6;
      font-weight: 600;
      background-color: #ed2a26;
      &:hover {
        background: black;
        border-color: black;
      }
    }

    .order-summary {
      position: sticky;
      background-color: white;
      right: 0;
      top: 20%;
      padding: 2rem;
      border-radius: 0.3rem;
      box-shadow: 0 0 10px 6px rgba(0, 0, 0, 0.02);
    }
    .summary-box {
      padding: 2rem;
    }
    .row-summary {
      margin-top: 2rem;
      padding: 0 1rem;
    }
    .border-bot-sum {
      border-bottom: 1px solid #efefef;
      padding: 1rem 0;
    }
    .gray-text {
      color: #686f7a;
    }
    .tab-payment {
      margin-top: 3rem;
      padding: 0 2.6rem;
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
      border-color: #686f7a;
    }
    .ant-tabs-tab-active {
      border-bottom: 2px solid;
      border-bottom-color: #ff4d4f;
    }
    .ant-tabs-tab-active:hover {
      border-bottom-color: #ff4d4f;
    }
    .ant-tabs-tab-btn .ant-typography {
      color: #686f7a;
      font-size: 1.6rem;
      font-weight: 600;
    }
    .icon-credit {
      color: #686f7a;
      font-size: 1.6rem;
    }
    .icon-bank {
      color: #686f7a;
      font-size: 1.6rem;
    }
    .ant-tabs-tab:hover .icon-bank {
      color: black;
    }
    .ant-tabs-tab:hover .icon-credit {
      color: black;
    }
    .ant-tabs-tab:hover .ant-typography {
      color: black;
    }
    .ant-tabs-tab:hover .paypal-icon {
      fill: black;
    }
    .ant-tabs-tab-active .icon-credit {
      color: #ff4d4f;
    }
    .ant-tabs-tab-active .icon-bank {
      color: #ff4d4f;
    }
    .ant-tabs-tab-active .ant-typography {
      color: #ff4d4f;
    }
    .paypal-icon {
      width: 1.4rem;
      height: 1.4rem;
      margin-right: 0.5rem;
      fill: #686f7a;
    }
    .ant-tabs-tab-active .paypal-icon {
      fill: #ff4d4f;
    }
    .margin-tab {
      margin-top: 2rem;
    }
    .payment-icon {
      margin: 0 0.5rem;
      width: 3.2rem;
      height: 3.2rem;
    }
    .btn-confirm {
      padding: 0.8rem 1.5rem;
      height: auto;
      font-size: 1.6;
      font-weight: 600;
      margin-top: 2rem;
      background: var(--red-color);
      border-color: var(--red-color);
    }
    .btn-confirm:hover {
      background: black;
      border-color: black;
    }
    .ant-tabs > .ant-tabs-nav .ant-tabs-nav-more,
    .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-more {
      display: none;
    }
    .payment-color_red {
      color: red;
    }
    .order-summary_ant-space {
      width: 100%;
      justify-content: space-between;
    }
    @media (max-width: 57.6rem) {
      .ant-tabs-nav-list {
        flex-direction: column;
      }
    }
  }
`;
export const WrapperHeader = styled.div`
  padding: 4rem 3.2rem;
  background: white;
`;
export const WrapperContent = styled.div`
  padding: 2rem;
`;
export const WrapperBilling = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 0.3rem;
  box-shadow: 0 0 10px 6px rgba(0, 0, 0, 0.02);
`;
export const UnderlineTitle = styled.div`
  background-color: #ff4d4f;
  height: 0.2rem;
  width: 6rem;
  margin-top: 2rem;
`;
export const WrapperPaddingTxt = styled.div`
  padding: 0 2.6rem;
`;
export const WrapperOrderSum = styled.div`
  padding: 0 1rem;
`;
export const WrapperPayment = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;
export const WrapperOrderDetail = styled.div`
  &&& {
    padding: 0 1.6rem;

    .ant-typography {
      overflow-wrap: break-word;
    }
  }
`;
