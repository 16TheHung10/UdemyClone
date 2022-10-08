import axios from "axios";
import configuration from "configuration";
import AuthUtils from "utils/AuthUtils";
import TokenUtils from "utils/TokenUtils";

export const nonAuthenInstance = axios.create({
  baseURL: configuration.API_URL,
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const instance = axios.create({
  baseURL: configuration.API_URL,
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

const responseInterceptor = (response) => {
  const { status } = response;
  if (status === 401) {
    AuthUtils.logout();
  }
  return response;
};

const responseErrorHandling = (error) => {
  return Promise.resolve(error);
};

const requestInterceptors = async (config) => {
  const token = await TokenUtils.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token.token}`;
  }
  return config;
};

instance.interceptors.request.use(requestInterceptors, responseErrorHandling);

instance.interceptors.response.use(responseInterceptor);
