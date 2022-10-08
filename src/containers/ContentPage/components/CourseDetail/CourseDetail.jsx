import {
  EyeOutlined,
  FlagOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
  StarOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  message,
  Modal,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
} from "antd";
import {
  getCourseById,
  getCourseByUserId,
} from "apis/features/Courses/Courses";
import {
  getEnrollmentByCourseId,
  postEnrollment,
} from "apis/features/Enrollment/EnrollmentAPI";
import * as wishlistApis from "apis/features/Favourite/Favourite";
import { reviewAPI } from "apis/features/Review/reviewApi";
import {
  deleteSubscription,
  postSubscription,
} from "apis/features/Subscription/Subscription";
import { updateView } from "apis/features/View/viewApi";
import Avatar from "components/Avatar/Avatar";
import CourseImage from "components/CourseImage/CourseImage";
import ModalReport from "components/Modal/ModalReport/ModalReport";
import TabsDetailPage from "components/TabsDetailPage/TabsDetailPage";
import CourseContent from "containers/ContentPage/components/CourseDetail/components/CourseContent/CourseContent";
import ReviewsPage from "containers/ContentPage/components/ReviewsPage/ReviewsPage";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as authSelector from "redux/features/auth/AuthSelector";
import { selectCartItems } from "redux/features/cart/CartSelector";
import { CartAction } from "redux/features/cart/CartSlice";
import { getMyPurchasedCourses } from "redux/features/courses/coursesThunk";
import { getMySubscriptionThunk } from "redux/features/subscription/subscriptionThunk";
import * as wishlistSelector from "redux/features/wishlist/WishlistSelector";
import { wishlistAction } from "redux/features/wishlist/WishlistSlice";
import { pathLink } from "routes";
import { WhiteButtonUnsubscribed } from "Theme/GlobalStyles";
import { formatSpecialized } from "utils/CommonUtils";
import CourseAbout from "./components/CourseAbout/CourseAbout";
import CourseDetailWrapper, {
  CourseDetailSkeletonWrapper,
} from "./CourseDetailStyled";
import HeartButton from "components/HeartButton/HeartButton";

