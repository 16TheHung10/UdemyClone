import styled from "styled-components";

const CourseCardWrapper = styled.div`
  &&& {
    width: 100%;
    padding: 10px;
    height: 100%;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #efefef;
    display: flex;
    flex-direction: ${(props) => (props.direction ? "row" : "column")};
    transition: transform 0.2s;
    &:hover {
      transform: ${(props) => props.hover && "translateY(2px)"};
    }

    .course-card_text-wrap {
      font-size: 12px;
      margin: ${(props) => (props.direction ? "0" : "8px 0")};
    }
    .course-card_title {
      cursor: pointer;
      margin-top: ${(props) => (props.direction ? "8px" : "0")};
      &:hover {
        color: red;
      }
    }
    .course-card_category {
      cursor: pointer;
      color: #686f7a;
      margin-bottom: 12px;
      &:hover {
        color: black;
      }
    }
    .course-card_views {
      &::after {
        content: "•";
        margin: 0px 4px;
      }
    }
    .course-card_footer {
      margin-top: auto;
      .ant-skeleton-element:last-child {
        display: flex;
        justify-content: end;
      }
    }
    .course-card_margin-top {
      margin-top: 8px;
    }
    .course-detail_add-to-cart {
      background-color: #ed2a26;
      border: 1px solid #ed2a26;
      height: 40px;
      font-size: 16px;
      color: white;
      font-weight: 600;
      &:hover {
        background-color: #c72127;
        border: 1px solid #c72127;
      }
    }
    .course-card_purchased {
      display: flex;
      height: 36px;
      text-transform: uppercase;
      width: fit-content;
      border-radius: 3px;
      font-size: 12px;
      margin: 12px 0;
      align-items: center;
      font-weight: 600;
      color: #fff;
      padding: 1px 12px;
      background-color: #333;
    }
    .course-card_link-instructor {
      color: black;
      font-weight: bold;
      &:hover {
        text-decoration: underline;
      }
    }
    .course-cart_shopping-cart {
      font-size: 1.8rem;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }

    .course-card_header-wrapper {
      margin-right: ${(props) => (props.direction ? "16px" : "0")};
    }
    .course-card_body {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .course-card_button {
      width: 190px;
    }
    .course-card_price {
      font-size: 2.4rem;
      color: red;
      &.course-card_price-sale-left {
        text-decoration: line-through;
        font-size: 1.6rem;
        color: var(--text-color);
      }
    }
    .ant-skeleton-element {
      width: 100%;
      height: 100%;
      .ant-skeleton-image {
        width: 100%;
        height: 200px;
      }
    }
  }
`;

export default CourseCardWrapper;
