import {
  Button,
  Col,
  message,
  Progress,
  Rate,
  Row,
  Space,
  Typography,
} from "antd";
import { reviewAPI } from "apis/features/Review/reviewApi";
import { Data } from "assets/IconComponent";
import { ButtonStyled } from "components/Button/ButtonStyled";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { selectUser } from "redux/features/auth/AuthSelector";
import AuthUtils from "utils/AuthUtils";
import HaveNoRate from "./Components/HaveNoRate/HaveNoRate";
import Rated from "./Components/Rated/Rated";
import ReviewCard from "./Components/ReviewCard/ReviewCard";
import { postNotification } from "apis/features/Notification/Notification";
import { getEnrollmentByCourseId } from "apis/features/Enrollment/EnrollmentAPI";
import Wrapper from "./ReviewsPageStyled";

export default function ReviewsPage({ courseTitle, courseId, authorId }) {
  const Init_NumberReview = 5;
  const [currentNumberItem, setCurrentNumberItem] = useState(Init_NumberReview);
  const [selectedFilterPoint, setSelectedFilterPoint] = useState();
  const [rate, setRate] = useState({ rating: 5, content: "" });
  const [allReviewCourse, setAllReviewCourse] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [userRating, setUserRating] = useState();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  let cloneRatingList = useRef();
  let searchRef = useRef();
  const params = useParams();
  const location = useLocation();
  const userProfile = useSelector(selectUser);
  const handleChangePointRating = (point) => {
    setRate((rate) => ({ ...rate, rating: point }));
  };
  const onChangeRateContent = (e) => {
    setRate((rate) => ({ ...rate, content: e.target.value }));
  };
  console.log(allReviewCourse);

  const handleLoadMoreRating = (condition) => {
    switch (condition) {
      case "more":
        if (currentNumberItem < allReviewCourse.length) {
          setCurrentNumberItem((loadMore) => loadMore + 5);
        }
        break;
      case "less":
        if (currentNumberItem > 5) {
          setCurrentNumberItem((loadMore) => loadMore - 5);
        }
        break;
      default:
        return;
    }
  };
  const handleFilterRating = (point) => {
    if (cloneRatingList.current) {
      setAllReviewCourse(
        cloneRatingList.current?.filter((item) => {
          if (point === 1) {
            return item.rating >= point - 1 && item.rating < point + 1;
          } else {
            return item.rating >= point && item.rating < point + 1;
          }
        })
      );
      setSelectedFilterPoint(point);
    }
  };
  const handleSeeAllRating = () => {
    if (cloneRatingList.current) {
      setAllReviewCourse(cloneRatingList.current);
      setSelectedFilterPoint("");
    }
  };
  const renderDetailRating = () => {
    let filterValue = [5, 4, 3, 2, 1];
    let renderValue = filterValue.map((item) => {
      let filterPoint = cloneRatingList.current?.filter((review) => {
        if (item === 1) {
          return review.rating >= item - 1 && review.rating < item + 1;
        } else {
          return review.rating >= item && review.rating < item + 1;
        }
      });
      if (cloneRatingList.current) {
        return {
          percent:
            (filterPoint?.length / cloneRatingList.current?.length) * 100,
          point: item,
        };
      } else {
        return {
          percent: 0,
          point: item,
        };
      }
    });
    const html = renderValue.map((item, index) => {
      return (
        <div key={`rating-item-${index}`} className="detailRatingItem">
          <Progress
            className="progressBar"
            percent={item.percent}
            strokeColor="#ed2a26"
            strokeWidth={20}
            showInfo={false}
          />
          <Space className="detailRatingArea_wrapper">
            <Rate
              disabled
              allowHalf
              style={{ color: "#f2b01e", marginRight: 8 }}
              defaultValue={item.point}
            />
            <span
              onClick={() => {
                handleFilterRating(item.point);
              }}
              className={`detailRatingItem_percent ${
                selectedFilterPoint === item.point && "selected-filter-point"
              }`}
            >
              {!!item.percent ? item.percent.toFixed(0) : 0}%
            </span>
          </Space>
        </div>
      );
    });
    return html;
  };
  const renderMoreLessButton = () => {
    let lengthOfList = allReviewCourse?.length;
    //case data <= Init_NumberReview
    if (lengthOfList <= Init_NumberReview) {
      return;
    } else if (
      // case data > Init_NumberReview
      lengthOfList > Init_NumberReview
    ) {
      if (currentNumberItem === Init_NumberReview) {
        return (
          <Button
            className="review-page_show-more"
            type="text"
            onClick={() => handleLoadMoreRating("more")}
          >
            See More Reviews
          </Button>
        );
      } else if (currentNumberItem < lengthOfList) {
        return (
          <>
            <Button
              className="review-page_show-more"
              type="text"
              onClick={() => handleLoadMoreRating("more")}
            >
              See More Reviews
            </Button>
            <Button
              className="review-page_show-more"
              type="text"
              onClick={() => handleLoadMoreRating("less")}
            >
              See Less Reviews
            </Button>
          </>
        );
      } else {
        return (
          <Button
            className="review-page_show-more"
            type="text"
            onClick={() => handleLoadMoreRating("less")}
          >
            See Less Reviews
          </Button>
        );
      }
    }
  };
  const handleAverageRating = () => {
    let totalRatingPoint = 0;
    if (cloneRatingList?.current) {
      for (let review of cloneRatingList?.current) {
        totalRatingPoint += review?.rating;
      }
    }
    if (cloneRatingList.current) {
      return totalRatingPoint / cloneRatingList?.current?.length;
    } else {
      return 0;
    }
  };
  const getAllRating = () => {
    if (params.id) {
      // Case là review khoá học
      reviewAPI
        .getCourseReviewOfAllUser(params.id)
        .then((res) => {
          setAllReviewCourse(res.data.data);
          cloneRatingList.current = [...res.data.data];
        })
        .catch((err) => {
          console.log("course get all review err: ", err);
        });
    } else if (userProfile.role === "Student") {
      // Case là lấy review của student
      reviewAPI
        .getAllMyReviews()
        .then((res) => {
          if (res?.data?.data?.length > 0) {
            setAllReviewCourse(res.data.data);
            cloneRatingList.current = [...res.data.data];
          }
        })
        .catch((err) => {
          console.log("course get all review err: ", err);
        });
    } else if (userProfile.role === "Instructor") {
      reviewAPI
        // Case là lấy review của instructor
        .getAllMyStudentsReviews()
        .then((res) => {
          if (res?.data?.data?.length > 0) {
            setAllReviewCourse(res.data.data);
            cloneRatingList.current = [...res.data.data];
          }
        })
        .catch((err) => {
          console.log("course get all review err: ", err);
        });
    }
  };
  const getUserRating = () => {
    if (params.id) {
      reviewAPI
        .getCourseReviewOfUser(params.id)
        .then((res) => {
          setUserRating(res.data.data);
          setRate((rate) => ({
            ...rate,
            rating: res.data.data?.rating,
            content: res.data.data?.content,
          }));
        })
        .catch((err) => {
          console.log("err user rating: ", err);
        });
    }
  };
  const createNewRating = (payload) => {
    reviewAPI
      .createCourseReview(payload)
      .then((res) => {
        getAllRating();
        getUserRating();
        message.success("Create Review Success");
      })
      .catch((err) => {
        message.error(`Create FAIL: ${err.response.data.message}`);

        console.log(err);
      });
  };
  const changeToUpdateReviewUI = () => {
    if (!loading) {
      setIsUpdate((isUpdate) => !isUpdate);
    }
  };
  const updateRating = (id, payload) => {
    setLoading(true);
    reviewAPI
      .updateCourseReview(id, payload)
      .then((res) => {
        getAllRating();
        getUserRating();
        setLoading(false);
        setSelectedFilterPoint("");
        changeToUpdateReviewUI();
        message.success("Update Success");
      })
      .catch((err) => {
        setLoading(false);
        message.error(`Update FAIL: ${err.response.data.message}`);
        console.log(err);
      });
  };

  const handleUpdateRating = (data) => {
    if (userRating?.isActive) {
      updateRating(userRating?.id, data);
    }
  };
  const handleCreateNewRating = async (data) => {
    const payload = {
      ...data,
      enrollmentRequest: {
        courseId: params.id,
        userId: userInfo.id,
      },
    };
    await createNewRating(payload);
    // Notify for all enrollment
    const responseGetEnrollment = await getEnrollmentByCourseId(courseId);
    const receiverIds = responseGetEnrollment?.data?.data
      ?.map((item) => item?.user?.id)
      .filter((item) => item !== userInfo.id);
    postNotification({
      userIds: [...receiverIds, authorId],
      type: 0,
      content: `${userInfo?.fullName} have commented on course ${courseTitle}`,
    });
  };
  const handleChangeSearchRating = () => {
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    searchRef.current = setTimeout(() => {
      console.log("Search");
    }, [1000]);
  };
  const UserRating = () => {
    if (userRating?.isActive) {
      return (
        <Rated
          handleChangePointRating={handleChangePointRating}
          onChangeRateContent={onChangeRateContent}
          reviewContent={userRating}
          rate={rate}
          loading={loading}
          onSubmit={handleUpdateRating}
          onUpdate={changeToUpdateReviewUI}
          isUpdate={isUpdate}
        />
      );
    }

    return (
      <HaveNoRate
        rate={rate}
        handleChangePointRating={handleChangePointRating}
        onChangeRateContent={onChangeRateContent}
        loading={loading}
        onSubmit={handleCreateNewRating}
      />
    );
  };
  useEffect(() => {
    getAllRating();
    getUserRating();
    setUserInfo(userProfile);
  }, []);
  return (
    <Wrapper>
      <Row className="reviewAndFeedbackArea" gutter={[32, 0]}>
        {/* Rating area */}
        <Col sm={24} xl={12} className="review-page_left">
          <Space
            className="review-page_left-wrapper"
            direction="vertical"
            size={16}
          >
            {(params.id || userProfile.role === "Instructor") && (
              <Typography.Title level={4} className="review-page_header">
                Student Feedback
              </Typography.Title>
            )}

            {!params.id && userProfile.role === "Student" && (
              <Typography.Title level={4} className="review-page_header">
                All My Feedback
              </Typography.Title>
            )}

            <div className="ratingArea averageRating">
              <div className="">
                <Typography.Text className="ratingItem">
                  {handleAverageRating()
                    ? handleAverageRating()?.toFixed(1)
                    : 0}
                </Typography.Text>
                <Rate
                  disabled
                  allowHalf
                  style={{ color: "#f2b01e" }}
                  value={handleAverageRating()}
                  className="ratingItem"
                />
                <Typography.Text className="ratingItem_text">
                  Course Rating
                </Typography.Text>
              </div>

              <ButtonStyled onClick={handleSeeAllRating}>
                See all rating
              </ButtonStyled>
            </div>
            <Space direction="vertical" className="detailRatingArea" size={16}>
              {renderDetailRating()}
            </Space>
            {location.pathname.includes(`download-course-view`) && (
              <UserRating />
            )}
          </Space>
        </Col>

        {/* All my review */}
        <Col sm={24} xl={12} className="review-page_right">
          <div className="review-page_right-header">
            <Typography.Title level={4} className="header">
              Reviews
            </Typography.Title>
            {/* <Input.Search
              onChange={handleChangeSearchRating}
              placeholder="Search review"
              enterButton="Search"
            /> */}
          </div>

          {/* All comment here */}
          {!allReviewCourse || allReviewCourse?.length === 0 ? (
            <div className="no-review" style={{ marginTop: "100px" }}>
              <Data width={50} height={50} fill="white" />
              <Typography.Paragraph>
                This course have no review
              </Typography.Paragraph>
            </div>
          ) : (
            <div className="commentArea">
              {allReviewCourse
                ?.slice(0, currentNumberItem)
                .map((item, index) => {
                  const { enrollment } = item;
                  const { user } = enrollment;
                  return (
                    <ReviewCard
                      courseTitle={
                        !params.id && item?.enrollment?.course?.title
                      }
                      key={`rating-item-${index}`}
                      linkAvatar={user.image}
                      userName={user.fullName}
                      userId={user.id}
                      createdAt={item.createdAt}
                      startPoint={item.rating}
                      comment={item.content}
                      isShowReportButton={
                        params.id ||
                        AuthUtils?.getUserProfile()?.role === "Instructor"
                      }
                    />
                  );
                })}

              <Space align="center" style={{ width: "100%" }}>
                {renderMoreLessButton()}
              </Space>
            </div>
          )}
        </Col>
      </Row>
    </Wrapper>
  );
}
