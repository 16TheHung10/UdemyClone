import { Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import LivestreamCardWrapper from "./LivestreamCardStyled";

function LivestreamCard(props) {
  const { avatar, name } = props.data;
  return (
    <LivestreamCardWrapper>
      <Link to="#">
        <Space direction="vertical" align="center" size={4}>
          <Avatar style={{ width: "60px", height: "60px" }} imgLink={avatar} />
          <Typography.Text strong>{name}</Typography.Text>
          <Typography.Text style={{ position: "relative" }}>
            live <span className="livestream-card_live-dot"></span>
          </Typography.Text>
        </Space>
      </Link>
    </LivestreamCardWrapper>
  );
}

export default LivestreamCard;
