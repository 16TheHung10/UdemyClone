import React from "react";
import { Row, Col, Space, Button, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Wrapper from "./InstructorsStyled";
import InstructorCard from "components/InstructorCard/InstructorCard";

function Instructors(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { listInstructors} = location.state;
  useEffect(() => {
    if (!listInstructors) {
      navigate("/");
    }
  }, []);
  return (
    <Wrapper>
      <Typography.Title level={4}>Popular Instructors</Typography.Title>
      <Row gutter={[32, 32]}>
        {listInstructors.map((instructor) => (
          <Col key={instructor.id} xs={24} sm={12} xl={6}>
            {/* Card */}
            <InstructorCard data={instructor} />
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
}

export default Instructors;