function CourseDetail(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const [courseData, setCourseData] = React.useState(null);
  const [courseStatus, setCourseStatus] = React.useState("");
  const { id } = useParams();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isSubscribed, setIsSubscribed] = React.useState();
  const wishlist = useSelector(wishlistSelector.selectWishlist);
  const authUser = useSelector(authSelector.selectUser);
  const checkExistedInCart = React.useMemo(() => {
    return cartItems.findIndex((item) => item.id === courseData?.id);
  }, [cartItems, courseData]);

  const checkExistedInWishlist = React.useMemo(() => {
    return wishlist.findIndex((item) => item.id === id);
  }, [wishlist, id]);

  const tabPanesConfig = [
    { key: "1", tab: "About", tabContent: <CourseAbout data={courseData} /> },
    {
      key: "2",
      tab: "Course Content",
      tabContent: (
        <CourseContent courseStatus={courseStatus} data={courseData} />
      ),
    },
    { key: "3", tab: "Reviews", tabContent: <ReviewsPage /> },
  ];

  const handleHeartIconClick = (data, type) => {
    if (!!authUser) {
      (async () => {
        if (type === "add") {
          let previousWishlist = wishlist;
          try {
            dispatch(wishlistAction.addNewItemWishlist(data));
            await wishlistApis.addFavorite({
              userId: authUser.id,
              courseId: data.id,
            });
          } catch (e) {
            dispatch(wishlistAction.addPreviousWishlist(previousWishlist));
            throw new Error("Failed to add wishlist");
          }
        } else {
          let previousWishlist = wishlist;
          try {
            dispatch(wishlistAction.deleteItemWishlist(data.id));
            await wishlistApis.removeFavorite(data.id);
          } catch (e) {
            dispatch(wishlistAction.addPreviousWishlist(previousWishlist));
            throw new Error("Failed to remove wishlist");
          }
        }
      })();
    } else window.location = "/sign-in";
  };

  const handleFavoriteClick = () => {
    if (!!authUser) {
      (async () => {
        if (checkExistedInWishlist === -1) {
          let previousWishlist = wishlist;
          try {
            dispatch(wishlistAction.addNewItemWishlist(courseData));
            await wishlistApis.addFavorite({
              userId: authUser.id,
              courseId: courseData.id,
            });
          } catch (e) {
            dispatch(wishlistAction.addPreviousWishlist(previousWishlist));
            throw new Error("Failed to add wishlist");
          }
        } else {
          let previousWishlist = wishlist;
          try {
            dispatch(wishlistAction.deleteItemWishlist(courseData.id));
            await wishlistApis.removeFavorite(courseData.id);
          } catch (e) {
            dispatch(wishlistAction.addPreviousWishlist(previousWishlist));
            throw new Error("Failed to remove wishlist");
          }
        }
      })();
    } else window.location = "/sign-in";
  };

  // Enroll course for free course
  const handleEnrollForFreeCourse = () => {
    if (courseData?.isFree) {
      (async () => {
        const response = await postEnrollment({
          courseId: id,
          userId: authUser?.id,
        });

        if (response?.data?.isSuccess) {
          setCourseStatus("enrolled");
          dispatch(getMyPurchasedCourses());
          message.success("Enrolled successfully");
        } else {
          message.error("Enrolled fail");
        }
      })();
    }
  };

  useEffect(() => {
    // Get course data
    if (!!id) {
      (async () => {
        // Get data courses
        const response = await getCourseById(id);
        // Get data enroll
        const responseEnrollNumber = await getEnrollmentByCourseId(id);
        // Get data rating
        let ratingNumber = 0;
        let ratingAverage = 0;
        const responseReview = await reviewAPI
          .getCourseReviewOfAllUser(id)
          .then((res) => {
            ratingNumber = res?.data?.data?.length;
            if (ratingNumber === 0) {
              ratingAverage = 0;
            } else {
              ratingAverage = res?.data?.data?.reduce((acc, cur) => {
                return acc + cur.rating;
              }, 0);
              ratingAverage = (ratingAverage / ratingNumber).toFixed(1);
            }
          })
          .catch((err) => {
            throw new Error("err user rating: ", err);
          });

        setCourseData({
          ...response.data.data,
          studentsEnrolled: responseEnrollNumber.data.data.length,
          ratingNumber,
          ratingAverage,
        });
      })();
    }
  }, [id]);

  useEffect(() => {
    // Check status of course
    if (authUser) {
      (async () => {
        const response = await getCourseByUserId(authUser?.id);
        // CHeck có phải là khoá học của tôi
        let isMyCourse = await response.data.data.some(
          (course) => course.id === id
        );
        if (isMyCourse) {
          setCourseStatus("enrolled");
        } else if (courseData?.isEnroll) {
          setCourseStatus("enrolled");
        } else {
          setCourseStatus("notEnrolled");
        }
      })();
    }
  }, [courseData?.isEnroll]);

  // ----View area -----
  useEffect(() => {
    let timeoutId = setTimeout(async () => {
      const response = await updateView(id);
    }, 10000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // ---End view area---

  // ----Report Area----
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleReport = () => {
    if (authUser) {
      setIsModalVisible(true);
    } else {
      navigate("/sign-in");
    }
  };
  // ----End Report Area----

  // ------Subscribe Area---------
  useEffect(() => {
    setIsSubscribed(courseData?.isSubscribe);
  }, [courseData?.isSubscribe]);

  const handleSubscribe = async (id) => {
    if (authUser) {
      let response = await postSubscription({
        userId: id,
        subscriberId: authUser?.id,
      });

      if (response?.data?.isSuccess) {
        setIsSubscribed(true);
        dispatch(getMySubscriptionThunk());
        message.success("Subscribe successfully");
      } else {
        message.error("Subscribe fail");
      }
    } else {
      navigate("/sign-in");
    }
  };

  const handleUnSubscribe = async (id) => {
    const response = await deleteSubscription(id);
    if (response?.data?.isSuccess) {
      setIsSubscribed(false);
      dispatch(getMySubscriptionThunk());
      message.success("Unsubscribe successfully");
    } else {
      message.error("Unsubscribe fail");
    }
  };

  // ---End Subscribe Area----

  // console.log(mySubscription);
  // console.log(courseData);
  if (!!courseData) {
    return (
      <CourseDetailWrapper>
        {/*--- Modal report----- */}
        <ModalReport
          typeReport={0}
          courseId={id}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
        {/*---- End modal report ----*/}

        <Modal
          width={700}
          title="Preview"
          style={{
            top: 20,
          }}
          keyboard
          destroyOnClose={true}
          footer={false}
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
        >
          <>
            {/* <video width="100%" height="415" controls>
              <source src={courseData.previewVideoUrl} type="video/mp4" />
              <source src={courseData.previewVideoUrl} type="video/ogg" />
              Your browser does not support HTML video.
            </video> */}
            <ReactPlayer
              url={courseData?.previewVideoUrl}
              width="100%"
              height="41.5rem"
              controls={true}
            />
            {/* <iframe
              width="100%"
              height="415"
              src={convertUrl(courseData?.previewVideoUrl)}
              title="YouTube video player"
              allowFullScreen
            ></iframe> */}
          </>
        </Modal>

        <div className="course-detail_info">
          <Row gutter={[32, 0]}>
            <Col md={10} span={24} className="course-detail_left">
              <div className="course-detail_preview-wrap">
                <CourseImage
                  type="course-detail"
                  onClick={() => setModalVisible(true)}
                  style={{ borderRadius: "3px" }}
                  preview={true}
                  imgLink={courseData.imageUrl}
                  // bestSeller={courseData.bestSeller}
                />
              </div>
              <Space size={40} className="course-detail-left_group-btn">
                <Space
                  size={8}
                  align="baseline"
                  className="course-detail-left_btn"
                >
                  {" "}
                  <FlagOutlined className="course-detail-left_btn-icon" />
                  <Typography.Text
                    style={{ color: "#fff" }}
                    onClick={(e) => handleReport()}
                  >
                    Report abuse
                  </Typography.Text>
                </Space>
              </Space>
            </Col>
            <Col span={24} md={14} className="course-detail_right">
              <Space direction="vertical" size={16}>
                <Typography.Title level={3} className="course-detail_title">
                  {courseData.title}
                </Typography.Title>
                <Typography.Text className="course-detail_right-text">
                  {courseData.shortDescription}
                </Typography.Text>
                <Space>
                  <div className="course-detail_reviews">
                    {" "}
                    <Space>
                      <StarOutlined />
                      <Typography.Text className="course-detail_reviews-text">
                        {courseData?.ratingAverage}
                      </Typography.Text>
                    </Space>
                  </div>
                  <Typography.Text className="course-detail_right-text">
                    ({courseData?.ratingNumber} ratings)
                  </Typography.Text>
                </Space>
                <Typography.Text className="course-detail_right-text">
                  {courseData?.studentsEnrolled} students enrolled
                </Typography.Text>
                <Space>
                  {courseData.categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/result?category=${category.id}`}
                    >
                      <Typography.Text className="course-detail_categories">
                        {" "}
                        {category.name}
                      </Typography.Text>
                    </Link>
                  ))}
                </Space>
                <Space size={4}>
                  <MessageOutlined />
                  <Typography.Text className="course-detail_right-text">
                    {formatSpecialized(courseData.audioLanguages)}
                  </Typography.Text>
                </Space>
                <Typography.Text className="course-detail_right-text">
                  Last updated{" "}
                  {moment(courseData.updatedAt || courseData.createdAt).format(
                    "DD/MM/YYYY"
                  )}
                </Typography.Text>
                <Typography.Title level={3} className="course-detail_price">
                  {`${
                    courseData.price === 0
                      ? "Free"
                      : `$${courseData.price - courseData.salePrice}`
                  }`}
                </Typography.Title>
                {courseData.salePrice !== 0 && (
                  <Typography.Text className="course-detail_right-text">
                    <span className="original-price">{`$${courseData.price}`}</span>
                    <Tag style={{ marginLeft: 8 }} color="#f50">{`-${(
                      (courseData.salePrice / courseData.price) *
                      100
                    ).toFixed()}%`}</Tag>
                  </Typography.Text>
                )}
                <Space size={12}>
                  {checkExistedInCart !== -1 ? (
                    <Button
                      onClick={() => navigate("/shopping-cart")}
                      type="primary"
                      className="course-detail_btn course-detail_add-to-cart"
                    >
                      Go to Cart
                    </Button>
                  ) : (
                    <>
                      {courseStatus === "enrolled" ? (
                        <Button
                          type="primary"
                          className="course-detail_btn course-detail_add-to-cart"
                          onClick={(e) =>
                            navigate(`/download-course-view/${id}`)
                          }
                        >
                          Watch your course
                        </Button>
                      ) : (
                        <>
                          {!courseData?.isFree ? (
                            <>
                              <Button
                                onClick={() =>
                                  dispatch(CartAction.addItemToCart(courseData))
                                }
                                type="primary"
                                className="course-detail_btn course-detail_add-to-cart"
                              >
                                Add to Cart
                              </Button>
                              <Button
                                type="primary"
                                onClick={() => {
                                  if (!!authUser) {
                                    dispatch(CartAction.buyItemNow(courseData));
                                    dispatch(CartAction.setTypeBuy("Buy Now"));
                                    navigate("/checkout");
                                  } else window.location = "/sign-in";
                                }}
                                className="course-detail_btn course-detail_buy-now"
                                ghost
                              >
                                Buy Now
                              </Button>
                            </>
                          ) : (
                            <Button
                              type="primary"
                              className="course-detail_btn course-detail_add-to-cart"
                              onClick={() => {
                                if (authUser) handleEnrollForFreeCourse();
                                else navigate("/sign-in");
                              }}
                            >
                              Enroll now
                            </Button>
                          )}
                        </>
                      )}
                    </>
                  )}
                  <HeartButton
                    style={{ color: "white", borderColor: "white" }}
                    data={courseData}
                    onClick={handleHeartIconClick}
                    type={checkExistedInCart === -1 ? "add" : "remove"}
                  />
                </Space>
              </Space>
            </Col>
          </Row>
        </div>

        <Row
          className="course-detail_subcribes"
          justify="space-between"
          align="middle"
        >
          <Col>
            <Space align="center">
              <Link to={`/${pathLink.instructorDetail(courseData.user.id)}`}>
                <Avatar
                  style={{ width: "60px", height: "60px" }}
                  imgLink={
                    courseData.user.image ||
                    "https://gambolthemes.net/html-items/cursus_main_demo/images/left-imgs/img-1.jpg"
                  }
                ></Avatar>
              </Link>
              <Space direction="vertical" align="center">
                <Link to={`/${pathLink.instructorDetail(courseData.user.id)}`}>
                  <Typography.Text className="course-detail_instructor-name">
                    {courseData.user.fullName}
                  </Typography.Text>
                </Link>
                {!isSubscribed && courseData.user.id !== authUser?.id && (
                  <Button
                    type="primary"
                    className="course-detail_btn-subcribe"
                    onClick={(e) => handleSubscribe(courseData.user.id)}
                  >
                    Subscribe
                  </Button>
                )}
                {isSubscribed && courseData.user.id !== authUser?.id && (
                  <WhiteButtonUnsubscribed
                    type="primary"
                    onClick={(e) => handleUnSubscribe(courseData.user.id)}
                  >
                    Unsubscribe
                  </WhiteButtonUnsubscribed>
                )}
                {courseData.user.id === authUser?.id && (
                  <Button
                    type="primary"
                    className="course-detail_btn-subcribe"
                    onClick={(e) => navigate(`/profile/${courseData.user.id}`)}
                  >
                    My profile
                  </Button>
                )}
              </Space>
            </Space>
          </Col>
          <Col className="course-detail_subcribes-group-action">
            <Space>
              <Space
                className="course-detail_subcribes-action"
                direction="vertical"
                align="center"
              >
                <EyeOutlined />
                {/* Chưa có data */}
                <Typography.Text className="course-detail_subcribes-action-text">
                  {courseData?.viewNumber}
                </Typography.Text>
              </Space>
              {/* <Space
                className="course-detail_subcribes-action"
                direction="vertical"
                align="center"
              >
                <LikeOutlined />
                <Typography.Text className="course-detail_subcribes-action-text">
                  0
                </Typography.Text>
              </Space>
              <Space
                className="course-detail_subcribes-action"
                direction="vertical"
                align="center"
              >
                <DislikeOutlined />
                <Typography.Text className="course-detail_subcribes-action-text">
                  0
                </Typography.Text>
              </Space> */}
            </Space>
          </Col>
        </Row>
        <TabsDetailPage
          defaultActiveKey="1"
          tabBarStyle={{ fontWeight: "bold" }}
          centered
          tabPanes={tabPanesConfig}
        />
      </CourseDetailWrapper>
    );
  } else {
    return (
      <CourseDetailSkeletonWrapper justify="center">
        <Col span={10} md={8} className="course-detail_skeleton-col" style={{}}>
          <Skeleton.Image style={{ width: "100%" }} active />
        </Col>
        <Col span={14} md={16}>
          <Skeleton active paragraph={{ rows: 8 }} />
        </Col>
      </CourseDetailSkeletonWrapper>
    );
  }
}

export default CourseDetail;
