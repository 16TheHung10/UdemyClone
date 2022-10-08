import { Button, Divider, Typography, Space } from "antd";
import { LockOutlined } from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";
import * as cartSelector from "redux/features/cart/CartSelector";
import { UnderlineTitle, WrapperOrderSum } from "./CheckoutStyled";
const { Title } = Typography;

export default function SummaryBox() {
  const totalPrice = useSelector(cartSelector.selectTotalPrice);
  const totalDiscountPrice = useSelector(cartSelector.selectTotalDiscountPrice);
  const totalCartCheckout = useSelector(cartSelector.selectTotalCartCheckout);
  const buyItemNow = useSelector(cartSelector.selectItemTypeBuy);
  const typeBuy = useSelector(cartSelector.selectTypeBuy);

  return (
    <div className="order-summary">
      <WrapperOrderSum>
        <Title level={4}>Order Summary</Title>
        <UnderlineTitle />
      </WrapperOrderSum>
      <Space
        direction="vertical"
        style={{ width: "100%", marginTop: "32px", padding: "0 10px" }}
        size={32}
      >
        <Space className="order-summary_ant-space">
          <Title level={5}>Original price:</Title>
          <Title level={5} className="gray-text">
            {`$${
              typeBuy === "Buy Now"
                ? buyItemNow.price.toFixed(2)
                : totalPrice.toFixed(2)
            }`}
          </Title>
        </Space>
        <Space className="order-summary_ant-space">
          <Title level={5} className="gray-text">
            Discount:
          </Title>
          <Title level={5} className="gray-text">
            {`$${
              typeBuy === "Buy Now"
                ? buyItemNow.salePrice.toFixed(2)
                : totalDiscountPrice.toFixed(2)
            }`}
          </Title>
        </Space>
        <Divider style={{ margin: "0" }} />
        <Space className="order-summary_ant-space">
          <Title level={4}>Total:</Title>
          <Title className="payment-color_red" level={4}>{`$${
            typeBuy === "Buy Now"
              ? (buyItemNow.price - buyItemNow.salePrice).toFixed(2)
              : totalCartCheckout.toFixed(2)
          }`}</Title>
        </Space>
      </Space>
      <Button icon={<LockOutlined />} type="text" block disabled>
        Secure checkout
      </Button>
    </div>
  );
}
