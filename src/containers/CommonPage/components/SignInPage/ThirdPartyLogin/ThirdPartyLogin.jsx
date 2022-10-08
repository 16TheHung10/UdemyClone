import { FacebookFilled, GoogleCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import { appId, clientId } from "configuration";
import { useAuthContext } from "hooks/useAuth";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import LoginFacebookStyled from "./ThirdPartyLoginStyled";
const ThirdLogin = ({ setErrorMsg }) => {
  const { thirdPartySignIn } = useAuthContext();

  const responseFacebook = async (result) => {
    await thirdPartySignIn(result?.accessToken, "facebook");
  };

  const onSuccess = async (result) => {
    await thirdPartySignIn(result?.tokenId, "google");
  };

  const onFailure = (response) => {};

  return (
    <>
      <LoginFacebookStyled>
        <FacebookLogin
          id="buttonFB"
          appId={"840430540176218"}
          fields="name,email,picture"
          callback={responseFacebook}
          icon={<FacebookFilled className="mg-right" />}
          textButton={"Continue with Facebook"}
        />
        <GoogleLogin
          clientId={
            "588336887447-h306o0g8rsfr9o2421d749sgk6hu916k.apps.googleusercontent.com"
          }
          render={(renderProps) => (
            <Button
              className="socialBtn mt-10 mb-10"
              style={{ backgroundColor: "#34a853" }}
              block
              onClick={renderProps.onClick}
            >
              {<GoogleCircleFilled />}
              Continue with Google
            </Button>
          )}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy="single_host_origin"
        />
      </LoginFacebookStyled>
    </>
  );
};

export default ThirdLogin;
