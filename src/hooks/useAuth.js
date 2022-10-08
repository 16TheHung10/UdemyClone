import {
  login,
  register as registerAPI,
  thirdLogin,
  forgotPassword as forgotPasswordAPI,
  resetPassword as resetPasswordAPI,
} from "apis/features/CommonAPI/AuthApi";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "redux/features/auth/AuthSelector";
import { AuthAction } from "redux/features/auth/AuthSlices";
import { useLocation } from "react-router-dom";
import AuthUtils from "utils/AuthUtils";

const AuthContext = createContext();

export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const userProfile = useSelector(selectUser);
  const [errorsMsg, setErrorsMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const signIn = async (user) => {
    try {
      const response = await login(user);

      const { isSuccess, message, data } = response?.data;

      if (!isSuccess) {
        setErrorsMsg(message);
      } else {
        setIsLoading(true);
        AuthUtils.setToken(data?.token);
        dispatch(AuthAction.updateUser(data?.user));
        //setPreviousLogInUser(data?.user);

        navigate("/");
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setErrorsMsg(error?.response?.data.message);
      } else {
        setErrorsMsg(error?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const thirdPartySignIn = async (token, provider) => {
    setIsLoading(true);
    try {
      const response = await thirdLogin({
        provider,
        token,
      });

      const { isSuccess, message, data } = response?.data;

      if (!isSuccess) {
        setErrorsMsg(message);
      } else {
        AuthUtils.setToken(data?.token);
        dispatch(AuthAction.updateUser(data?.user));
        //setPreviousLogInUser(data?.user);
        navigate("/");
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setErrorsMsg(error?.response?.data?.message);
      } else {
        setErrorsMsg(error?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (infoRegister, showModal) => {
    try {
      const response = await registerAPI(infoRegister);

      const { isSuccess, message } = response?.data;

      if (!isSuccess) {
        setErrorsMsg(message);
      } else {
        showModal();
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setErrorsMsg(error?.response?.data?.message);
        return;
      }
      setErrorsMsg(error?.message);
    }
  };

  const forgotPassword = async (email, showModal) => {
    try {
      const response = await forgotPasswordAPI({ email });

      const { isSuccess, message } = response?.data;

      if (!isSuccess) {
        setErrorsMsg(message);
      } else {
        showModal();
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setErrorsMsg(error?.response?.data?.message);
      } else {
        setErrorsMsg(error?.message);
      }
    }
  };

  const logout = () => {
    dispatch(AuthAction.logout());
    AuthUtils.logout();
  };

  const resetPassword = async (resetPassValues, showModal) => {
    try {
      const response = await resetPasswordAPI(resetPassValues);

      const { isSuccess, message } = response?.data;

      if (!isSuccess) {
        setErrorsMsg(message);
      } else {
        showModal();
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setErrorsMsg(error?.response?.data?.message);
      } else {
        console.log(error);
        setErrorsMsg(error?.message);
      }
    }
  };

  useEffect(() => {
    setErrorsMsg("");
  }, [location]);

  return {
    logout,
    errorsMsg,
    isLoading,
    signIn,
    thirdPartySignIn,
    register,
    forgotPassword,
    resetPassword,
  };
};

export const ProvideAuth = ({ children }) => {
  const auth = useAuth();
  return <AuthProvider value={auth}>{children}</AuthProvider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuth;
