import { Button, Layout } from "antd";
import { ReactComponent as CurSusLogo } from "assets/svg/ct_logo_white.svg";
import Wrapper from "containers/CommonPage/CommonPageStyled";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const ResponsePage = ({
  title,
  subTitle,
  description,
  children,
  textButton,
  link = "/",
}) => {
  let navigate = useNavigate();
  return (
    <Wrapper style={{ height: "100vh" }}>
      <Layout>
        <Header className="headerLogIn mt-10">
          <CurSusLogo
            width="135"
            style={{ cursor: "pointer" }}
            onClick={(e) => navigate("/")}
          />
        </Header>
        <Content className="contentLogIn">
          <div className="ant-result ant-result-info result-commonPage">
            <div className="ant-result-title">{title}</div>
            {subTitle !== undefined && (
              <div className="ant-result-subtitle">{subTitle}</div>
            )}
            {description !== undefined && (
              <pre
                style={{ whiteSpace: "pre-line" }}
                className="ant-result-description"
              >
                {description}
              </pre>
            )}
            {children ?? (
              <Button
                type="primary"
                className="btn-red mg-top"
                onClick={() => navigate(link)}
              >
                {textButton}
              </Button>
            )}
          </div>
        </Content>
        <Footer className="footerSignUp text-white">
          <CurSusLogo width="80" />
          <span>© 2022 . All Rights Reserved.</span>
        </Footer>
      </Layout>
    </Wrapper>
  );
};

export default ResponsePage;
