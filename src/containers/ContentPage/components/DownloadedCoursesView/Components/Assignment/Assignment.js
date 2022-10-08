import React, { useState } from "react";
import { Typography, Row, Col, Input } from "antd";
import { AssignmentWrapper } from "./AssignmentStyled";
import { Data } from "assets/IconComponent";
const { Title, Text } = Typography;
const { TextArea } = Input;
export default function Assignment({ assignment }) {
  const { title, description, attachments } = assignment;
  const [answer, setAnswer] = useState();
  const renderAttachment = () => {
    const html = attachments.map((attachment, index) => {
      return (
        <a
          key={`attachment-${index}`}
          href={attachment.url}
          target="_blank"
          rel="noreferrer"
          download
        >
          {attachment.name}
        </a>
      );
    });
    return html;
  };
  const handleChangeAnswer = (e) => {
    console.log(e.target.value);
    setAnswer(e.target.value);
  };
  console.log(assignment);
  return (
    <AssignmentWrapper>
      {attachments ? (
        <div className="assignment">
          <Title className="assignment-title" level={2}>
            Assignment - {title || "Assignment Title"}
          </Title>
          <Title className="assignment-des">{description}</Title>
          <TextArea
            className="assignment-text-area"
            rows={6}
            placeholder="Type your answer"
            onChange={handleChangeAnswer}
          />
          {assignment?.attachments.length !== 0 && (
            <div className="assignment-attachment">
              <Title className="attachment-title" level={2}>
                Attachment:
              </Title>
              {renderAttachment()}
            </div>
          )}
        </div>
      ) : (
        <div className="no-attachments">
          <Data width={50} height={50} fill="#f0f2f5" />
          <Typography.Paragraph>Have no quizzes</Typography.Paragraph>
        </div>
      )}
    </AssignmentWrapper>
  );
}
