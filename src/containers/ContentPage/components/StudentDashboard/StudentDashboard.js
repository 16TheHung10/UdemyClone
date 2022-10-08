import { AppstoreOutlined } from "@ant-design/icons";
import { Col, Row, Empty } from "antd";
import { ReactComponent as KnowledgeIcon } from "assets/svg/knowledge.svg";
// SVG
import { ReactComponent as OnlineCourseIcon } from "assets/svg/online-course.svg";
import CourseCard from "components/CourseCard/CourseCard";
import Slider from "components/Slider/Slider";
import { useEffect } from "react";
// redux of sidebar
import { useDispatch, useSelector } from "react-redux";
// redux
import { selectPurchasedCourses } from "redux/features/courses/coursesSelector";
import { sideBarAction } from "redux/features/sidebar/sidebarSlice";
import { selectMySubscription } from "redux/features/subscription/subscriptionSelector";
import { getMySubscriptionThunk } from "redux/features/subscription/subscriptionThunk";
// style component
import { getMyPurchasedCourses } from "redux/features/courses/coursesThunk";
import Wrapper from "./StudentDashboardStyle";

function StudentDashboard(props) {
  const dispatch = useDispatch();
  const myPurchasedCourses = useSelector(selectPurchasedCourses);
  const mySubscription = useSelector(selectMySubscription);
  // Set state of redux side bar
  useEffect(() => {
    dispatch(sideBarAction.changeToDashboard());
    dispatch(getMyPurchasedCourses());
    dispatch(getMySubscriptionThunk());
  }, []);

  //   setting slider
  const courseSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Wrapper>
      {/*Area 1  */}
      <div className="title-area">
        <h2>
          <AppstoreOutlined style={{ marginRight: 4 }} />
          Student Dashboard
        </h2>
      </div>

      {/* Area 2 */}
      <Row>
        <Col xs={24} md={12} className="info-area">
          <div className="info-area-1">
            <h5>Total Purchased Courses</h5>
            <h2>{myPurchasedCourses?.length}</h2>
            {/* <span style={{ backgroundColor: "#ffa052" }}>New 0</span> */}
          </div>

          <div className="info-area-2">
            <OnlineCourseIcon width={70} height={70} />
          </div>
        </Col>
        <Col xs={24} md={12} className="info-area">
          <div className="info-area-1">
            <h5>Total Instrutors Subscribing</h5>
            {/* Chưa có data */}
            <h2>{mySubscription?.length}</h2>
            {/* <span style={{ backgroundColor: "#cca1ff" }}>New 0</span> */}
          </div>

          <div className="info-area-2">
            <KnowledgeIcon width={70} height={70} />
          </div>
        </Col>
      </Row>

      {/* Area 3 */}
      <Row className="mg-top">
        <Col xs={24} md={24} className="news-area">
          <h4>My Purchased Courses</h4>
          <Slider settings={courseSettings} hover className="slider-area">
            {myPurchasedCourses?.length !== 0 ? (
              myPurchasedCourses?.map((course) => (
                <CourseCard key={course?.id} data={course} />
              ))
            ) : (
              <Empty />
            )}
          </Slider>
        </Col>
        {/* <Col xs={24} md={12} className="news-area">
          <h4>What's new in Edututs+</h4>
          <div className="new-edututs">
            <a href="#">Improved performance on Studio Dashboard</a>
            <br />
            <a href="#">See more Dashboard updatesd</a>
            <br />
            <a href="#">See issues-at-glance for Live</a>
          </div>
        </Col> */}
      </Row>
    </Wrapper>
  );
}

export default StudentDashboard;
