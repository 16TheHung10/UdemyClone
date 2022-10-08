import styled from "styled-components";
export const Wrapper = styled.div`
  &&& {
    display: flex;
    width: 100vw;
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
    width: 50%;
    background-color: black;
    padding: 0 2rem;
    @media (max-width: 76.8rem) {
      width: 100%;
    }
  }
`;
export const WrapperContent = styled.div`
  width: 50%;
  padding: 4rem;
  background-color: white;
  @media (max-width: 76.8rem) {
    width: 100%;
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
