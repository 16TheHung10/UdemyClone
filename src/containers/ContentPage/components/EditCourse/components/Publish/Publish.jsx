import { FormOutlined, UploadOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";
import Wrapper from "./PublishStyled";

export default function Publish() {
  return (
    <div className="basic-container">
      <div className="basic-header">
        <UploadOutlined className="icon-header" />
        <Typography.Text className="text-header">Publish</Typography.Text>
      </div>
      <Wrapper>
        <div className="content">
          <FormOutlined style={{ fontSize: "27px" }} />
          <p>
            Your course is in a draft state. Students cannot view, purchase or
            enroll in this course. For students that are already enrolled, this
            course will not appear on their student Dashboard.
          </p>
        </div>
      </Wrapper>
    </div>
  );
}
