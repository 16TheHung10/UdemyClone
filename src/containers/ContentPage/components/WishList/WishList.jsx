import { Breadcrumb, Col, PageHeader, Row, Space, Typography } from "antd";
import EmptyCartImage from "assets/images/empty-shopping-cart.jpg";
import useBreadcrumb from "hooks/useBreadcrumb";
import React from "react";
import { useSelector } from "react-redux";
import { selectWishlist } from "redux/features/wishlist/WishlistSelector";
import { routesBreadcrumb as breadcrumbNameMap } from "routes";
import { RedButtonDetailPage } from "Theme/GlobalStyles";
import CartList from "containers/ContentPage/components/ShoppingCart/CartList";
import CourseCard from "components/CourseCard/CourseCard";
import {
  Wrapper,
  WrapperContent,
  WrapperHead,
} from "containers/ContentPage/components/ShoppingCart/ShoppingCartStyled";
import { useNavigate } from "react-router-dom";

export default function WishList() {
  const navigate = useNavigate();
  const wishlistItems = useSelector(selectWishlist);
  const breadcrumbItems = useBreadcrumb(breadcrumbNameMap);

  const keepShoppingHandler = () => {
    navigate("/");
  };
  return (
    <Wrapper>
      <WrapperHead>
        <Row align="center">
          <Col span={18}>
            <PageHeader
              className="site-page-header"
              title="Wishlist"
              breadcrumbRender={() => (
                <Breadcrumb>{breadcrumbItems}</Breadcrumb>
              )}
            />
          </Col>
        </Row>
      </WrapperHead>

      <WrapperContent>
        {wishlistItems.length > 0 ? (
          <>
            {wishlistItems.map((item) => (
              <Row key={item.id} justify="center">
                <Col span={24} md={16} xl={10} style={{ marginBottom: "16px" }}>
                  <CourseCard direction={`row`} hover={true} data={item} />
                </Col>
              </Row>
            ))}
          </>
        ) : (
          <Row align="center">
            <Col>
              <Space
                direction="vertical"
                align="center"
                className="empty-cart_wrapper"
                size={20}
              >
                <img src={EmptyCartImage} alt="Empty shopping cart" />
                <Typography.Text
                  style={{ color: "var(--text-color)", fontSize: "16px" }}
                >
                  Your wishlist is empty. Keep shopping to find a course!
                </Typography.Text>
                <RedButtonDetailPage
                  onClick={keepShoppingHandler}
                  className="empty-cart_btn"
                >
                  Keep shopping
                </RedButtonDetailPage>
              </Space>
            </Col>
          </Row>
        )}
      </WrapperContent>
    </Wrapper>
  );
}
