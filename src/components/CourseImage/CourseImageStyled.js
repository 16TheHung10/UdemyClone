import styled from "styled-components";

const CourseImageWrapper = styled.div`
  &&& {
    .course-image_header {
      position: relative;
      display: block;
      color: unset;
      cursor: pointer;
      overflow: hidden;
    }
    .course-image_header .ant-typography {
      color: white;
    }
    .course-image_header:hover,
    .course-image_header:active {
      color: unset;
    }
    .course-image_header:hover .course-image_overlay-play {
      opacity: 1;
    }
    .course-image_overlay {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
    }
    .course-image_overlay-reviews {
      position: absolute;
      left: 8px;
      top: 8px;
      background-color: #fdcc0d;
      font-weight: bold;
      padding: 3px 15px 3px 10px;
      border-radius: 3px;
      color: white;
    }
    .course-image_overlay-reviews_text.ant-typography {
      color: white;
    }
    .course-image_overlay-badge_seller {
      position: absolute;
      right: 0;
      top: 8px;
      background-color: #fa8305;
      text-transform: uppercase;
      font-size: 10px;
      padding: 2px 11px;
      line-height: 1.5;
      font-weight: bold;
      color: #fff;
      z-index: 2;
    }
    .course-image_overlay-badge_seller::after {
      z-index: 1;
      content: "";
      position: absolute;
      top: 0px;
      z-index: 1;
      display: block;
      left: -12px;
      width: 0;
      height: 0;
      border-top: 9.5px solid transparent;
      border-bottom: 9.5px solid transparent;
      border-right: 12px solid #fa8305;
    }

    .course-image_overlay-play {
      position: absolute;
      left: 50%;
      top: 50%;
      opacity: 0;
      z-index: 10;
      transform: translate(-50%, -50%);
      transition: opacity 0.2s;
      .course-image_overlay-play-icon {
        & > svg {
          width: 50px;
          height: 50px;
        }
      }
    }
    .course-image_overlay-play .anticon-play-circle {
      font-size: 32px;
      color: rgba(0, 0, 0, 0.8);
      background-color: white;
      border-radius: 100%;
    }
    .course-image_overlay-timer {
      position: absolute;
      bottom: 8px;
      right: 8px;
      background: rgba(51, 51, 51, 0.8);
      color: #fff;
      padding: 3px 10px;
      border-radius: 3px;
    }
    .course-image_img {
      width: ${(props) => (props.direction ? "370px" : "100%")};
      height: ${(props) =>
    props?.type === "course-detail" ? "auto" : (props.direction ? "220px" : "200px")};
      object-fit: cover;
      border-radius: 3px;
      cursor: pointer;
    }

    .course-image_btn-preview {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      padding: 10px;
      background-color: rgba(51, 51, 51, 0.9);
      color: #fff;
      font-weight: bold;
    }

    .course-image_overlay-badge_sale{
      position: absolute;
      bottom: 0;
      &-tag {
        padding: 8px;
        font-size: 1.6rem;
      }
    }
  }
`;
export default CourseImageWrapper;
