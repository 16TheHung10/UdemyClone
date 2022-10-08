import { Button, Col, Image, Row } from "antd";
import React from "react";
import { ContainerLayout } from "../../Layout/LayoutCursusMainStyled";
import { AboutSecsion } from "../AboutStyled";
import SubTitle from "../../Component/Typography/SubTitle/SubTitle";
import TitleStyled from "../../Component/Typography/Title/TitleStyled";
import { MeetOurTeamStyled } from "./MeetOurTeamStyled";
import { Typography } from "antd";
import TeamImage from "assets/images/team.jpg";
export default function MeetOurTeam() {
  return (
    <AboutSecsion className="about-meet-team">
      <MeetOurTeamStyled>
        <ContainerLayout className="meet-team">
          <TitleStyled>Our Global Reach</TitleStyled>
          <SubTitle className="meet-team-subtitle">
            Cursus is the leading global marketplace for teaching and learning,
            connecting millions of students to the skills they need to succeed.
          </SubTitle>
          <Row gutter={[16, 16]} className="meet-team-content">
            <Col sm={24} lg={12} className="meet-team-content-left">
              <Typography.Paragraph className="meet-team-content-paragraph">
                Morbi eget elit eget turpis varius mollis eget vel massa. Donec
                porttitor, sapien eget commodo vulputate, erat felis aliquam
                dolor, non condimentum libero dolor vel ipsum. Sed porttitor
                nisi eget nulla ullamcorper eleifend. Fusce tristique sapien
                nisi, vel feugiat neque luctus sit amet. Quisque consequat quis
                turpis in mattis. Maecenas eget mollis nisl. Cras porta dapibus
                est, quis malesuada ex iaculis at. Vestibulum egestas tortor in
                urna tempor, in fermentum lectus bibendum. In leo leo, bibendum
                at pharetra at, tincidunt in nulla. In vel malesuada nulla, sed
                tincidunt neque. Phasellus at massa vel sem aliquet sodales non
                in magna. Ut tempus ipsum sagittis neque cursus euismod. Vivamus
                luctus elementum tortor, ac aliquet dolor vehicula et.
              </Typography.Paragraph>
              <Button className="meet-team-content-button">
                Join Our Team
              </Button>
            </Col>
            <Col sm={24} lg={12} className="meet-team-content-right">
              <Image
                src={TeamImage}
                preview={false}
                className="meet-team-content-img"
              />
            </Col>
          </Row>
        </ContainerLayout>
      </MeetOurTeamStyled>
    </AboutSecsion>
  );
}
