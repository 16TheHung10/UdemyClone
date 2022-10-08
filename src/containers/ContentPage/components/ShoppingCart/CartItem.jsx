import { CloseOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { Card, Col, Image, Row, Typography, Tag, Space } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { CartAction } from "redux/features/cart/CartSlice";
import * as cartSelector from "redux/features/cart/CartSelector";
import { pathLink } from "routes";
const { Title, Text } = Typography;
export default function CartItem(props) {
  const dispatch = useDispatch();
  const { title, price, categories, user, imageUrl, id, salePrice } =
    props.data;
  const checkedList = useSelector(cartSelector.selectCheckedList);
  return (
    <Card className="cart-item">
      <div className="btn-close-container">
        <CloseOutlined
          onClick={() => dispatch(CartAction.removeItemFromCart(id))}
          className="btn-close-xs"
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }} size={20}>
        <Checkbox
          checked={
            checkedList.findIndex((item) => id === item.id) === -1
              ? false
              : true
          }
          onChange={(e) =>
            e.target.checked === false
              ? dispatch(CartAction.removeCheckedList(id))
              : dispatch(CartAction.setCheckedList(props.data))
          }
          style={{ marginRight: "20px" }}
        />
        <Row style={{ flex: "1" }}>
          <Col xs={24} md={8}>
            <Link
              style={{ position: "relative", display: "block" }}
              to={`/${pathLink.courseDetail(id)}`}
            >
              <Image
                src={imageUrl}
                preview={false}
                alt={`course-cart`}
                className="course-img"
              />
              {!!salePrice && (
                <Tag
                  className="course-img_overlay-badge_sale-tag"
                  color="#f50"
                >{`-${((salePrice / price) * 100).toFixed()}%`}</Tag>
              )}
            </Link>
          </Col>
          <Col xs={24} md={16}>
            <div className="cart-content">
              <div className="title-and-btn">
                <Link to={`/${pathLink.courseDetail(id)}`}>
                  <Title level={4}>{title}</Title>
                </Link>
                <CloseOutlined
                  onClick={() => dispatch(CartAction.removeItemFromCart(id))}
                  className="btn-close-md"
                />
              </div>
              <Space wrap size={[16, 0]}>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    className="course-card_category-link"
                    to={`/result?category=${category.id}`}
                  >
                    <Typography.Text className="course-card_category">
                      {category.name}
                    </Typography.Text>
                  </Link>
                ))}
              </Space>
              <Space wrap className="author-and-price">
                <div>
                  <Text>By </Text>
                  <Link
                    className="course-card_author-name-link"
                    to={`/${pathLink.instructorDetail(user.id)}`}
                  >
                    {user.fullName}
                  </Link>
                </div>
              </Space>
              <Space className="cart-item_price" align="baseline">
                {salePrice !== 0 ? (
                  <>
                    <Title
                      className="cart-item_price-left"
                      style={{ margin: "0" }}
                      level={5}
                    >
                      ${(price - salePrice).toFixed(2)}
                    </Title>
                    <Text className="cart-item_price-right">
                      ${price.toFixed(2)}
                    </Text>
                  </>
                ) : (
                  <Title
                    className="cart-item_price-left"
                    style={{ margin: "0" }}
                    level={5}
                  >
                    ${price.toFixed(2)}
                  </Title>
                )}
              </Space>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
}
