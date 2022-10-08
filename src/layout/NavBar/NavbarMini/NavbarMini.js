import { Button, Image, Row, Col } from "antd";
//Assets
import logo from "assets/svg/logo1.svg";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { routesVisibleNavbarMini } from "routes";
import AuthUtils from "utils/AuthUtils";
//Component
import NavBarLoginAvatar from "../LoginDropdown/NavBarLoginAvatar";
//Styled
import NavbarMiniWrapper from "./NavbarMiniStyled";

export const NavBarMiniRoutes = (props) => {
  return (
    <Routes>
      {routesVisibleNavbarMini.map((item, index) => (
        <Route
          key={`navbarMiniRouteItem${index}`}
          path={item}
          element={<NavbarMini {...props} />}
        />
      ))}
      <Route path="*" element={null} />
    </Routes>
  );
};
const NavbarMini = () => {
  const navigate = useNavigate();
  return (
    <NavbarMiniWrapper>
      <Row justify="center" style={{ height: "100%" }}>
        <Col span={22} sm={18} style={{ height: "100%" }}>
          <Row align="middle" style={{ height: "100%" }} >
            <Col span={10} sm={8} className="d-flex">
              <div className="navbar-left">
                <Button onClick={() => navigate("/")} className="btn-back-to-cursus">
                  Back To Cursus
                </Button>
              </div>
            </Col>
            <Col span={10} sm={8} className="d-flex justify-content-center">
              <Link to={"/"}>
                <Image src={logo} preview={false} className="brand-logo" />
              </Link>
            </Col>
            <Col span={4} sm={8} className="d-flex justify-content-end">
              {
                AuthUtils.getToken() !== null ? (
                  <div style={{ cursor: "pointer" }} className="navbar-right d-flex">
                    <NavBarLoginAvatar />
                  </div>
                ) : (
                  <div className="navbar-right">
                    <Button className="btn-red mg-right">
                      <Link to="/sign-in">Login</Link>
                    </Button>
                    <Button className="btn-secondary btn-outlined">
                      <Link to="/sign-up">Register</Link>
                    </Button>
                  </div>
                )
              }
            </Col>
          </Row >
        </Col>
      </Row>
    </NavbarMiniWrapper >
  );
};

export default NavbarMini;
