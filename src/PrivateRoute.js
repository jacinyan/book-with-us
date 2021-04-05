import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import React from "react";

const PrivateRoute = ({ ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return userInfo && userInfo.token ? (
    <Route {...rest} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
