import { SettingOutlined } from "@ant-design/icons";
import { Col, message, Row, Space, Typography } from "antd";
import { getInstructorById as getUserById } from "apis/features/Instructor/Instructor";
import {
  deleteSubscription,
  getAllSubscriberForUser,
  postSubscription,
} from "apis/features/Subscription/Subscription";
import Avatar from "components/Avatar/Avatar";
import SocialsGroupAction from "components/SocialsGroupAction/SocialsGroupAction";
import TabsDetailPage from "components/TabsDetailPage/TabsDetailPage";
import { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectUser } from "redux/features/auth/AuthSelector";
import {
  selectCoursesById,
  selectPurchasedCourses,
} from "redux/features/courses/coursesSelector";
import {
  getCourseById,
  getMyPurchasedCourses,
  getNumberEnrollmentByCourse,
} from "redux/features/courses/coursesThunk";
import { selectUrlSubscription } from "redux/features/subscription/subscriptionSelector";
import { getMySubscriptionThunk } from "redux/features/subscription/subscriptionThunk";
import {
  RedButtonDetailPage,
  WhiteButtonUnsubscribed,
} from "Theme/GlobalStyles";
import CoursesOfInstructor from "./components/CoursesOfInstructor/CoursesOfInstructor";
import CoursesPurchased from "./components/CoursesPurchased/CoursesPurchased";
import Subscriptions from "./components/Subscriptions/Subscriptions";
import InstructorDetailWrapper from "./InstructorDetailStyled";

