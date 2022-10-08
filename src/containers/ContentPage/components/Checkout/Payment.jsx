import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Divider, Row, Tabs, Typography } from "antd";
import * as checkout from "apis/features/Cart/Checkout";
import { ReactComponent as AmericanExpress } from "assets/svg/american-express.svg";
import { ReactComponent as Discover } from "assets/svg/cc-discover.svg";
import { ReactComponent as MasterCard } from "assets/svg/mastercard.svg";
import { ReactComponent as Paypal } from "assets/svg/paypal.svg";
import { ReactComponent as UnionPay } from "assets/svg/UnionPay.svg";
import { ReactComponent as Visa } from "assets/svg/visa.svg";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as cartSelector from "redux/features/cart/CartSelector";
import {
  selectCheckoutItem,
  selectTotalPrice,
} from "redux/features/cart/CartSelector";
import * as loadingSelector from "redux/features/loading/LoadingSelectors";
import { LoadingAction } from "redux/features/loading/LoadingSlices";
import * as yup from "yup";
import {
  UnderlineTitle,
  WrapperBilling,
  WrapperContent,
  WrapperOrderDetail,
  WrapperOrderSum,
  WrapperPaddingTxt,
  WrapperPayment,
} from "./CheckoutStyled";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const SummaryItem = (props) => {
  const { className } = props;
  const { imageUrl, title, price, salePrice } = props.data;
  return (
    <Row className={className} align="middle" gutter={[8, 16]}>
      <Col xs={8} sm={6}>
        <img
          style={{
            width: "100%",
            border: "1px solid rgba(0,0,0,0.2)",
            height: "100px",
            objectFit: "center",
          }}
          src={imageUrl}
          alt=""
        />
      </Col>
      <Col xs={16} sm={14}>
        <Text strong style={{ fontSize: "16px", padding: "6px" }}>
          {title}
        </Text>
      </Col>
      <Col xs={24} sm={4} style={{ textAlign: "right" }}>
        {salePrice !== 0 ? (
          <>
            <Title
              className="cart-item_price-left payment-color_red"
              style={{ margin: "0" }}
              level={4}
            >
              ${(price - salePrice).toFixed(2)}
            </Title>
            <Text
              style={{ textDecoration: "line-through" }}
              className="cart-item_price-right"
            >
              ${price.toFixed(2)}
            </Text>
          </>
        ) : (
          <Title
            className="cart-item_price-left payment-color_red"
            style={{ margin: "0" }}
            level={4}
          >
            ${price.toFixed(2)}
          </Title>
        )}
      </Col>
    </Row>
  );
};

// Schema yup for Credit/Debit Card
const schemaCreditDebitCard = yup
  .object()
  .shape({
    holderName: yup
      .string()
      .required("Holder name is required")
      .min(2, "Minimum must be greater 2 characters"),
    cardNumber: yup
      .number("Card Number Code must be a number")
      .required("Card Number is required"),
    expirationMonthYear: yup
      .date()
      .required("Expiration Month And Year is required"),
    cvcNumber: yup
      .number("CVC Number must be a number")
      .required("CVC Number is required"),
  })
  .required();

