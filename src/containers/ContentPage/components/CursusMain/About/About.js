import React from "react";
import LayoutCursusMain from "../Layout/LayoutCursusMain";
import { ContainerLayout } from "../Layout/LayoutCursusMainStyled";
import { AboutLayout, AboutSecsion } from "./AboutStyled";
import OurFeature from "./Feature/OurFeature";
import OurStory from "./Story/OurStory";
import GlobalReach from "./GlobalReach/GlobalReach";
import SubTitle from "../Component/Typography/SubTitle/SubTitle";
import TitleStyled from "../Component/Typography/Title/TitleStyled";
import MeetOurTeam from "./MeetTeam/MeetOurTeam";

export default function About() {
  let backgroundSection = "#f7f7f7";
  const dataRenderFeature = [
    {
      icon: "ICON",
      title: "Mobile learning",
      content:
        "Quisque nec volutpat sem. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
      icon: "ICON",
      title: "Academic & Technical Support",
      content:
        "Quisque nec volutpat sem. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
      icon: "ICON",
      title: "Sharable Certificates",
      content:
        "Quisque nec volutpat sem. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
    {
      icon: "ICON",
      title: "An Inclusive Experience",
      content:
        "Quisque nec volutpat sem. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    },
  ];
  return (
    <LayoutCursusMain title="Improving Lives Through Learning">
      <AboutLayout className="about">
        <AboutSecsion bg={backgroundSection} className="about-our-feature">
          <ContainerLayout>
            <TitleStyled>Our Feature</TitleStyled>
            <SubTitle>On Cursus, you have access to:</SubTitle>
            <OurFeature data={dataRenderFeature} />
          </ContainerLayout>
        </AboutSecsion>

        <OurStory />
        <GlobalReach bg={backgroundSection} />
        <MeetOurTeam />
      </AboutLayout>
    </LayoutCursusMain>
  );
}
