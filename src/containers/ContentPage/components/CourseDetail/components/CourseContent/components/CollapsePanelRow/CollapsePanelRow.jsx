import { Typography, Space } from "antd";
import React from "react";
import CollapsePanelRowWrapper from "./CollapsePanelRowStyled";

const CollapsePanelRow = (props) => {
  const { Icon, title, preview, duration } = props;
  return (
    <CollapsePanelRowWrapper>
      <Space size={16} className="collapse-panel-row_ant-space">
        <Icon style={{ marginRight: "10px", fontSize: "16px" }} />
        <div className="collapse-panel-row_wrapper">
          <Typography.Text className="collapse-panel-row_title">
            {title}
          </Typography.Text>
          {preview && (
            <Typography.Text className="course-content_collapse-panel-row_preview">
              Preview
            </Typography.Text>
          )}
          <Typography.Text className="collapse-panel-row_duration">
            {duration}
          </Typography.Text>
        </div>
      </Space>
    </CollapsePanelRowWrapper>
  );
};

export default CollapsePanelRow;
