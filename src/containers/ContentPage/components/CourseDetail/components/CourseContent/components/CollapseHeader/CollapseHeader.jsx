import { Typography } from "antd";
import React from "react";
import CollapseHeaderWrapper from "./CollapseHeaderStyled";

const CollapseHeader = (props) => {
  const { title, totalLectures, totalTime } = props;
  return (
    <CollapseHeaderWrapper>
      <Typography.Text className="collapse-header_title" strong>
        {title}
      </Typography.Text>
      <Typography.Text strong className="collapse-header_lecture">
        {totalLectures} lectures
      </Typography.Text>
      <Typography.Text className="collapse-header_totalTime" strong>
        {totalTime}
      </Typography.Text>
    </CollapseHeaderWrapper>
  );
};

export default CollapseHeader;
