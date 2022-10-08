import { Col, Row, Space, Typography } from "antd";
import * as data from "apis/mock/HomePageContentData";
import clsx from "clsx";
import BecomeInstructor from "components/BecomeInstructor/BecomeInstructor";
import CourseCard, {
  CourseCardSekleton,
} from "components/CourseCard/CourseCard";
import InstructorCard, {
  InstructorCardSekleton,
} from "components/InstructorCard/InstructorCard";
import Notify from "components/Notify/Notify";
import Slider from "components/Slider/Slider";
import StatisticCard from "components/StatisticCard/StatisticCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "redux/features/auth/AuthSelector";
import {
  selectFeatureCourses,
  selectNewestCourses,
  selectPurchasedCourses,
} from "redux/features/courses/coursesSelector";
import {
  getMyCreatedCourses,
  getMyPurchasedCourses,
} from "redux/features/courses/coursesThunk";
import { selectInstructors } from "redux/features/instructor/instructorSelector";
import { sideBarAction } from "redux/features/sidebar/sidebarSlice";
import { pathLink } from "routes";
import AuthUtils from "utils/AuthUtils";
import TopCategories from "components/TopCategories/TopCategories";
import React from "react";
import HomePageWrapper from "./HomePageStyled";
import {
  getCoursesOrderByViews,
  getNewestCourses,
  getNumberEnrollmentByCourse,
} from "redux/features/courses/coursesThunk";
import { getAllInstructors } from "redux/features/instructor/instructorThunk";
import { getAllStudent } from "redux/features/student/studentThunk";
import * as categoryApis from "apis/features/Category/CategoryAPI";

const courseSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
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

const studentFeedbackSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 670,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

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