function InstructorDetail(props) {
  const [user, setUser] = useState({});
  const [typeProfile, setTypeProfile] = useState("");
  const courseDataById = useSelector(selectCoursesById)?.filter(
    (item) => item.status === 1
  );
  console.log(user);
  console.log(typeProfile);
  const myPurchasedCourses = useSelector(selectPurchasedCourses);
  const urlSubscription = useSelector(selectUrlSubscription);
  const userProfile = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const currentUser = true;
  const { id } = useParams();
  // Subscription Area
  const [listSubscriptions, setListSubscriptions] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState();

  const getSubscription = async () => {
    const respond = await getAllSubscriberForUser(id);
    setListSubscriptions(respond.data.data);
  };

  useLayoutEffect(() => {
    getSubscription();
    // Kiểm tra isSubtribe
    if (
      listSubscriptions.some((item) => item.subscriber.id === userProfile?.id)
    ) {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  }, [listSubscriptions.length, urlSubscription, id]);

  const handleSubscribe = async () => {
    if (userProfile) {
      let response = await postSubscription({
        userId: id,
        subscriberId: userProfile?.id,
      });

      if (response?.data?.isSuccess) {
        setIsSubscribed(true);
        getSubscription();
        dispatch(getMySubscriptionThunk());
        message.success("Subscribe successfully");
      } else {
        message.error("Subscribe fail");
      }
    } else {
      navigate("/sign-in");
    }
  };
  const handleUnSubscribe = async () => {
    const response = await deleteSubscription(id);
    if (response?.data?.isSuccess) {
      setIsSubscribed(false);
      getSubscription();
      dispatch(getMySubscriptionThunk());
      message.success("Unsubscribe successfully");
    } else {
      message.error("Unsubscribe fail");
    }
  };
  // --End Subscription---

  // Lấy ra các course của user hiện tại
  useLayoutEffect(() => {
    dispatch(getCourseById(id));
  }, [dispatch, urlSubscription, id]);

  useLayoutEffect(() => {
    // Get my purchased course
    if (userProfile) {
      dispatch(getMyPurchasedCourses());
    }
    // Get infos of user
    async function getUserInfo() {
      let data = await getUserById(id);
      await setUser(data?.data?.data);
    }
    getUserInfo();
    // Tải lại các cặp khoá học đã enroll
    dispatch(getNumberEnrollmentByCourse());

    // Define type of profile
    if (id === userProfile?.id) {
      if (user?.role === "Student") {
        setTypeProfile("myStudentProfile");
      } else {
        setTypeProfile("myInstructorProfile");
      }
    } else {
      if (user?.role === "Student") {
        setTypeProfile("guessStudentProfile");
      } else {
        setTypeProfile("guessInstructorProfile");
      }
    }
  }, [urlSubscription, id, user?.role]);

  // Tab content
  const tabPanesConfigMyInstructorProfile = [
    {
      key: "1",
      tab: "About",
      tabContent: user?.description ? (
        <div
          style={{ padding: "30px" }}
          dangerouslySetInnerHTML={{
            __html: user?.description,
          }}
        ></div>
      ) : (
        <div style={{ padding: "30px" }}>
          <span style={{ color: "var(--text-color)" }}>No description</span>
        </div>
      ),
    },
    {
      key: "2",
      tab: "Courses",
      tabContent: (
        <CoursesOfInstructor
          data={courseDataById?.map((item) => {
            return {
              ...item,
              user: {
                id,
                fullName: user?.fullName,
              },
            };
          })}
        />
      ),
    },
    {
      key: "3",
      tab: "Purchased Courses",
      tabContent: <CoursesPurchased data={myPurchasedCourses} />,
    },
    {
      key: "4",
      tab: "Subscriptions",
      tabContent: (
        <Subscriptions userId={id} listSubscriptions={listSubscriptions} />
      ),
    },
    // {
    //   key: "4",
    //   tab: "Discussion",
    //   tabContent: <Discussion />,
    // },
  ];
  const tabPanesConfigGuessInstructorProfile = [
    {
      key: "1",
      tab: "About",
      tabContent: user?.description ? (
        <div
          style={{ padding: "30px" }}
          dangerouslySetInnerHTML={{
            __html: user?.description,
          }}
        ></div>
      ) : (
        <div style={{ padding: "30px" }}>
          <span style={{ color: "var(--text-color)" }}>No description</span>
        </div>
      ),
    },

    {
      key: "2",
      tab: "Courses",
      tabContent: (
        <CoursesOfInstructor
          data={courseDataById?.map((item) => {
            return {
              ...item,
              user: {
                id,
                fullName: user?.fullName,
              },
            };
          })}
        />
      ),
    },
    {
      key: "3",
      tab: "Subscriptions",
      tabContent: (
        <Subscriptions userId={id} listSubscriptions={listSubscriptions} />
      ),
    },
    // {
    //   key: "4",
    //   tab: "Discussion",
    //   tabContent: <Discussion />,
    // },
  ];

  const tabPanesConfigMyStudentProfile = [
    {
      key: "1",
      tab: "About",
      tabContent: user?.description ? (
        <div
          style={{ padding: "30px" }}
          dangerouslySetInnerHTML={{
            __html: user?.description,
          }}
        ></div>
      ) : (
        <div style={{ padding: "30px" }}>
          <span style={{ color: "var(--text-color)" }}>No description</span>
        </div>
      ),
    },
    {
      key: "2",
      tab: "Purchased Courses",
      tabContent: <CoursesPurchased data={myPurchasedCourses} />,
    },
  ];
  console.log(typeProfile);
  const tabPanesConfigGuessStudentProfile = [
    {
      key: "1",
      tab: "About",
      tabContent: user?.description ? (
        <div
          style={{ padding: "30px" }}
          dangerouslySetInnerHTML={{
            __html: user?.description,
          }}
        ></div>
      ) : (
        <div style={{ padding: "30px" }}>
          <span style={{ color: "var(--text-color)" }}>No description</span>
        </div>
      ),
    },
  ];

  const settingClickHandler = () => {
    navigate("/setting");
  };
  console.log(listSubscriptions);
  return (
    <InstructorDetailWrapper>
      {/* Header area */}
      <div className="instructor-detail_header">
        <Row justify="center">
          <Col md={21} lg={10}>
            <Row>
              <Col span={24}>
                <Space
                  size={16}
                  className="instructor-detail_header-left_wrapper"
                >
                  <Avatar imgLink={user?.image} fullName={user?.fullName} />
                  <Space direction="vertical">
                    <Typography.Title
                      level={3}
                      className="instructor-detail_name instructor-detail_text-white"
                    >
                      {user?.fullName}
                    </Typography.Title>
                    <Typography.Text className="instructor-detail_text-white">
                      {user?.introduction}
                    </Typography.Text>
                  </Space>
                  <Space
                    onClick={settingClickHandler}
                    className="instructor-detail_setting instructor-detail_setting-reponsive"
                  >
                    <SettingOutlined className="instructor-detail_setting-icon" />
                    <Typography.Text className="instructor-detail_text-white">
                      Setting
                    </Typography.Text>
                  </Space>
                </Space>
              </Col>

              <Col span={24} style={{ marginTop: "24px" }}>
                <Row
                  style={{ textAlign: "center" }}
                  className="instructor-detail_stats"
                >
                  {user?.role !== "Instructor" ? (
                    <>
                      <Col className="instructor-detail_stats-item">
                        <Typography.Text>Purchased</Typography.Text>
                        <Typography.Text style={{ marginTop: "auto" }}>
                          {myPurchasedCourses?.length}
                        </Typography.Text>
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col className="instructor-detail_stats-item">
                        <Typography.Text>Enrollments</Typography.Text>
                        <Typography.Text style={{ marginTop: "auto" }}>
                          {user?.enrollmentNumber}
                        </Typography.Text>
                      </Col>
                      <Col className="instructor-detail_stats-item">
                        <Typography.Text>Courses</Typography.Text>
                        {/* Tạm thời để đỡ */}
                        <Typography.Text style={{ marginTop: "auto" }}>
                          {user?.courseNumber}
                        </Typography.Text>
                      </Col>
                      <Col className="instructor-detail_stats-item">
                        {/* Chưa có data */}
                        <Typography.Text>Student</Typography.Text>
                        <Typography.Text style={{ marginTop: "auto" }}>
                          {user?.studentNumber}
                        </Typography.Text>
                      </Col>
                    </>
                  )}
                  <Col className="instructor-detail_stats-item">
                    {/* Chưa có data */}
                    <Typography.Text>Subscriptions</Typography.Text>
                    <Typography.Text style={{ marginTop: "auto" }}>
                      {listSubscriptions?.length}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col md={21} lg={10} className="instructor-detail_header-right">
            <Space
              direction="vertical"
              className="instructor-detail_header-right-wrapper"
            >
              {(typeProfile === "myInstructorProfile" ||
                typeProfile === "myStudentProfile") && (
                <Space
                  onClick={settingClickHandler}
                  className="instructor-detail_setting"
                >
                  <SettingOutlined className="instructor-detail_setting-icon" />
                  <Typography.Text className="instructor-detail_text-white">
                    Setting
                  </Typography.Text>
                </Space>
              )}
              <SocialsGroupAction
                facebook={user?.facebookLink}
                twitter={user?.twitterLink}
                youtube={user?.youtubeLink}
                linkedin={user?.linkedInLink}
              />
              <Space>
                {typeProfile === "myInstructorProfile" ||
                typeProfile === "myStudentProfile" ? (
                  <>
                    {" "}
                    <RedButtonDetailPage
                      type="primary"
                      className="instructor-detail_btn-action"
                      onClick={(e) => navigate("/setting")}
                    >
                      My profile
                    </RedButtonDetailPage>
                    {/* <WhiteButtonDetailPage
                      type="primary"
                      ghost
                      className="instructor-detail_btn-action"
                    >
                      Edit
                    </WhiteButtonDetailPage> */}
                  </>
                ) : (
                  <>
                    {" "}
                    {!isSubscribed && typeProfile !== "guessStudentProfile" && (
                      <RedButtonDetailPage
                        type="primary"
                        className="instructor-detail_btn-action"
                        onClick={(e) => handleSubscribe()}
                      >
                        Subscribe
                      </RedButtonDetailPage>
                    )}
                    {isSubscribed && typeProfile !== "guessStudentProfile" && (
                      <WhiteButtonUnsubscribed
                        type="primary"
                        className="instructor-detail_btn-action"
                        onClick={(e) => handleUnSubscribe()}
                      >
                        Unsubscribe
                      </WhiteButtonUnsubscribed>
                    )}
                    {/* <WhiteButtonDetailPage
                      type="primary"
                      className="instructor-detail_btn-action"
                      ghost
                    >
                      Message
                    </WhiteButtonDetailPage> */}
                  </>
                )}
              </Space>
            </Space>
          </Col>
        </Row>
      </div>

      {/* Tab Area */}
      <TabsDetailPage
        defaultActiveKey="1"
        tabBarStyle={{ fontWeight: "bold" }}
        tabPanes={
          typeProfile === "myInstructorProfile"
            ? tabPanesConfigMyInstructorProfile
            : typeProfile === "myStudentProfile"
            ? tabPanesConfigMyStudentProfile
            : typeProfile === "guessInstructorProfile"
            ? tabPanesConfigGuessInstructorProfile
            : tabPanesConfigGuessStudentProfile
        }
      />
    </InstructorDetailWrapper>
  );
}

export default InstructorDetail;
