import { CloseCircleFilled } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Image,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import * as checkout from "apis/features/Cart/Checkout";
import logo from "assets/svg/logo1.svg";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { CartAction } from "redux/features/cart/CartSlice";
import * as loadingSelector from "redux/features/loading/LoadingSelectors";
import { LoadingAction } from "redux/features/loading/LoadingSlices";
import { RedButtonDetailPage } from "Theme/GlobalStyles";
import {
  WrapperContent,
  WrapperFlex,
  WrapperHeader,
} from "./CheckoutStatusStyled";

const { Title, Text } = Typography;

function CheckoutStatus(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(loadingSelector.selectLoading);
  const [orderDetail, setOrderDetail] = React.useState([]);
  const [checkoutIdItems, setCheckoutIdItems] = React.useState(null);
  const exportPdfRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => exportPdfRef.current,
  });

  React.useEffect(() => {
    let result;
    if (location.pathname === "/checkout/success") {
      if (location.pathname.replace("/checkout/", "") === "failed") {
        result = `${location.search}`;
      } else {
        result = `${location.search}`;
      }
      (async () => {
        dispatch(LoadingAction.updateLoading(true));
        try {
          const res = await checkout.CheckoutSuccess(result);
          const temp = [
            ...res.data.data.orderItems.map((course) => course.course.id),
          ];
          setCheckoutIdItems(temp);
          setOrderDetail(res.data.data);
          dispatch(LoadingAction.updateLoading(false));
        } catch (e) {
          dispatch(LoadingAction.updateLoading(false));
          throw new Error("Checkout error");
        }
      })();
    } else {
      setOrderDetail([]);
    }
  }, []);

  React.useEffect(() => {
    if (checkoutIdItems) {
      (async () => {
        dispatch(CartAction.updateCartItem(checkoutIdItems));
      })();
    }
  }, [checkoutIdItems, dispatch]);

  const columns = [
    { title: "No.", dataIndex: "id", align: "center" },
    {
      title: "",
      dataIndex: "",
      align: "center",
      render: (_, record) => (
        <img
          className="checkout-status_image-detail"
          alt=""
          src={record.course.imageUrl}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      align: "center",
      render: (_, record) => record.course.title,
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "center",
      render: (_, record) => `$${record.price.toFixed(2)}`,
    },
    {
      title: "",
      dataIndex: "",
      align: "center",
      render: (_, record) => (
        <RedButtonDetailPage
          onClick={() => navigate(`/download-course-view/${record.course.id}`)}
          style={{ height: "40px", color: "#fff", fontWeight: "600" }}
        >
          Watch your course
        </RedButtonDetailPage>
      ),
    },
  ];

  return (
    <>
      {location.pathname === "/checkout/success" ? (
        <>
          {!isLoading ? (
            <Row style={{ padding: "50px 20px" }} justify="center">
              <Col span={24} lg={16}>
                <Row ref={exportPdfRef}>
                  <WrapperHeader></WrapperHeader>
                  <WrapperContent>
                    <Row>
                      <Col span={12}>
                        <Title level={1} className="text-white">
                          Invoice
                        </Title>
                      </Col>
                      <Col span={12}>
                        <div className="brand-logo_checkout-wrapper">
                          <Image
                            style={{ cursor: "pointer" }}
                            src={logo}
                            preview={false}
                            className="brand-logo_checkout"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Divider />
                    <Row>
                      <Col span={12}>
                        <Space direction="vertical" size={2}>
                          <Typography.Text>From</Typography.Text>
                          <Typography.Title level={5}>
                            Cursus Company
                          </Typography.Title>
                          <Typography.Text>cursus@business.com</Typography.Text>
                          <Typography.Text>
                            Thu Duc, Ho Chi Minh City
                          </Typography.Text>
                          <Typography.Text>
                            Phone: {"(123) 456 7890"}
                          </Typography.Text>
                        </Space>
                      </Col>
                      <Col span={12}>
                        <Space direction="vertical" size={4}>
                          <Typography.Text>To</Typography.Text>
                          <Typography.Title
                            level={5}
                          >{`${orderDetail?.user?.firstName} ${orderDetail?.user?.lastName}`}</Typography.Title>
                          <Typography.Text>
                            {orderDetail?.user?.email}
                          </Typography.Text>
                        </Space>
                      </Col>
                    </Row>
                    <Divider />
                    <Row gutter={[0, 32]}>
                      <Col span={24}>
                        <Space direction="vertical">
                          <Typography.Text>
                            Number: {orderDetail?.id}
                          </Typography.Text>
                          <Text>
                            Date:{" "}
                            {moment(orderDetail?.orderDate).format(
                              "DD/MM/YYYY"
                            )}
                          </Text>
                        </Space>
                      </Col>
                      <Col span={24}>
                        <Table
                          rowKey={"id"}
                          columns={columns}
                          dataSource={
                            orderDetail?.orderItems?.map((item, index) => ({
                              ...item,
                              id: index + 1,
                            })) || []
                          }
                          pagination={false}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "16px" }}>
                      <Col span={24}>
                        <WrapperFlex>
                          <Title level={5}>
                            Invoice Total:{" "}
                            {`$${orderDetail?.total?.toFixed(2)}`}
                          </Title>
                          <Text>Paid via {orderDetail?.paymentMethod}</Text>
                        </WrapperFlex>
                      </Col>
                    </Row>
                  </WrapperContent>
                </Row>
                <Row
                  style={{
                    backgroundColor: "#fff",
                    padding: "4rem",
                  }}
                >
                  <Col xs={18}>
                    <Text>Thanks for buying.</Text>
                  </Col>
                  <Col xs={6}>
                    <Button
                      onClick={handlePrint}
                      className="btn-print"
                      type="primary"
                      block
                      danger
                    >
                      Print
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : (
            <div style={{ width: "100vw", height: "100vh" }}></div>
          )}
        </>
      ) : (
        <Row justify="center">
          <Col
            span={12}
            style={{ textAlign: "center", marginTop: "32px", height: "70vh" }}
          >
            <Space direction="vertical" size={16}>
              <CloseCircleFilled style={{ fontSize: "70px", color: "red" }} />
              <Typography.Title level={3}>
                There has been an error processing your request.
              </Typography.Title>
              <RedButtonDetailPage
                style={{
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "500",
                  height: "40px",
                }}
                onClick={() => navigate("/shopping-cart")}
              >
                Back to cart
              </RedButtonDetailPage>
            </Space>
          </Col>
        </Row>
      )}
    </>
  );
}

export default CheckoutStatus;
