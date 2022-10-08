import { Breadcrumb, Col, PageHeader, Row } from "antd";
import useBreadcrumb from "hooks/useBreadcrumb";
import React from "react";
import { routesBreadcrumb as breadcrumbNameMap } from "routes";
import BillDetail from "./BillDetail";
import Payment from "./Payment";
import { Wrapper, WrapperHeader } from "./CheckoutStyled";
import SummaryBox from "./SummaryBox";

export default function Checkout() {
  const breadcrumbItems = useBreadcrumb(breadcrumbNameMap);
  return (
    <Wrapper>
      <WrapperHeader>
        <Row justify="center">
          <Col span={18}>
            <PageHeader
              className="site-page-header"
              title="Checkout"
              breadcrumbRender={() => (
                <Breadcrumb>{breadcrumbItems}</Breadcrumb>
              )}
            />
          </Col>
        </Row>
      </WrapperHeader>
      <Row justify="center">
        <Col span={24} xl={18}>
          <Row style={{ marginTop: "22px" }}>
            <Col span={24} md={14} xl={16}>
              {/* <BillDetail /> */}
              <Payment />
            </Col>
            <Col span={24} md={10} xl={8} className="summary-box">
              <SummaryBox />
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
}
