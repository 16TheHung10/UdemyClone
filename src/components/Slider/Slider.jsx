import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import SlickSlider from "react-slick";
import CarouselWrapper from "./SliderStyled";

function PrevArrow(props) {
  const { style, className, onClick } = props;
  return (
    <Button
      type="text"
      style={style}
      className={className}
      icon={<LeftOutlined />}
      onClick={onClick}
    />
  );
}

function NextArrow(props) {
  const { style, className, onClick } = props;
  return (
    <Button
      type="text"
      style={style}
      className={className}
      icon={<RightOutlined />}
      onClick={onClick}
    />
  );
}

function Slider(props) {
  const { settings, hover } = props;
  const { gap } = settings;

  const customizSettings = {
    ...settings,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <CarouselWrapper hover={hover ? true : false} gap={gap}>
      <SlickSlider {...customizSettings}>{props.children}</SlickSlider>
    </CarouselWrapper>
  );
}

export default Slider;
