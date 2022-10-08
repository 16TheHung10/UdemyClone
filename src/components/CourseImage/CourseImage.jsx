import { PlayCircleFilled, StarOutlined } from "@ant-design/icons";
import { Space, Typography, Tag } from "antd";
import React from "react";
import CourseImageWrapper from "./CourseImageStyled";
import moment from "moment";

function CourseImage(props) {
  const {
    bestSeller,
    preview,
    rating,
    totalTime,
    salePrice,
    price,
    imgLink: img,
    type,
    direction,
  } = props;
  const convertTimeDuration = () => {
    let totalTimeSecond = totalTime * 1000;
    if (moment.duration(totalTimeSecond)._data.hours > 0) {
      if (moment.duration(totalTimeSecond)._data.minutes >= 50)
        return `${moment.duration(totalTimeSecond)._data.hours + 1} hours`;
      else if (moment.duration(totalTimeSecond)._data.minutes >= 30)
        return `${moment.duration(totalTimeSecond)._data.hours}.5 hours`;
      else return `${moment.duration(totalTimeSecond)._data.hours} hours`;
    }
    if (moment.duration(totalTimeSecond)._data.minutes > 0)
      return `${moment.duration(totalTimeSecond)._data.minutes} minutes`;
    if (moment.duration(totalTimeSecond)._data.seconds > 0)
      return `${moment.duration(totalTimeSecond)._data.seconds} seconds`;
    return `${
      moment.duration(totalTimeSecond)._data.milliseconds
    } milliseconds`;
  };

  return (
    <>
      <CourseImageWrapper
        direction={direction}
        type={type}
        onClick={props.onClick}
        style={props.style}
      >
        <div className="course-image_header">
          <img className="course-image_img" alt="" src={img}></img>
          <div className="course-image_overlay">
            {bestSeller && (
              <div className="course-image_overlay-badge_seller">
                Bestseller
              </div>
            )}
            {!!salePrice && (
              <div className="course-image_overlay-badge_sale">
                <Tag
                  className="course-image_overlay-badge_sale-tag"
                  color="#f50"
                >{`-${((salePrice / price) * 100).toFixed()}%`}</Tag>
              </div>
            )}
            {type !== "course-detail" && rating !== 0 && (
              <div className="course-image_overlay-reviews">
                {" "}
                <Space>
                  <StarOutlined />
                  <Typography.Text className="course-image_overlay-reviews_text">
                    {rating?.toFixed(1)}
                  </Typography.Text>
                </Space>
              </div>
            )}
            <div className="course-image_overlay-play">
              <PlayCircleFilled className="course-image_overlay-play-icon" />
            </div>
            {totalTime !== 0 && (
              <div className="course-image_overlay-timer">
                {convertTimeDuration()}
              </div>
            )}
            {preview && (
              <div className="course-image_btn-preview">
                Preview this course
              </div>
            )}
          </div>
        </div>
      </CourseImageWrapper>
    </>
  );
}

export default CourseImage;