const HomePage = (props) => {
  const featureCourses = useSelector(selectFeatureCourses);
  const newestCourses = useSelector(selectNewestCourses);
  const instructorData = useSelector(selectInstructors);
  const myPurchasedCourses = useSelector(selectPurchasedCourses);
  const [topCategoriesData, setTopCategoriesData] = React.useState([]);
  const userProfile = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await categoryApis.getTopCategories();
      setTopCategoriesData(response.data.data);
    })();
  }, []);

  useEffect(() => {
    // Get my purchased courses
    if (userProfile) {
      dispatch(getMyPurchasedCourses());
      dispatch(getMyCreatedCourses(userProfile?.id));
    }
    // Set side bar
    dispatch(sideBarAction.changeToHome());
    
  }, []);

  useEffect(() => {
    dispatch(getNumberEnrollmentByCourse());
    dispatch(getCoursesOrderByViews());
    dispatch(getNewestCourses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllInstructors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllStudent());
  }, [dispatch]);

  return (
    <HomePageWrapper>
      <Row>
        <Col xxl={18} xl={17} lg={24} md={24} className="container-left">
          {/* My learning */}
          {userProfile && myPurchasedCourses.length !== 0 && (
            <Row className="home-page_featured-courses">
              <Col span={24}>
                <Space className="home-page_wrapper" direction="vertical">
                  <div className="home-page_section-header-wrapper">
                    <Typography.Title
                      level={4}
                      className="home-page_slider-title"
                    >
                      My learning
                    </Typography.Title>
                    {myPurchasedCourses.length > 0 && (
                      <Link
                        className="home-page_link"
                        to={"/list-courses/my-courses"}
                        state={{
                          listCourses: myPurchasedCourses,
                          title: "My learning",
                          isMyLearning: true,
                        }}
                      >
                        See all
                      </Link>
                    )}
                  </div>
                  {myPurchasedCourses.length > 0 ? (
                    <Slider settings={courseSettings} hover>
                      {myPurchasedCourses.map((course) => (
                        <CourseCard key={course.id} data={course} />
                      ))}
                    </Slider>
                  ) : (
                    <Slider settings={courseSettings} hover>
                      {new Array(3).fill("a").map((item, index) => (
                        <CourseCardSekleton
                          key={`courseCartSekeleton${index}`}
                        />
                      ))}
                    </Slider>
                  )}
                </Space>
              </Col>
            </Row>
          )}

          {/* Featured Courses */}
          <Row
            className={clsx(
              userProfile &&
                myPurchasedCourses.length !== 0 &&
                "home-page_newest-courses",
              !userProfile ||
                (myPurchasedCourses.length === 0 &&
                  "home-page_featured-courses")
            )}
          >
            <Col span={24}>
              <Space className="home-page_wrapper" direction="vertical">
                <div className="home-page_section-header-wrapper">
                  <Typography.Title
                    level={4}
                    className="home-page_slider-title"
                  >
                    Featured Courses
                  </Typography.Title>
                  {featureCourses.length > 0 && (
                    <Link
                      className="home-page_link"
                      to={"/list-courses/featured-courses"}
                      state={{
                        listCourses: featureCourses,
                        title: "Featured Courses",
                      }}
                    >
                      See all
                    </Link>
                  )}
                </div>
                {featureCourses.length > 0 ? (
                  <Slider settings={courseSettings} hover>
                    {featureCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        data={course}
                        isShowDetail={true}
                      />
                    ))}
                  </Slider>
                ) : (
                  <Slider settings={courseSettings} hover>
                    {new Array(3).fill("a").map((item, index) => (
                      <CourseCardSekleton key={`courseCartSekeleton${index}`} />
                    ))}
                  </Slider>
                )}
              </Space>
            </Col>
          </Row>
          {/* Newest Courses */}
          <Row className="home-page_newest-courses">
            <Col span={24}>
              <Space className="home-page_wrapper" direction="vertical">
                <div className="home-page_section-header-wrapper">
                  <Typography.Title
                    level={4}
                    className="home-page_slider-title"
                  >
                    Newest Courses
                  </Typography.Title>
                  {newestCourses.length > 0 && (
                    <Link
                      className="home-page_link"
                      to={"/list-courses/newest-courses"}
                      state={{
                        listCourses: newestCourses,
                        title: "Newest Courses",
                      }}
                    >
                      See all
                    </Link>
                  )}
                </div>
                {newestCourses.length > 0 ? (
                  <Slider settings={courseSettings} hover>
                    {newestCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        data={course}
                        isShowDetail={true}
                      />
                    ))}
                  </Slider>
                ) : (
                  <Slider settings={courseSettings} hover>
                    {new Array(3).fill("a").map((item, index) => (
                      <CourseCardSekleton key={`courseCartSekeleton${index}`} />
                    ))}
                  </Slider>
                )}
              </Space>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="home-page_statistics">
            {data.statisticData.map((statistic) => (
              <Col key={statistic.id} span={24} md={12} xl={12}>
                <StatisticCard
                  icon={statistic.icon}
                  title={statistic.title}
                  content={statistic.content}
                />
              </Col>
            ))}
          </Row>
          <Row className="home-page_instructors">
            <Col span={24}>
              <Space className="home-page_wrapper" direction="vertical">
                <div className="home-page_section-header-wrapper">
                  <Typography.Title
                    level={4}
                    className="home-page_slider-title"
                  >
                    Popular Instructors
                  </Typography.Title>
                  {instructorData.length > 0 && (
                    <Link
                      className="home-page_link"
                      to={pathLink.allInstructors}
                      state={{
                        listInstructors: instructorData,
                      }}
                    >
                      See all
                    </Link>
                  )}
                </div>
                {instructorData.length !== 0 ? (
                  <Slider settings={courseSettings} hover>
                    {instructorData.map((instructor) => (
                      <InstructorCard key={instructor.id} data={instructor} />
                    ))}
                  </Slider>
                ) : (
                  <Slider settings={courseSettings} hover>
                    {new Array(3).fill("a").map((instructor, index) => (
                      <InstructorCardSekleton
                        key={`instructorCardSekeleton${index}`}
                      />
                    ))}
                  </Slider>
                )}
              </Space>
            </Col>
          </Row>
        </Col>
        <Col xxl={6} xl={7} span={24} className="container-right">
          <Space className="home-page_wrapper" direction="vertical" size={32}>
            {userProfile && (
              <InstructorCard data={userProfile} buttonLink={"#"} />
            )}
            {userProfile?.role !== "Instructor" &&
              userProfile?.role !== "Admin" &&
              !userProfile?.isUpdateRoleRequest && <BecomeInstructor />}

            <TopCategories data={topCategoriesData} />

            {/* <GoogleAdsense slot={"5187951102"} /> */}
          </Space>
        </Col>
      </Row>
      {/* <Row className="home-page_end">
        <Col span={24}>
          <Space className="home-page_wrapper" direction="vertical">
            <Typography.Title level={4}>
              What Our Student Have Today
            </Typography.Title>
            <Slider settings={studentFeedbackSettings}>
              {data.studentFeedbacksData.map((studentFeedback) => (
                <StudentFeedbackCard
                  key={studentFeedback.id}
                  data={studentFeedback}
                />
              ))}
            </Slider>
          </Space>
        </Col>
      </Row> */}
      <Notify />
    </HomePageWrapper>
  );
};
export default HomePage;
