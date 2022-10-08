import {
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Col,
  message,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
  Button,
} from "antd";
import { postEnrollment } from "apis/features/Enrollment/EnrollmentAPI";
import * as wishlistApis from "apis/features/Favourite/Favourite";
import CourseImage from "components/CourseImage/CourseImage";
import HeartButton from "components/HeartButton/HeartButton";
import MoreDropdown from "components/MoreDropdown/MoreDropdown";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as authSelector from "redux/features/auth/AuthSelector";
import { selectCartItems } from "redux/features/cart/CartSelector";
import { CartAction } from "redux/features/cart/CartSlice";
import * as wishlistSelector from "redux/features/wishlist/WishlistSelector";
import { wishlistAction } from "redux/features/wishlist/WishlistSlice";
import { RedButtonDetailPage } from "Theme/GlobalStyles";
// redux
import {
  selectMyCreatedCourses,
  selectPurchasedCourses,
} from "redux/features/courses/coursesSelector";
import { pathLink } from "routes";
import CourseCardWrapper from "./CourseCardStyled";

function CourseCard(props) {
  const { hover, direction, purchased, isShowDetail } = props;
  const {
    id,
    bestSeller,
    rating,
    title,
    imageUrl,
    categories,
    price,
    salePrice,
    user,
    createdAt,
    totalTime,
    viewNumber,
  } = props.data;
  const wishlist = useSelector(wishlistSelector.selectWishlist);
  const myPurchasedCourses = useSelector(selectPurchasedCourses);
  const myCreatedCourses = useSelector(selectMyCreatedCourses);
  const [courseStatus, setCourseStatus] = React.useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const authUser = useSelector(authSelector.selectUser);

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

  useEffect(() => {
    if (
      // Kiểm tra đã enroll
      myPurchasedCourses.some((course) => course?.id === id) ||
      // Kiểm tra là khoá của tôi
      myCreatedCourses.some((course) => course?.id === id)
    ) {
      setCourseStatus("enrolled");
    }
  }, [myPurchasedCourses.length, myCreatedCourses.length]);

  const checkExistedInCart = React.useMemo(() => {
    return cartItems.findIndex((item) => item.id === props.data?.id);
  }, [cartItems, props.data]);

  const handleEnrollForFreeCourse = () => {
    if (props.data?.isFree) {
      (async () => {
        const response = await postEnrollment({
          courseId: id,
          userId: authUser?.id,
        });

        if (response?.data?.isSuccess) {
          setCourseStatus("enrolled");
          message.success("Enrolled successfully");
        } else {
          message.error("Enrolled fail");
        }
      })();
    }
  };

  const checkExistedInWishlist = React.useMemo(() => {
    return wishlist.findIndex((item) => item.id === id);
  }, [wishlist, id]);

  const moreDropdownSettings = [
    {
      key: 1,
      type: checkExistedInWishlist > -1 ? "remove" : "add",
      row: (
        <Space size={16}>
          {checkExistedInWishlist > -1 ? (
            <HeartFilled style={{ color: "red" }} />
          ) : (
            <HeartOutlined />
          )}
          <Typography.Text>Save</Typography.Text>
        </Space>
      ),
    },
  ];

  // {
  //   key: 2,
  //   row: (
  //     <Space size={16}>
  //       <FlagOutlined />
  //       <Typography.Text>Report</Typography.Text>
  //     </Space>
  //   ),
  // },

  return (
    <CourseCardWrapper direction={direction} hover={hover}>
      <div className="course-card_header-wrapper">
        <Link
          className="course-card_header"
          to={
            isShowDetail
              ? `/${pathLink.courseDetail(id)}`
              : myPurchasedCourses.some((course) => course?.id === id)
              ? `/download-course-view/${id}`
              : `/${pathLink.courseDetail(id)}`
          }
        >
          <CourseImage
            direction={direction}
            price={price}
            bestSeller={bestSeller}
            salePrice={salePrice}
            rating={rating}
            imgLink={imageUrl}
            totalTime={totalTime}
          />
        </Link>
      </div>
      <div className="course-card_body">
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Space size={2} className="course-card_text-wrap">
            <Typography.Text
              style={{ color: "var(--text-color)" }}
              className="course-card_views"
            >
              {`${viewNumber} views`}
            </Typography.Text>
            <Typography.Text style={{ color: "var(--text-color)" }}>
              {moment(createdAt).fromNow()}
            </Typography.Text>
          </Space>

          {/* <MoreDropdown 
            data={props.data}
            id={id}
            position={direction === "row" ? null : { top: "0", right: "32px" }}
            menu={moreDropdownSettings}
          /> */}
        </Space>
        <Link
          to={
            isShowDetail
              ? `/${pathLink.courseDetail(id)}`
              : myPurchasedCourses.some((course) => course?.id === id)
              ? `/download-course-view/${id}`
              : `/${pathLink.courseDetail(id)}`
          }
        >
          <Typography.Title
            className="course-card_title"
            level={5}
            ellipsis={{
              rows: 2,
              tooltip: title,
            }}
          >
            {title}
          </Typography.Title>
        </Link>

        <Space wrap size={[16, 0]}>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/result?category=${encodeURIComponent(category.name)}`}
            >
              <Typography.Text className="course-card_category">
                {category.name}
              </Typography.Text>
            </Link>
          ))}
        </Space>
        {purchased && (
          <Typography.Text className="course-card_purchased">
            purchased
          </Typography.Text>
        )}
        <div className="course-card_footer">
          <Row align="middle">
            <Col span={24}>
              <Typography.Text style={{ color: "var(--text-color)" }}>
                By{" "}
                <Link
                  to={`/${pathLink.instructorDetail(user?.id)}`}
                  className="course-card_link-instructor"
                >
                  {user?.fullName}
                </Link>
              </Typography.Text>
            </Col>
          </Row>
          <Row className="course-card_margin-top">
            <Col>
              {price === 0 ? (
                <Typography.Text className="course-card_price" strong>
                  Free
                </Typography.Text>
              ) : (
                <>
                  {salePrice ? (
                    <Space align="baseline">
                      <Typography.Text
                        className="course-card_price course-card_price-sale-right"
                        strong
                      >
                        ${(price - salePrice).toFixed(2)}
                      </Typography.Text>
                      <Typography.Text className="course-card_price course-card_price-sale-left">
                        ${price.toFixed(2)}
                      </Typography.Text>
                    </Space>
                  ) : (
                    <Typography.Text strong className="course-card_price">
                      ${price.toFixed(2)}
                    </Typography.Text>
                  )}
                </>
              )}
            </Col>
          </Row>
          <Row className="course-card_margin-top">
            <Col span={24}>
              <Space
                size={0}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {courseStatus === "enrolled" ? (
                  <Button
                    className="course-detail_btn course-detail_add-to-cart course-card_button"
                    onClick={() => navigate(`/download-course-view/${id}`)}
                  >
                    Watch your course
                  </Button>
                ) : (
                  <>
                    {price === 0 ? (
                      <Button
                        className="course-detail_btn course-detail_add-to-cart course-card_button"
                        onClick={() => {
                          if (authUser) handleEnrollForFreeCourse();
                          else navigate("/sign-in");
                        }}
                      >
                        {!myPurchasedCourses.some(
                          (course) => course?.course?.id === id
                        ) && "Enroll now"}
                      </Button>
                    ) : (
                      <>
                        {checkExistedInCart === -1 ? (
                          <>
                            <Button
                              icon={<ShoppingCartOutlined />}
                              className="course-detail_btn course-detail_add-to-cart course-card_button"
                              onClick={() =>
                                dispatch(CartAction.addItemToCart(props.data))
                              }
                            >
                              Add to cart
                            </Button>
                          </>
                        ) : (
                          <Button
                            className="course-detail_btn course-detail_add-to-cart course-card_button"
                            onClick={() => navigate("/shopping-cart")}
                          >
                            Go to cart
                          </Button>
                        )}
                      </>
                    )}
                  </>
                )}

                <HeartButton
                  onClick={handleHeartIconClick}
                  type={checkExistedInCart === -1 ? "add" : "remove"}
                  data={props?.data}
                />
              </Space>
            </Col>
          </Row>
        </div>
      </div>
    </CourseCardWrapper>
  );
}

export const CourseCardSekleton = () => {
  return (
    <CourseCardWrapper hover={false}>
      <div className="course-card_header-wrapper">
        <Skeleton.Image active block />
      </div>
      <div className="course-card_body mg-top">
        <Skeleton
          paragraph={{
            rows: 2,
          }}
        />
        <div className="course-card_footer d-flex justify-content-between">
          <Skeleton.Input
            active
            size={"default"}
            shape={"square"}
            block={false}
          />
          <Skeleton.Button
            active
            size={"default"}
            shape={"square"}
            block={false}
          />
        </div>
      </div>
    </CourseCardWrapper>
  );
};

export default CourseCard;
