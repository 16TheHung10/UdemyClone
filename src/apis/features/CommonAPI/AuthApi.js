import { instance, nonAuthenInstance } from "../../apis";

export const login = (data) => {
  return nonAuthenInstance.post("/api/Account/Login", data);
};

export const thirdLogin = (data) => {
  return nonAuthenInstance.post("/api/Account/ExternalLogin", data);
};

export const register = (data) => {
  return nonAuthenInstance.post("/api/Account/Register", data);
};

export const refreshToken = (data) => {
  return nonAuthenInstance.post("/api/Token/Refresh", data);
};

export const confirmEmail = (token, userId) => {
  return nonAuthenInstance.get("/api/Account/ConfirmEmail", {
    params: {
      userId: userId,
      token: token,
    },
  });
};

export const forgotPassword = (data) => {
  return nonAuthenInstance.post("/api/Account/ForgotPassword", data);
};

export const resetPassword = (data) => {
  return nonAuthenInstance.post("/api/Account/ResetPassword", data);
};

export const changePassword = (data) => {
  return instance.post("/api/Account/ChangePassword", data);
};
