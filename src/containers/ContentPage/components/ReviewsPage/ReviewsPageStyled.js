import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    padding: 30px;
    .ant-row {
      flex-flow: row wrap !important;
    }
    .iconStart {
      margin-right: 4px;
    }
    .review-page_left {
    }
    .reviewAndFeedbackArea {
    }
    .review-page_left-wrapper {
      padding: 20px 30px;
      border-radius: 3px;
      background-color: #fff;
      width: 100%;
      .detailRatingArea {
        width: 100%;
      }
      .rating-course {
        width: 100%;

        .ant-space-item:nth-child(2) h1 {
          text-align: center;
          margin: 0;
        }
        .ant-space-item:nth-child(2) {
          text-align: center;

          .ant-rate {
            font-size: 5rem;
          }
        }

        &-header {
          justify-content: space-between;
          width: 100%;
        }
        &-user-info {
          width: 100%;
          background: white;
          border-radius: 10px;
          box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
          padding: 2rem;
        }
        &-avatar {
          justify-content: center;
          width: 100%;
        }
        &-title {
          margin: 0;
        }
      }
    }
    .detailRatingArea_wrapper {
    }
    .selected-filter-point {
      color: red;
    }
    .detailRatingItem_percent {
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        text-decoration: underline;
        color: red;
      }
    }

    /* rating area */
    .averageRating {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ratingArea {
      padding: 2rem;
      background: #f7f7f7;
      border-radius: 3px;
      font-weight: bold;
      border: 1px solid #efefef;
      /* display: flex;
      justify-content: space-between;
      align-items: center; */
    }
    .ratingItem {
      margin-right: 8px;
    }
    .ratingItem_text {
      font-weight: 600;
      font-size: 1.3rem;
    }
    .reviewAndFeedbackArea .review-page_header {
      margin: 0;
    }

    .detailRatingArea {
      margin-bottom: 16px;
    }

    .detailRatingItem > span {
      font-weight: bold;
    }
    .detailRatingItem .progressBar {
      width: 50%;
      margin-right: 4px;
    }

    /* comment area */
    .no-review {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .ant-typography {
        font-size: 2rem;
        margin-top: 2rem;
      }
    }
    .commentArea {
      .review-page_show-more {
        width: 100%;
        background-color: #fff;
        margin-top: 8px;
        height: 40px;
        border-radius: 3px;
        font-weight: 500;
      }
    }
    @media (max-width: 1199.99px) {
      .review-page_right {
        margin-top: 32px;
      }
    }
    @media (max-width: 530px) {
      .detailRatingItem .progressBar {
        width: 100%;
        margin-right: 0px;
      }
      .detailRatingArea_wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
      }
      .detailRatingItem {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

export default Wrapper;
