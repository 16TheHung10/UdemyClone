import React from "react";
import { Badge, Dropdown, Space, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RedButtonDetailPage } from "Theme/GlobalStyles";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectTotalCartPrice,
} from "redux/features/cart/CartSelector";

const CartDropDownWrapper = styled.div`
  &&& {
  }
`;

const MenuDropdownWrapper = styled.div`
  &&& {
    width: 300px;
    z-index: 20;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
    .menu_cart-list {
      max-height: 350px;
      overflow-x: auto;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .menu_cart-item {
      padding: 16px;
      &:not(:last-child) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }
    }
    .menu_cart-item_wrapper {
      cursor: pointer;
      display: flex;
    }
    .menu_cart-button-wrapper {
      padding: 16px;
      border-top: 1px solid rgba(0, 0, 0, 0.2);
    }
    .menu_cart-button {
      width: 100%;
      height: 40px;
      font-size: 16px;
      font-weight: 500;
    }
    .menu_cart-item_image {
      width: 75px;
      height: 75px;
      object-fit: cover;
    }
    .menu_cart-item_ant-space {
      margin-left: 6px;
    }
    .menu_cart-empty {
      display: flex;
      text-align: center;
      flex-direction: column;
      padding: 20px;
      .ant-typography {
        font-size: 16px;
        &:last-child {
          cursor: pointer;
          margin-top: 16px;
        }
      }
    }
  }
`;

const MenuDropdown = (props) => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalCartPrice);
  const navigate = useNavigate();
  return (
    <MenuDropdownWrapper>
      {cartItems.length > 0 ? (
        <>
          <ul className="menu_cart-list beauty-scroll-bar">
            {cartItems?.map((item) => (
              <li key={item.id} className="menu_cart-item">
                <div
                  onClick={() => navigate(`/courses/${item.id}`)}
                  className="menu_cart-item_wrapper"
                >
                  <img
                    className="menu_cart-item_image"
                    alt=""
                    src={item.imageUrl}
                  />
                  <Space
                    direction="vertical"
                    size={0}
                    className="menu_cart-item_ant-space"
                  >
                    <Typography.Title
                      level={5}
                      style={{ margin: 0, lineHeight: "1" }}
                      ellipsis={{
                        rows: 2,
                        tooltip: item.title,
                      }}
                    >
                      {item.title}
                    </Typography.Title>
                    <Typography.Text style={{ fontSize: "12px" }}>
                      {item.user.fullName}
                    </Typography.Text>
                    <Typography.Text style={{ fontSize: "16px" }} strong>
                      {`$${item.price.toFixed(2)}`}
                    </Typography.Text>
                  </Space>
                </div>
              </li>
            ))}
          </ul>
          <div className="menu_cart-button-wrapper">
            <Typography.Title level={4}>Total: ${totalPrice.toFixed(2)}</Typography.Title>
            <RedButtonDetailPage
              onClick={() => navigate("/shopping-cart")}
              type="primary"
              className="menu_cart-button"
            >
              Go to cart
            </RedButtonDetailPage>
          </div>
        </>
      ) : (
        <>
          <div className="menu_cart-empty">
            <Typography.Text>Your cart is empty.</Typography.Text>
            <Typography.Text onClick={() => navigate("/")} strong>
              Keep shopping
            </Typography.Text>
          </div>
        </>
      )}
    </MenuDropdownWrapper>
  );
};

function CartDropDown(props) {
  const { totalCartItems } = props;
  const navigate = useNavigate();
  return (
    <CartDropDownWrapper>
      <Dropdown overlay={<MenuDropdown />} placement="bottomRight">
        <Badge
          onClick={() => navigate("/shopping-cart")}
          count={totalCartItems}
          className="cart-notifications"
        >
          <ShoppingCartOutlined className="notification" />
        </Badge>
      </Dropdown>
    </CartDropDownWrapper>
  );
}

export default CartDropDown;
