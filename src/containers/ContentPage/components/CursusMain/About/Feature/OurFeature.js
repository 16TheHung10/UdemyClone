import { Col, Row } from "antd";
import React from "react";
import FeatureItem from "./FeatureItem/FeatureItem";

export default function OurFeature({ data }) {
  return (
    <Row gutter={[16, 16]} style={{ marginTop: "3rem" }}>
      {data?.map((item, index) => {
        return (
          <Col key={index} xs={24} sm={12} lg={6}>
            <FeatureItem
              icon={item.icon}
              title={item.title}
              content={item.content}
            />
          </Col>
        );
      })}
    </Row>
  );
}
