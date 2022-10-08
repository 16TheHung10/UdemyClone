import { BookOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import clsx from "clsx";
import Discounts from "containers/ContentPage/components/InstructorCourses/Components/Discounts/Discounts";
import MyCourses from "containers/ContentPage/components/InstructorCourses/Components/MyCourses/MyCourses";
import MyPurchases from "containers/ContentPage/components/InstructorCourses/Components/MyPurchases/MyPurchases";
import UpcomingCourses from "containers/ContentPage/components/InstructorCourses/Components/UpcomingCourses/UpcomingCourses";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "./InstructorCoursesStyle";

function InstructorCourses() {
  const [tabChoose, setTabChoose] = useState(0);
  let navigate = useNavigate();

  return (
    <Wrapper>
      {/* Section 1 */}
      <h2 className="header">
        <BookOutlined className="bookIcon" />
        Courses
      </h2>

      {/* Section 2 */}
      <div className="creation-course">
        <Row>
          <Col span={12} className="area1">
            <h2 className="header">
              <BookOutlined className="bookIcon" />
              Jump Into Course Creation
            </h2>
          </Col>
          <Col span={12} className="area2">
            <Button
              type="primary"
              className="btn-red"
              onClick={(e) => navigate("/dashboard/create-course")}
            >
              Create Your Course
            </Button>
          </Col>
        </Row>
      </div>

      {/* Section 3 */}
      <div>
        <div className="tabControl">
          <div
            className={clsx("tabControlItem", tabChoose === 0 && "active")}
            onClick={(e) => setTabChoose(0)}
          >
            <span>My Created Courses</span>
          </div>

          <div
            className={clsx("tabControlItem", tabChoose === 1 && "active")}
            onClick={(e) => setTabChoose(1)}
          >
            <span>My Purchases Courses</span>
          </div>

          <div
            className={clsx("tabControlItem", tabChoose === 2 && "active")}
            onClick={(e) => setTabChoose(2)}
          >
            <span>Upcoming Courses</span>
          </div>

          <div
            className={clsx("tabControlItem", tabChoose === 3 && "active")}
            onClick={(e) => setTabChoose(3)}
          >
            <span>Discounts</span>
          </div>
        </div>
        <div className="contentTab">
          {tabChoose === 0 && <MyCourses />}
          {tabChoose === 1 && <MyPurchases />}
          {tabChoose === 2 && <UpcomingCourses />}
          {tabChoose === 3 && <Discounts />}
        </div>
      </div>
    </Wrapper>
  );
}

export default InstructorCourses;
