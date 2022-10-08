import React from "react";
import styled from "styled-components";
import { Typography, Space, Row, Col } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
const CourseAboutWrapper = styled.div`
  &&& {
    padding: 32px;
    .about_objective {
      margin-top: 32px;
      padding: 30px;
      background-color: #fff;
      border-radius: 3px;
      &-title {
        margin-bottom: 16px;
      }
      &-ant-space {
        .ant-space-item:first-child {
          display: flex;
        }
      }
    }
  }
`;

function CourseAbout(props) {
  const { data } = props;
  console.log(data.requirements.split("\n"));
  return (
    <CourseAboutWrapper>
      <Typography.Title level={4}>Requirements</Typography.Title>
      <Space direction="vertical" size={4}>
        {data.requirements.split("\n").map((requirement, index) => (
          <Typography.Text key={index} style={{ color: "var(--text-color)" }}>
            {requirement}
          </Typography.Text>
        ))}
      </Space>
      <Typography.Title style={{ marginTop: "16px" }} level={4}>
        Description
      </Typography.Title>
      <div
        style={{ color: "var(--text-color)" }}
        dangerouslySetInnerHTML={{ __html: data.description }}
      ></div>
      <div className="about_objective">
        <Typography.Title className="about_objective-title" level={4}>
          What you'll learn
        </Typography.Title>
        <Row>
          {data.objective.split("\n").map((item, index) => (
            <Col key={index} span={12}>
              <Space className="about_objective-ant-space">
                <CheckCircleFilled style={{ fontSize: "16px" }} />

                <Typography.Text>{item}</Typography.Text>
              </Space>
            </Col>
          ))}
        </Row>
      </div>
    </CourseAboutWrapper>
  );
}

export default CourseAbout;
