import { Col, Image, Row } from "antd";
import React from "react";
import { ContainerLayout } from "../../Layout/LayoutCursusMainStyled";
import { AboutSecsion } from "../AboutStyled";
import SubTitle from "../../Component/Typography/SubTitle/SubTitle";
import TitleStyled from "../../Component/Typography/Title/TitleStyled";
import { Typography } from "antd";
import StoryImg from "assets/images/stroy_img.png";
export default function OurStory() {
  return (
    <AboutSecsion className="about-our-story">
      <ContainerLayout>
        <Row>
          <Col md={12} className="about-our-story-left">
            <TitleStyled>Our Story</TitleStyled>
            <SubTitle></SubTitle>
            <Typography.Paragraph className="paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              consectetur vel dolor id ultrices. Proin a magna at mi pretium
              pulvinar in eu enim. Nulla vel lacus lectus. Donec at venenatis
              augue. Nam vitae purus placerat, hendrerit nisl id, finibus magna.
              Etiam pharetra gravida ornare. Donec sagittis, ipsum in egestas
              egestas, dui lorem sollicitudin justo, ut ullamcorper velit neque
              eu velit. Ut et fringilla elit. Mauris augue augue, auctor a
              blandit ac, convallis eget neque. Curabitur in ante ante. Nullam
              laoreet tempus erat at ornare. In nisl nisi, dapibus eget
              facilisis sit amet, commodo quis nibh.
            </Typography.Paragraph>
          </Col>
          <Col md={12}>
            <Image src={StoryImg} preview={false} />
          </Col>
        </Row>
      </ContainerLayout>
    </AboutSecsion>
  );
}
