import styled from "styled-components";
import { Row } from "antd";

const CourseDetailWrapper = styled.div`
  &&& {
    .course-detail_info {
      background-color: #333;
      padding: 30px;
      width: 100%;
    }
    .course-detail_price,
    .course-detail_title {
      margin: 0;
      color: #fff;
    }
    .course-detail_money-back {
      font-size: 1.2rem;
      color: #fff;
    }
    .course-detail_categories {
      color: #fff;
      &:hover {
        color: #efefef;
      }
    }
    .course-detail_reviews {
      background-color: #fdcc0d;
      font-weight: bold;
      padding: 3px 15px 3px 10px;
      border-radius: 3px;
      color: white;
      &-text {
        color: #fff;
      }
    }
    .course-detail_left {
      .course-detail-left_group-btn {
        margin-top: 16px;
        .course-detail-left_btn {
          opacity: 0.9;
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        }
      }
      .course-detail-left_btn-icon {
        color: #fff;
      }
    }
    .original-price{
      opacity:0.7;
      text-decoration-line:line-through
    }
    .course-detail_preview-wrap {
      padding: 10px;
      background-color: #fff;
      border-radius: 3px;
    }
    .course-detail_right {
      .anticon-message {
        color: #fff;
      }
      &-text {
        color: #fff;
        font-size: 1.5rem;
      }
    }
    .course-detail_btn {
      height: 40px;
      font-weight: bold;
    }
    .course-detail_buy-now {
      color: #fff;
      border: 1px solid #fff;
      &:hover {
        background: #c72127;
        border: 1px solid #c72127;
      }
    }
    .course-detail_add-to-cart {
      background-color: #ed2a26;
      border: 1px solid #ed2a26;
      &:hover {
        background-color: #c72127;
        border: 1px solid #c72127;
      }
    }
    .course-detail_subcribes {
      padding: 20px 30px;
      background-color: #fff;
      .course-detail_btn-subcribe {
        cursor: pointer;
        transition: opacity 0.2s;
        background-color: #ed2a26;
        height: 30px;
        border: 1px solid #ed2a26;
        color: #fff;
        font-weight: 600;
        padding: 0 20px;
        border-radius: 3px;
        &:hover {
          opacity: 0.8;
        }
      }
      .course-detail_btn-unsubcribe {
        cursor: pointer;
        transition: opacity 0.2s;
        background-color: #00408e;
        border: 1px solid #00408e;
        color: #fff;
        font-weight: bold;
        padding: 5px 20px;
        border-radius: 3px;
        &:hover {
          opacity: 0.8;
        }
      }
      .course-detail_instructor-name {
        font-size: 1.6rem;
        font-weight: bold;
      }
      &-action {
        cursor: pointer;
        padding: 8px 12px;
        border: 1px solid #efefef;
        color: var(--text-color);
        &-text {
          color: var(--text-color);
        }
        &:hover {
          color: black;
        }
        &:hover .course-detail_subcribes-action-text {
          color: black;
        }
      }
    }

    @media (max-width: 767.99px) {
      .course-detail_right {
        margin-top: 32px;
        text-align: center;
      }
      .course-detail_subcribes {
        text-align: center;
      }
    }
    @media (max-width: 575.99px) {
      .course-detail_subcribes {
        flex-direction: column;
        justify-content: center;
        text-align: center;
        &-group-action {
          margin-top: 32px;
        }
      }
    }
  }
`;

export default CourseDetailWrapper;

export const CourseDetailSkeletonWrapper = styled(Row)`
  .course-detail_skeleton-col {
    display: flex;
    align-items: center;
    justify-content: center;
    .ant-skeleton-element {
      width: 80%;
      height: 80%;
    }
    .ant-skeleton-image {
      width: 100%;
      height: 100%;
    }
  }
`;
