import React, { useState } from "react";
import { Row, Col, Space, Button, Typography } from "antd";
import CourseCard from "components/CourseCard/CourseCard";
import CoursesWrapper from "./CoursesStyled";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { getCoursesByOrderAndPage } from "apis/features/Courses/Courses";

function Courses(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { listCourses, title, isMyLearning } = location.state;
  const [coursesData, setCoursesData] = useState([...listCourses]);
  // console.log(coursesData);
  useEffect(() => {
    if (!listCourses) {
      navigate("/");
    }
  }, []);

  // handle case if title ="Newest Courses"
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowBtnLoadMore, setIsShowBtnLoadMore] = useState(false);

  const handleLoadMore = async () => {
    setIsLoading(true);
    const response = await getCoursesByOrderAndPage(
      page + 1,
      10,
      "createdAt",
      "desc"
    );
    console.log(response?.data?.data);
    setTotalPage(response?.data?.data?.totalPage);
    setPage(page + 1);
    setCoursesData((prev) => [...prev, ...response?.data?.data?.result]);
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    if (title === "Newest Courses") {
      setIsShowBtnLoadMore(true);
    }

    if (page >= totalPage) {
      setIsShowBtnLoadMore(false);
    }
  }, [totalPage, page]);

  // ----End handle case if title ="Newest Courses"----

  return (
    <CoursesWrapper>
      <Typography.Title level={4}>{title}</Typography.Title>
      {coursesData.length === 0 && <p>No Courses available</p>}
      <Row gutter={[32, 32]}>
        {coursesData.map((course) => (
          <Col key={course.id} xs={24} sm={12} lg={8} xl={6}>
            <CourseCard
              // direction="vertical"
              purchased={isMyLearning}
              hover={true}
              data={course}
            />
          </Col>
        ))}
      </Row>

      <div className="load-area">
        {isShowBtnLoadMore && (
          <Button
            type="primary"
            onClick={(e) => handleLoadMore()}
            loading={isLoading}
          >
            Load more courses...
          </Button>
        )}
      </div>
    </CoursesWrapper>
  );
}

export default Courses;
