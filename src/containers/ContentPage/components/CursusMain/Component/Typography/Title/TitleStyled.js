import React from "react";
import { Typography } from "antd";
export default function TitleStyled({ children }) {
  return (
    <Typography.Title
      level={4}
      style={{ fontWeight: "700", marginBottom: "1.7rem" }}
    >
      {children}
    </Typography.Title>
  );
}
