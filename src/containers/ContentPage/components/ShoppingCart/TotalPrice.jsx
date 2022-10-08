import { Card, Checkbox, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "redux/features/auth/AuthSelector";
import * as cartSelector from "redux/features/cart/CartSelector";
import { CartAction } from "redux/features/cart/CartSlice";
import { RedButtonDetailPage } from "Theme/GlobalStyles";
import { UnderlineTitle } from "../Checkout/CheckoutStyled";
const { Title, Text } = Typography;

export default function TotalPrice() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalPrice = useSelector(cartSelector.selectTotalPrice);
  const totalDiscountPrice = useSelector(cartSelector.selectTotalDiscountPrice);
  const totalCartCheckout = useSelector(cartSelector.selectTotalCartCheckout);
  const cartItem = useSelector(cartSelector.selectCartItems);
  const checkedList = useSelector(cartSelector.selectCheckedList);
  const userProfile = useSelector(selectUser);
  const checkoutHandler = () => {
    if (userProfile) {
      dispatch(CartAction.setTypeBuy(""));
      navigate("/checkout");
    } else window.location = "/sign-in";
  };
  return (
    <div className="total-content">
      <Card>
        <Space direction="vertical" size="large" className="space-flex">
          <div>
            <Space align="baseline">
              <Checkbox
                indeterminate={
                  checkedList.length === 0
                    ? false
                    : cartItem.length === checkedList.length
                    ? false
                    : true
                }
                checked={cartItem.length === checkedList.length}
                onChange={(e) =>
                  e.target.checked === false
                    ? dispatch(CartAction.removeAllCheckedList())
                    : dispatch(CartAction.setAllCheckedList())
                }
              />
              <Title level={4}>Total</Title>
            </Space>
            <UnderlineTitle />
          </div>
          <div style={{ fontSize: "16px" }} className="price-content">
            <Title level={5}>Original Price</Title>
            <Text className="text-gray text-bold">
              {" "}
              {totalPrice === 0 ? 0 : `$${totalPrice.toFixed(2)}`}
            </Text>
          </div>
          <div style={{ fontSize: "16px" }} className="price-content">
            <Title level={5} className="text-gray">
              Discount Price
            </Title>
            <Text className="text-gray text-bold ">
              {totalDiscountPrice !== 0
                ? `$${totalDiscountPrice.toFixed(2)}`
                : 0}
            </Text>
          </div>
          <div className="price-content">
            <Title level={3}>Total</Title>
            <Title style={{ color: "red", margin: "0" }} level={3}>
              {totalCartCheckout === 0 ? 0 : `$${totalCartCheckout.toFixed(2)}`}
            </Title>
          </div>
          {/* <Row>
            <Col xs={18}>
              <Input placeholder="Enter Coupon Code" className="input-coupon" />
            </Col>
            <Col xs={6}>
              <Button type="danger" className="btn-coupon">
                Apply
              </Button>
            </Col>
          </Row> */}
          <RedButtonDetailPage
            disabled={checkedList.length > 0 ? false : true}
            onClick={checkoutHandler}
            type="danger"
            className="total-price_btn-checkout"
          >
            Checkout Now
          </RedButtonDetailPage>
        </Space>
      </Card>
    </div>
  );
}
