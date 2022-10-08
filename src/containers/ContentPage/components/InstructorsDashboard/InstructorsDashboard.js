// style component
import { AppstoreOutlined } from "@ant-design/icons";
// ANT design
import { Col, Row } from "antd";
// SVG
import { getInstructorById } from "apis/features/Instructor/Instructor";
import { ReactComponent as AchievementIcon } from "assets/svg/achievement.svg";
import { ReactComponent as GraduationIcon } from "assets/svg/graduation.svg";
import { ReactComponent as KnowledgeIcon } from "assets/svg/knowledge.svg";
import { ReactComponent as OnlineCourseIcon } from "assets/svg/online-course.svg";
import CourseCard from "components/CourseCard/CourseCard";
import Slider from "components/Slider/Slider";
import { useEffect, useState } from "react";
// redux of sidebar
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "redux/features/auth/AuthSelector";
import {
  selectCoursesById,
  selectPurchasedCourses
} from "redux/features/courses/coursesSelector";
import { getCourseById, getMyPurchasedCourses } from "redux/features/courses/coursesThunk";
import { sideBarAction } from "redux/features/sidebar/sidebarSlice";
import Wrapper from "./InstructorsDashboardStyle";

function InstructorsDashboard(props) {
  const dispatch = useDispatch();
  const [myData, setMyData] = useState();
  const userProfile = useSelector(selectUser);
  // Set state of redux side bar
  useEffect(() => {
    dispatch(sideBarAction.changeToDashboard());
    // Get my purchased courses
    dispatch(getMyPurchasedCourses());
    // Lấy ra course của mình
    dispatch(getCourseById(userProfile?.id));
    // Get my data
    (async () => {
      const response = await getInstructorById(userProfile?.id);
      setMyData(response.data.data);
    })();
  }, []);
  const courseDataById = useSelector(selectCoursesById);
  const myPurchasedCourses = useSelector(selectPurchasedCourses);

  //   setting slider
  const courseSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Wrapper>
      {/*Area 1  */}
      <div className="title-area">
        <h2>
          <AppstoreOutlined style={{ marginRight: 4 }} />
          Instructor Dashboard
        </h2>
      </div>
      {/* Area 2 */}
      <Row>
        <Col xs={24} md={12} xxl={6} className="info-area">
          <div className="info-area-1">
            <h5>Total Sales</h5>
            <h2>{`${myData?.totalSales}$`}</h2>
            {/* <span style={{ backgroundColor: "#ffc136" }}>New 0</span> */}
          </div>

          <div className="info-area-2">
            <AchievementIcon width={70} height={70} />
          </div>
        </Col>
        <Col xs={24} md={12} xxl={6} className="info-area">
          <div className="info-area-1">
            <h5>Total Enroll</h5>
            <h2>{myData?.enrollmentNumber}</h2>
            {/* <span style={{ backgroundColor: "#c182f9" }}>New 0</span> */}
          </div>

          <div className="info-area-2">
            <GraduationIcon width={70} height={70} />
          </div>
        </Col>
        <Col xs={24} md={12} xxl={6} className="info-area">
          <div className="info-area-1">
            <h5>Total Courses</h5>
            <h2>{myData?.courseNumber}</h2>
            {/* <span style={{ backgroundColor: "#ffa052" }}>New 0</span> */}
          </div>

          <div className="info-area-2">
            <OnlineCourseIcon width={70} height={70} />
          </div>
        </Col>
        <Col xs={24} md={12} xxl={6} className="info-area">
          <div className="info-area-1">
            {/* Kiểm tra lại cách tính enroll student */}
            <h5>Total Students</h5>
            <h2>{myData?.studentNumber}</h2>
            {/* <span style={{ backgroundColor: "#cca1ff" }}>New 0</span> */}
          </div>

          <div className="info-area-2">
            <KnowledgeIcon width={70} height={70} />
          </div>
        </Col>
      </Row>

      {/* Area 3 */}
      <Row style={{ marginTop: "1.6rem" }}>
        <Col xs={24} md={12} xxl={6} className="news-area">
          <h4>My purchased courses</h4>
          <Slider settings={courseSettings} hover className="slider-area">
            {myPurchasedCourses.length === 0 && <p>No courses available</p>}
            {myPurchasedCourses.map((course) => (
              <CourseCard key={course?.id} data={course} />
            ))}
          </Slider>
        </Col>
        <Col xs={24} md={12} xxl={6} className="news-area">
          <h4>My created courses</h4>
          <Slider settings={courseSettings} hover className="slider-area">
            {courseDataById.length === 0 && <p>No courses available</p>}
            {courseDataById.map((course) => (
              <CourseCard
                key={course.id}
                data={{
                  ...course,
                  user: {
                    id: userProfile?.id,
                    fullName: userProfile?.fullName,
                  },
                }}
              />
            ))}
          </Slider>
        </Col>
      </Row>
    </Wrapper>
  );
}

export default InstructorsDashboard;
