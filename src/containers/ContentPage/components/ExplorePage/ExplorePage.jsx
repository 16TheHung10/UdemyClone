import React from "react";
import { Input, Typography, Space, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import * as data from "apis/mock/HomePageContentData";
import { Link } from "react-router-dom";
import LivestreamCard from "components/LivestreamCard/LivestreamCard";
import Slider from "components/Slider/Slider";
import CourseCard from "components/CourseCard/CourseCard";
import DotLoading from "components/DotLoading/DotLoading";
import { pathLink } from "routes";
import ExplorePageWrapper from "./ExplorePageStyled";

function ExplorePage(props) {
  const liveStreamSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    gap: 4,
    responsive: [
      {
        breakpoint: 1460,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1260,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <ExplorePageWrapper>
      <Input
        className="explore_input"
        size="large"
        allowClear={true}
        placeholder="Search for Tuts Videos, Tutors, Tests and more..."
        prefix={
          <SearchOutlined
            className="explore_input-icon"
            style={{ fontSize: "24px", color: "var(--text-color)" }}
          />
        }
      />
      <Space className="explore-page_live-stream-wrapper" direction="vertical">
        <div className="explore-page_section-header-wrapper">
          <Typography.Title level={5}>Live Streams</Typography.Title>
          <Link className="explore-page_link" to={pathLink.allLivestreams}>
            See all
          </Link>
        </div>
        <Slider settings={liveStreamSettings}>
          {data.liveStreamsData.map((liveStream) => (
            <LivestreamCard key={liveStream.id} data={liveStream} />
          ))}
        </Slider>
      </Space>
      <Row gutter={[16, 16]} className="explore-page_list-courses">
        {data.coursesData.map((course) => (
          <Col key={course.id} xs={24} sm={12} md={8}>
            <CourseCard hover={true} data={course} />
          </Col>
        ))}
      </Row>
      <div className="explore-page_loading">
        <DotLoading />
      </div>
    </ExplorePageWrapper>
  );
}

export default ExplorePage;
