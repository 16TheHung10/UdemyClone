import { refreshToken } from "apis/features/CommonAPI/AuthApi";
import AuthUtils from "./AuthUtils";

let refreshing = null;
const getNewToken = async () => {
  try {
    const response = await refreshToken({
      accessToken: AuthUtils.getToken().token,
      refreshToken: AuthUtils.getRefreshToken().token,
    });

    if (response.status === 200) {
      AuthUtils.setToken(response.data.data, false);
    }
  } catch (error) {
    console.log(error);
  }
};

const getToken = async () => {
  const currentToken = AuthUtils.getToken();
  if (!currentToken) {
    return null;
  }

  const tokenExpiry = new Date(currentToken.expired);
  const currentTime = new Date();
  if (tokenExpiry > currentTime) {
    //access token valid
    return currentToken;
  } else {
    //access token expired
    const refreshTokenExpiry = new Date(AuthUtils.getRefreshToken().expired);
    if (refreshTokenExpiry > currentTime) {
      //refresh token valid
      console.warn("Refreshing token");
      if (refreshing === null) {
        refreshing = true;
        await getNewToken();
        refreshing = null;
        return AuthUtils.getToken();
      }
    } else {
      //expired refreshToken
      AuthUtils.logout();
    }
  }
  return null;
};

const TokenUtils = {
  getNewToken,
  getToken,
};

export default TokenUtils;
