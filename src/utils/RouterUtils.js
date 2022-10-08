import React from "react";
import { Navigate, Route } from "react-router-dom";
import AuthUtils from "./AuthUtils";

export const publicRoute = ({ component: Component, ...rest }) => {
  return <Component {...rest} />;
};

export const privateRoute = ({ component: Component }) => {
  const token = AuthUtils.getToken();
  if (!token) {
    return <Navigate replace to={"/sign-in"} />;
  } else {
    return Component;
  }
};

export function testRoute(props) {
  return <Route {...props}></Route>;
}

export function configPublicRoute(path, index, Component) {
  return {
    path: path,
    index: index,
    element: Component,
  };
}

export function configPrivateRoute(path, index, element, props) {
  return {
    path: path,
    index: index,
    element: (() => {
      return privateRoute({
        component: element,
      });
    })(),
  };
}
const RouterUtils = {};

export default RouterUtils;
