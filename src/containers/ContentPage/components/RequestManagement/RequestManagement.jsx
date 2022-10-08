
import Wrapper from "./RequestManagementStyled";
import { Row, Col, Button } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { useState,useEffect } from "react";
import MyCourses from 'containers/ContentPage/components/RequestManagement/Components/MyCourses/MyCourses'
import MyPurchases from 'containers/ContentPage/components/RequestManagement/Components/MyPurchases/MyPurchases'
import UpcomingCourses from 'containers/ContentPage/components/RequestManagement/Components/UpcomingCourses/UpcomingCourses'
import Discounts from 'containers/ContentPage/components/RequestManagement/Components/Discounts/Discounts'
import Promotions from 'containers/ContentPage/components/RequestManagement/Components/Promotions/Promotions'
import {useNavigate} from 'react-router-dom'
import clsx from "clsx";

const RequestManagement = () => {
    const [tabChoose, setTabChoose] = useState(0);
    let navigate =useNavigate()
    
    return (
   
        <Wrapper>
      {/* Section 1 */}
      <h2 className="header title-page">
        <BookOutlined className="bookIcon" />
        Request Management
      </h2>

      {/* Section 2 */}
      <Row className="section-action">
          <Col span={12} className="area1">
            <h2 className="header">
              <BookOutlined className="bookIcon" />
              Jump Into Course Creation
            </h2>
          </Col>
          <Col span={12} className="area2">
            <Button type="primary" className="buttonCreate" onClick={e=>navigate("/create-course")}>
              Create Your Course
            </Button>
          </Col>
        </Row>  

      {/* Section 3 */}
      <div className="section-table">
        <div className="tabControl">
          <div
            className={clsx("tabControlItem", tabChoose === 0 && "active")}
            onClick={(e) => setTabChoose(0)}
          >
            <span>All request</span>
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

          <div
            className={clsx("tabControlItem", tabChoose === 4 && "active")}
            onClick={(e) => setTabChoose(4)}
          >
            <span>Promotions</span>
          </div>
        </div>

        <div className="contentTab">
            {(tabChoose === 0)&&(<MyCourses />)}
            {(tabChoose === 1)&&(<MyPurchases />)}
            {(tabChoose === 2)&&(<UpcomingCourses />)}
            {(tabChoose === 3)&&(<Discounts />)}
            {(tabChoose === 4)&&(<Promotions />)}

        </div>
      </div>
    </Wrapper>
  );
}

export default RequestManagement;
