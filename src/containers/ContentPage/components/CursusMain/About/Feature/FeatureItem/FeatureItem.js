import React from "react";
import { Typography } from "antd";
import { FeatureItemStyled } from "./FeatureItemStyled";

export default function FeatureItem({ icon, title, content }) {
  return (
    <FeatureItemStyled>
      <div className="icon">{icon}</div>
      <Typography.Title level={5} className="title">
        {title}
      </Typography.Title>
      <Typography.Text>{content}</Typography.Text>
    </FeatureItemStyled>
  );
}
