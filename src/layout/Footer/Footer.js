import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  TwitterSquareFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import { Avatar, Col, Row, Space, Typography } from "antd";
import { getAllAudioLanguage } from "apis/features/AudioLanguage/AudioLanguageAPI";
import cursusLogo from "assets/svg/footer/black-and-white-logo.svg";
import { getItem } from "layout/LayoutUtils";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
//Import Image
import { routesVisibleFooter } from "routes";
import FooterWrapper from "./FooterStyled";

export const FooterRoutes = (props) => {
  return (
    <Routes>
      {routesVisibleFooter.map((item, index) => (
        <Route
          key={`footerRouteItem${index}`}
          path={item}
          element={<Footer {...props} />}
        />
      ))}
      <Route path="*" element={null} />
    </Routes>
  );
};

const Footer = () => {
  const [language, setLanguage] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllAudioLanguage();

        const { data } = response?.data;

        setLanguage(
          data.map((item) => getItem(item.name, `language${item.id}`))
        );
      } catch (error) {}
    })();
  }, []);

  return (
    <FooterWrapper className="footer d-flex justify-content-center">
      {/* <Row className="d-flex justify-content-center"> */}
      {/* <Row className="d-flex flex-wrap width-100">
          <Col xs={12} md={6}>
            <Link to={`/`} className="first-row ant-row">
              About
            </Link>
            <Link className="ant-row" to={`/`}>
              Blog
            </Link>
            <Link className="ant-row" to={`/`}>
              Careers
            </Link>
            <Link className="ant-row" to={`/`}>
              Press
            </Link>
          </Col>
          <Col xs={12} md={6}>
            <Link to={`/`} className="first-row ant-row">
              Help
            </Link>
            <Link className="ant-row" to={`/`}>
              Advertise
            </Link>
            <Link className="ant-row" to={`/`}>
              Developers
            </Link>
            <Link className="ant-row" to={`/`}>
              Contact Us
            </Link>
          </Col>
          <Col xs={12} md={6}>
            <Link to={`/`} className="first-row ant-row">
              Copyright Policy
            </Link>
            <Link className="ant-row" to={`/`}>
              Terms
            </Link>
            <Link className="ant-row" to={`/`}>
              Privacy Policy
            </Link>
            <Link className="ant-row" to={`/`}>
              Site Map
            </Link>
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-end">
            <div className="height-100 d-flex justify-content-start col-action flex-direction-column align-item-end">
              <Button className="btn-red mg-bot">Teach on Cursus</Button>
              <Dropdown
                overlay={<Menu items={language.length !== 0 && language} />}
                placement="top"
                arrow={{ pointAtCenter: true }}
              >
                <Button className="btn-secondary btn-outlined width-100">
                  <GlobalOutlined />
                  Language
                  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </Col>
        </Row> */}
      <Row className="d-flex justify-content-between width-100 mg-y">
        <Col xs={24} md={12} className="d-flex align-item-center">
          <Space>
            <Avatar size={32} src={cursusLogo} />
            <Typography.Text className="copyright">
              © 2022 <strong>Cursus</strong>. All Rights Reserved.
            </Typography.Text>
          </Space>
        </Col>
        <Col
          xs={24}
          md={12}
          className="d-flex justify-content-end align-item-center"
        >
          <Space size={30}>
            <a href="/" className="social-icon">
              <FacebookFilled />
            </a>

            <a href="/" className="social-icon">
              <TwitterSquareFilled />
            </a>

            <a href="/" className="social-icon">
              <LinkedinFilled />
            </a>

            <a href="/" className="social-icon">
              <InstagramFilled />
            </a>

            <a href="/" className="social-icon">
              <YoutubeFilled />
            </a>
          </Space>
        </Col>
      </Row>
      {/* </Row> */}
    </FooterWrapper>
  );
};
export default Footer;
