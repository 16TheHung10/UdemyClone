import React from "react";
import { Typography, Button, Space } from "antd";
import { ReactComponent as LivestreamIcon } from "assets/svg/feed.svg";
import CreateLivestreamWrapper from "./CreateLivestreamStyled";

function CreateLivestream(props) {
  return (
    <CreateLivestreamWrapper>
      <div className="create-live-stream_header">
        <Typography.Title level={5}>Live Streaming</Typography.Title>
      </div>
      <div className="create-live-stream_body">
        <Space direction="vertical" align="center" size={16}>
          <LivestreamIcon className="create-live-stream_icon" />
          <Typography.Text style={{ color: "var(--text-color)" }}>
            Set up your channel and stream live to your students
          </Typography.Text>
          <Button type="primary" danger>
            Get Started
          </Button>
        </Space>
      </div>
    </CreateLivestreamWrapper>
  );
}

export default CreateLivestream;
