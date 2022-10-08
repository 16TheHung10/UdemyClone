import { Space, Typography } from "antd";
import React from "react";
import Avatar from "../Avatar/Avatar";
import StudentFeedbackCardWrapper from "./StundentFeedbackCardStyled";

function StudentFeedbackCard(props) {
  const { avatar, content, name } = props.data;
  return (
    <StudentFeedbackCardWrapper onClick={props.onClick}>
      <Typography.Paragraph
        ellipsis={{
          rows: 4,
        }}
        className="student-feedback-card_content"
      >
        {content}
      </Typography.Paragraph>
      <Space className="student-feedback-card_space">
        <Avatar style={{ width: "48px", height: "48px" }} imgLink={avatar} />
        <Typography.Text className="student-feedback-card_name" strong>
          {name}
        </Typography.Text>
      </Space>
    </StudentFeedbackCardWrapper>
  );
}

export default StudentFeedbackCard;