// Schema yup for Bank Transfer
const schemaBankTransfer = yup
  .object()
  .shape({
    accountHolderName: yup
      .string()
      .required("Holder name is required")
      .min(2, "Minimum must be greater 2 characters"),
    accountNumber: yup
      .number("Account Number Code must be a number")
      .required("Account Number is required"),
    bankName: yup
      .string()
      .required("Bank Name is required")
      .min(2, "Minimum must be greater 2 characters"),
    ifscNumber: yup
      .number("IFSC Number must be a number")
      .required("IFSC Number is required"),
  })
  .required();

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isGlobalLoading = useSelector(loadingSelector.selectLoading);
  const cartItems = useSelector(selectCheckoutItem);
  const totalPrice = useSelector(cartSelector.selectTotalPrice);
  const totalDiscountPrice = useSelector(cartSelector.selectTotalDiscountPrice);
  const totalCartCheckout = useSelector(cartSelector.selectTotalCartCheckout);
  const buyItemNow = useSelector(cartSelector.selectItemTypeBuy);
  const typeBuy = useSelector(cartSelector.selectTypeBuy);
  const [isLoading, setIsLoading] = React.useState(false);
  // state of tab
  const [tab, setTab] = useState(1);
  // UseForm hook for Credit/Debit Card
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      holderName: "",
      cardNumber: "",
      expirationMonthAndYear: "",
      cvcNumber: "",
    },
    resolver: yupResolver(schemaCreditDebitCard),
  });

  // Ref of form
  const submitFormCreditDebitCard = useRef();
  const submitFormBankTransfer = useRef();

  // UseForm hook for Bank Transfer
  const {
    control: control2,
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm({
    defaultValues: {
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      ifscNumber: "",
    },
    resolver: yupResolver(schemaBankTransfer),
  });

  // Onchange tab
  const onChangeTab = (key) => {
    setTab(Number(key));
  };

  // Handle submit form
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // action based on tab
  const handleSubmitTotal = async (e) => {
    setIsLoading(true);
    let result;
    if (typeBuy === "Buy Now") {
      result = {
        courses: [
          {
            id: buyItemNow.id,
            title: buyItemNow.title,
            price: buyItemNow.price - buyItemNow.salePrice,
          },
        ],
      };
    } else {
      result = {
        courses: cartItems.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price - item.salePrice,
        })),
      };
    }
    try {
      const res = await checkout.Checkout(result);
      if (res?.data?.isSuccess) {
        dispatch(LoadingAction.updateLoading(true));
        window.location.replace(res.data.redirectUrl);
      }
      // navigate("/checkout/failed?token=EC-0N546255EU4036015");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
    // switch (tab) {
    //   case 1:
    //     submitFormCreditDebitCard.current.submit();
    //     break;
    //   case 2:
    //     submitFormBankTransfer.current.submit();
    //     break;
    //   case 3:
    //     // code block
    //     break;
    //   default:
    //   // code block
    // }
  };

  return (
    <WrapperContent>
      <WrapperBilling>
        <WrapperPaddingTxt>
          <Title level={4}>Select Payment Method</Title>
          <UnderlineTitle />
        </WrapperPaddingTxt>

        <Tabs type="card" className="tab-payment" onChange={onChangeTab}>
          {/* Tabpane 1 */}
          {/* <TabPane
            tab={
              <>
                <CreditCardOutlined className="icon-credit" />
                <Text>Credit/Debit Card</Text>
              </>
            }
            className="tab-title"
            key="1"
          >
   
            <Form
              ref={submitFormCreditDebitCard}
              name="basic"
              layout={"vertical"}
              labelCol={{ span: 16 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={handleSubmit(onFinish)}
              onFinishFailed={onFinishFailed}
            >
              <Row className="margin-tab">
                
                <Col xs={24} lg={11}>
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        Holder Name
                      </span>
                    }
                    validateStatus={errors.holderName ? "error" : ""}
                    help={errors.holderName?.message}
                  >
                    <Controller
                      name="holderName"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="Holder Name" {...field} />
                      )}
                    />
                  </Form.Item>
                </Col>

                <Col xs={0} lg={2}></Col>
               
                <Col xs={24} lg={11}>
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        Card Number
                      </span>
                    }
                    validateStatus={errors.cardNumber ? "error" : ""}
                    help={errors.cardNumber?.message}
                  >
                    <Controller
                      name="cardNumber"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="Card Number" {...field} />
                      )}
                    />
                  </Form.Item>
                </Col>

               
                <Col xs={24} lg={11}>
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        Expiration Month And Year
                      </span>
                    }
                    validateStatus={errors.expirationMonthYear ? "error" : ""}
                    help={errors.expirationMonthYear?.message}
                  >
                    <Controller
                      name="expirationMonthYear"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          placeholder="Expiration Month And Year"
                          picker="month"
                          style={{
                            width: "100%",
                          }}
                          {...field}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col xs={0} lg={2}></Col>

               
                <Col xs={24} lg={11}>
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        CVC Number
                      </span>
                    }
                    validateStatus={errors.cvcNumber ? "error" : ""}
                    help={errors.cvcNumber?.message}
                  >
                    <Controller
                      name="cvcNumber"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="CVC Number" {...field} />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Button
                type="primary"
                danger
                htmlType="submit"
                ref={submitFormCreditDebitCard}
              >
                Save Changes
              </Button>
            </Form>
          </TabPane> */}

          {/* <TabPane
            tab={
              <>
                <BankOutlined className="icon-bank" />
                <Text>Bank Transfer</Text>
              </>
            }
            className="tab-title"
            key="2"
          >
            <Form
              ref={submitFormBankTransfer}
              name="basic"
              layout={"vertical"}
              labelCol={{ span: 16 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={handleSubmit2(onFinish)}
              onFinishFailed={onFinishFailed}
            >
              <Row className="margin-tab">
                
                <Col xs={24} lg={11}>
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        Account Holder Name
                      </span>
                    }
                    validateStatus={errors2.accountHolderName ? "error" : ""}
                    help={errors2.accountHolderName?.message}
                  >
                    <Controller
                      name="accountHolderName"
                      control={control2}
                      render={({ field }) => (
                        <Input placeholder="Account Holder Name" {...field} />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col xs={0} lg={2}></Col>

                
                <Col xs={24} lg={11}>
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        Account Number
                      </span>
                    }
                    validateStatus={errors2.accountNumber ? "error" : ""}
                    help={errors2.accountNumber?.message}
                  >
                    <Controller
                      name="accountNumber"
                      control={control2}
                      render={({ field }) => (
                        <Input placeholder="Account Number" {...field} />
                      )}
                    />
                  </Form.Item>
                </Col>

                
                <Col xs={24} lg={11}>
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        Bank Name
                      </span>
                    }
                    validateStatus={errors2.bankName ? "error" : ""}
                    help={errors2.bankName?.message}
                  >
                    <Controller
                      name="bankName"
                      control={control2}
                      render={({ field }) => (
                        <Select {...field}>
                          <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col xs={0} lg={2}></Col>

               
                <Col xs={24} lg={11}>
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        IFSC Number
                      </span>
                    }
                    validateStatus={errors2.ifscNumber ? "error" : ""}
                    help={errors2.ifscNumber?.message}
                  >
                    <Controller
                      name="ifscNumber"
                      control={control2}
                      render={({ field }) => (
                        <Input placeholder="IFSC Number" {...field} />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </TabPane> */}

          {/* Tabpane 3 */}
          <TabPane
            tab={
              <>
                <Paypal className="paypal-icon" />
                <Text>Paypal</Text>
              </>
            }
            className="tab-title"
            key="3"
          >
            <Paragraph className="gray-text margin-tab">
              After payment via PayPal's secure checkout, we will send you a
              link to download your files.
            </Paragraph>
            <WrapperPayment>
              <Text className="gray-text">PayPal accepts </Text>
              <Visa className="payment-icon" />
              <MasterCard className="payment-icon" />
              <AmericanExpress className="payment-icon" />
              <Discover className="payment-icon" />
              <UnionPay className="payment-icon" />
            </WrapperPayment>
          </TabPane>
        </Tabs>
        <WrapperPaddingTxt>
          <Divider />
        </WrapperPaddingTxt>
        <WrapperOrderDetail>
          <WrapperOrderSum>
            <Title level={4}>Order Details</Title>
            <UnderlineTitle />
          </WrapperOrderSum>
          <Row className="row-summary" gutter={[0, 16]}>
            <Col span={24}>
              {typeBuy === "Buy Now" ? (
                <SummaryItem
                  className="border-bot-sum"
                  key={buyItemNow.id}
                  data={buyItemNow}
                />
              ) : (
                cartItems.map((item) => (
                  <SummaryItem
                    className="border-bot-sum"
                    key={item.id}
                    data={item}
                  />
                ))
              )}
            </Col>
            <Col span={24}>
              <Row>
                <Col xs={6}>
                  <Title level={4}>Total</Title>
                </Col>
                <Col xs={18} style={{ textAlign: "right" }}>
                  <Title className="payment-color_red" level={3}>
                    {`$${
                      typeBuy === "Buy Now"
                        ? (buyItemNow.price - buyItemNow.salePrice).toFixed(2)
                        : totalCartCheckout.toFixed(2)
                    }`}
                  </Title>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <div style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  loading={isLoading}
                  className="btn-confirm"
                  onClick={(e) => handleSubmitTotal(e)}
                >
                  Confirm Checkout
                </Button>
              </div>
            </Col>
          </Row>
        </WrapperOrderDetail>
      </WrapperBilling>
    </WrapperContent>
  );
}
