import React from "react";
import { Typography } from "antd";
import StatisticCardWrapper from "./StatisticCardStyled";

function StatisticCard(props) {
  const { icon, title, content } = props;
  return (
    <StatisticCardWrapper>
      <div className="statistic-card_icon">{icon}</div>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Typography.Text style={{ color: "var(--text-color)" }}>
        {content}
      </Typography.Text>
    </StatisticCardWrapper>
  );
}

export default StatisticCard;
