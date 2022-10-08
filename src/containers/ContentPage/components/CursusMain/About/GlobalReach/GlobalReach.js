import React from "react";
import { ContainerLayout } from "../../Layout/LayoutCursusMainStyled";
import { AboutSecsion } from "../AboutStyled";
import SubTitle from "../../Component/Typography/SubTitle/SubTitle";
import TitleStyled from "../../Component/Typography/Title/TitleStyled";
import { GlobalReachStyled } from "./GlobalReachStyled";
import { Col, Row, Typography } from "antd";
export default function GlobalReach({ bg }) {
  const RenderData = [
    {
      title: "25K",
      subtitle: "Instructor",
    },
    {
      title: "95k",
      subtitle: "Courses",
    },
    {
      title: "40M",
      subtitle: "Course enrollments",
    },
    {
      title: "50+",
      subtitle: "Languages",
    },
    {
      title: "595+",
      subtitle: "Membership Partners",
    },
    {
      title: "295",
      subtitle: "Countries",
    },
  ];
  const renderItem = () => {
    return RenderData?.map((item, index) => {
      return (
        <Col xs={24} sm={12} md={8} lg={4} key={index}>
          <Typography.Title level={2} className="item-title">
            {item.title}
          </Typography.Title>
          <Typography.Text level={5}>{item.subtitle}</Typography.Text>
        </Col>
      );
    });
  };
  return (
    <AboutSecsion className="about-global-reach" bg={bg}>
      <GlobalReachStyled>
        <ContainerLayout className="global-reach">
          <TitleStyled>Our Global Reach</TitleStyled>
          <SubTitle className="global-reach-subtitle">
            Cursus is the leading global marketplace for teaching and learning,
            connecting millions of students to the skills they need to succeed.
          </SubTitle>
          <Row gutter={[16, 16]} className="global-reach-item-group">
            {renderItem()}
          </Row>
        </ContainerLayout>
      </GlobalReachStyled>
    </AboutSecsion>
  );
}
