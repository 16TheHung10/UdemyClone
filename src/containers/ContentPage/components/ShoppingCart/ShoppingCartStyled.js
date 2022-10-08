import styled from "styled-components";
export const Wrapper = styled.div`
  &&& {
    background: #f7f7f7;
    .ant-page-header {
      padding: 0;
    }
    .empty-cart_wrapper {
      text-align: center;
      padding: 10px;
      .empty-cart_btn {
        border-radius: 3px;
        color: #fff;
        height: 40px;
        font-weight: 500;
        font-size: 16px;
      }
    }
    .title-and-btn {
      display: flex;
      justify-content: space-between;
    }
    .btn-close-md {
      color: #686f7a;
      font-weight: 600;
      &:hover {
        cursor: pointer;
        color: black;
      }
    }
    .btn-close-container {
      margin-bottom: 0.5rem;
      display: none;
    }
    .btn-close-xs {
      color: #686f7a;
      font-weight: 600;
      &:hover {
        cursor: pointer;
        color: black;
      }
    }
    .course-img {
      border-radius: 3px;
      height: 150px;
      border: 1px solid rgba(0, 0, 0, 0.2);
     
    }
    .ant-image{
      display: block;
    }
    .course-img_overlay-badge_sale-tag {
      position: absolute;
      bottom: 0;
      padding: 8px;
        font-size: 1.6rem;
    }
    .cart-content {
      padding: 0 1rem;
    }
    .course-card_category-link {
      & > span {
        cursor: pointer;
        color: #686f7a;
      }
      &:hover > span {
        color: black;
      }
    }
    .author-and-price {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;

      .course-card_author-name-link {
        color: #000000;
        font-weight: bold;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .author-link {
      color: black;
      font-weight: 600;
    }
    .total-content {
      position: sticky;
      padding: 0 2rem;
      height: 50.7rem;
    }
    .cart-list {
      margin-bottom: 3rem;
      padding: 0 2rem;
    }
    .price-content {
      display: flex;
      padding: 1rem 0;
      justify-content: space-between;
      border-bottom: 1px solid #efefef;
    }
    .text-gray {
      color: #686f7a;
    }
    .text-bold {
      font-weight: bold;
    }
    .space-flex {
      display: flex;
    }
    .total-price {
      font-size: 1.6rem;
    }
    .btn-coupon {
      width: 100%;
      padding: 0.8rem;
      height: auto;
      background-color: #ed2a26;
      &:hover {
        background: black;
        border-color: black;
      }
    }
    .input-coupon {
      width: 100%;
      padding: 0.8rem;
    }
    .cart-item {
      width: 100%;
      &_price {
        margin-top: 8px;
        &-left {
          color: red;
          font-size: 2.4rem;
        }
        &-right {
          font-size: 1.6rem;
          text-decoration: line-through;
        }
      }
    }
    .total-price_btn-checkout {
      color: #fff;
      width: 100%;
      height: 40px;
      font-weight: 500;
      &:disabled {
        opacity: 0.7;
      }
    }
    @media (max-width: 57.6rem) {
      .btn-close-container {
        display: flex;
        justify-content: flex-end;
      }
      .btn-close-md {
        display: none;
      }
    }
    @media (max-width: 768px) {
    }
  }
`;

export const WrapperHead = styled.div`
  background: white;
  padding: 40px 24px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;
export const WrapperContent = styled.div`
  margin-top: 32px;
  padding: 10px 0;
`;
export const WrapperCartList = styled.div``;
