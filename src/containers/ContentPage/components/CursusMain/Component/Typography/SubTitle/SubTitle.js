import React from "react";
import { SubtitleStyled } from "./SubTitleStyled";
import LineSVG from "assets/svg/line.svg";
import { Image } from "antd";
export default function SubTitle({ children, className }) {
  return (
    <SubtitleStyled className={className}>
      {children}
      <Image src={LineSVG} />
    </SubtitleStyled>
  );
}
