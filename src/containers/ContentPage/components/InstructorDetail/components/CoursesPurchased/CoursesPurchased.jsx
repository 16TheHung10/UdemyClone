import { Col, Row, Typography } from "antd";
import CourseCard from "components/CourseCard/CourseCard";
import { default as React } from "react";
import CoursesPurchasedWrapper from "./CoursesPurchasedStyled";

function CoursesPurchased(props) {
  const { data } = props;
  return (
    <CoursesPurchasedWrapper>
      <Typography.Title level={4}>Purchased Courses</Typography.Title>
      {data.length===0&&(<p>No Courses available</p>)}
      <Row gutter={[0, 32]}>
        {data &&
          data.map((course) => (
            <Col key={course.id} span={24} xl={16}>
              <CourseCard
                direction="row"
                purchased={true}
                hover={true}
                data={course}
              />
            </Col>
          ))}
      </Row>
    </CoursesPurchasedWrapper>
  );
}

export default CoursesPurchased;
