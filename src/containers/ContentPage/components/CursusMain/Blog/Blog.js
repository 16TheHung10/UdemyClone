import { Col, Row } from "antd";
import React from "react";
import LayoutCursusMain from "../Layout/LayoutCursusMain";
import { ContainerLayout } from "../Layout/LayoutCursusMainStyled";
import LeftContent from "./LeftContent/LeftContent";
import RightContent from "./RightContent/RightContent";
import { BlogLayout } from "./BlogStyled";
export default function Blog() {
  return (
    <LayoutCursusMain title="Insights, ideas, and stories">
      <BlogLayout>
        <ContainerLayout className="blog">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={10} lg={6}>
              <div className="blog-left">
                <LeftContent />
              </div>
            </Col>
            <Col xs={24} md={14} lg={18}>
              <div className="blog-right">
                <RightContent />
              </div>
            </Col>
          </Row>
        </ContainerLayout>
      </BlogLayout>
    </LayoutCursusMain>
  );
}
