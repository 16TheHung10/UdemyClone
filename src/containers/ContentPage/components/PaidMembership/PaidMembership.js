import { Breadcrumb, PageHeader, Row, Typography, Col } from "antd";
import useBreadcrumb from "hooks/useBreadcrumb";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { routesBreadcrumb as breadcrumbNameMap } from "routes";
import BabyPlan from "./BabyPlan";
import BusinessPlan from "./BusinessPlan";
import FaqPanel from "./FaqPanel";
import { Wrapper, WrapperHead, WrapperPaid } from "./PaidMembershipStyled";
export default function PaidMembership() {
  const location = useLocation();
  const breadcrumbItems = useBreadcrumb(breadcrumbNameMap);
  if (location.pathname === "/paid-membership/checkout") {
    return <Outlet />;
  }

  return (
    <Wrapper>
      <WrapperHead>
        <Row className="d-flex justify-content-center">
          <Col span={18}>
            <PageHeader
              className="site-page-header"
              title="Paid Membership"
              breadcrumbRender={() => (
                <Breadcrumb>{breadcrumbItems}</Breadcrumb>
              )}
            />
          </Col>
        </Row>
      </WrapperHead>
      <Row className="d-flex justify-content-center">
        <Col span={18}>
          <WrapperPaid>
            <Row className="row-paid">
              <BabyPlan />
              <BusinessPlan />
            </Row>
          </WrapperPaid>
          <Typography.Title level={3} className="qa-text">
            Membership FAQ
          </Typography.Title>
          <Typography className="des-text qa-text">
            Wait, what about…
          </Typography>
          <FaqPanel />
        </Col>
      </Row>
    </Wrapper>
  );
}
