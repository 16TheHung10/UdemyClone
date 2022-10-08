import { Col, Row, Typography } from "antd";

import CourseCard from "components/CourseCard/CourseCard";
import React from "react";
import CoursesOfInstructorWrapper from "./CoursesOfInstructorStyled";

function CoursesOfInstructor(props) {
  const { data } = props;
  console.log(data);
  return (
    <CoursesOfInstructorWrapper>
      <Typography.Title level={4}>My courses ({data.length})</Typography.Title>
      {data.length === 0 && <p>No courses available</p>}
      <Row gutter={[16, 16]}>
        {data &&
          data.map((course) => (
            <Col key={course.id} xs={24} sm={12} xl={8} xxl={6}>
              <CourseCard hover={true} data={course} />
            </Col>
          ))}
      </Row>
    </CoursesOfInstructorWrapper>
  );
}

export default CoursesOfInstructor;
