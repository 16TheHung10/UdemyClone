import { Col, Row } from "antd";
import React from "react";
import SubTitle from "../Component/Typography/SubTitle/SubTitle";
import TitleStyled from "../Component/Typography/Title/TitleStyled";
import LayoutCursusMain from "../Layout/LayoutCursusMain";
import { ContainerLayout } from "../Layout/LayoutCursusMainStyled";
import { CompanySecsion } from "./CompanyStyled";
import { Typography } from "antd";
export default function Company() {
  return (
    <LayoutCursusMain title="Expanding learning opportunities">
      <CompanySecsion>
        <ContainerLayout>
          <Row className="our-origin">
            <Col md={12}>
              <TitleStyled className="our-origin-title">
                Our Origins
              </TitleStyled>
              <SubTitle className="our-origin-subtitle"></SubTitle>
              <Typography.Paragraph className="our-origin-paragraph">
                Cursus was founded in 2022 by computer science instructor with a
                vision to provide anyone, anywhere with access to the world’s
                best education. Now many instructors put their courses online
                for anyone to take and taught more learners in a few months than
                they could over an entire lifetime in the classroom. Today,
                Cursus has expanded to reach more than 40 million people and
                2,300 businesses around the world. On Cursus you can find online
                courses, instructors, and certificates from Cursus.
              </Typography.Paragraph>
            </Col>
            <Col md={12}></Col>
          </Row>
        </ContainerLayout>
      </CompanySecsion>
    </LayoutCursusMain>
  );
}
