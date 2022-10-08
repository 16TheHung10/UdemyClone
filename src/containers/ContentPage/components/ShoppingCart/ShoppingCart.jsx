import { Breadcrumb, Col, PageHeader, Row, Space, Typography } from "antd";
import EmptyCartImage from "assets/images/empty-shopping-cart.jpg";
import useBreadcrumb from "hooks/useBreadcrumb";
import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "redux/features/cart/CartSelector";
import { routesBreadcrumb as breadcrumbNameMap } from "routes";
import { RedButtonDetailPage } from "Theme/GlobalStyles";
import CartList from "./CartList";
import { Wrapper, WrapperContent, WrapperHead } from "./ShoppingCartStyled";
import { useNavigate } from "react-router-dom";
import TotalPrice from "./TotalPrice";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const breadcrumbItems = useBreadcrumb(breadcrumbNameMap);

  console.log(cartItems);

  const keepShoppingHandler = () => {
    navigate("/");
  };
  return (
    <Wrapper>
      <WrapperHead>
        <Row justify="center">
          <Col span={18}>
            <PageHeader
              className="site-page-header"
              title="Shopping Cart"
              breadcrumbRender={() => (
                <Breadcrumb>{breadcrumbItems}</Breadcrumb>
              )}
            />
          </Col>
        </Row>
      </WrapperHead>

      <WrapperContent>
        <Row justify="center">
          <Col span={24}>
            {cartItems.length > 0 ? (
              <Row justify="center">
                <Col span={24} xl={18}>
                  <Row>
                    <Col span={24} md={14} xl={16}>
                      <CartList data={cartItems} />
                    </Col>
                    <Col span={24} md={10} xl={8}>
                      <TotalPrice />
                    </Col>
                  </Row>
                </Col>
              </Row>
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
                      Your cart is empty. Keep shopping to find a course!
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
          </Col>
        </Row>
      </WrapperContent>
    </Wrapper>
  );
}
