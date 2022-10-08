import { Col, Row } from "antd";
import {
  ReactComponent as CurSusLogo,
  ReactComponent as CursusLogo,
} from "assets/svg/logo.svg";
import bgSignIn from "assets/svg/sign.svg";
import { ProvideAuth } from "hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
// css
import Wrapper from "./CommonPageStyled";

// Component
const CommonPage = () => {
  let navigate = useNavigate();
  return (
    <ProvideAuth>
      <Wrapper background={bgSignIn}>
        <div className="headerLogIn">
          <CurSusLogo
            width="135"
            style={{ cursor: "pointer" }}
            onClick={(e) => navigate("/")}
          />
        </div>
        <Row className="contentLogIn" justify="center">
          <Col span={22} style={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <Outlet />
          </Col>
        </Row>
        <div className="footerSignUp" style={{ margin: "16px 0" }}>
          <CursusLogo width="80" />
          <span>© 2022 . All Rights Reserved.</span>
        </div>
      </Wrapper>
    </ProvideAuth>
  );
};

export default CommonPage;
