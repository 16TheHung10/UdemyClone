import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import { ButtonStyled } from "components/Button/ButtonStyled";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header({
  toggleSideBar,
  handleToggleSideBar,
  handleNextPreviousVideo,
  disabledPre,
  disabledNext,
}) {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <Col span={24}>
      <Row className="download-header">
        <Col span={6}>
          {" "}
          <Row className="sidebar-button">
            <Col span={12} xl={24}>
              {" "}
              <ButtonStyled
                radius="0"
                className="goback"
                onClick={navigateToHome}
              >
                <RollbackOutlined />
              </ButtonStyled>
            </Col>
            <Col span={12} xl={0}>
              <ButtonStyled
                radius="0"
                className="menu"
                onClick={handleToggleSideBar}
              >
                {toggleSideBar ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              </ButtonStyled>
            </Col>
          </Row>
        </Col>
        <Col span={18}>
          <ButtonStyled
            bghover="white"
            colorhover="black"
            className="download-header-btn"
            radius="0"
            disabled={disabledPre}
            onClick={() => handleNextPreviousVideo("previous")}
          >
            Previous
          </ButtonStyled>
          <ButtonStyled
            bghover="white"
            colorhover="black"
            className="download-header-btn"
            radius="0"
            disabled={disabledNext}
            onClick={() => handleNextPreviousVideo("next")}
          >
            Next
          </ButtonStyled>
        </Col>
      </Row>
    </Col>
  );
}
