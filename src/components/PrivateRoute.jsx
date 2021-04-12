import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // console.count('Private Route rendered')
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo || !userInfo.token) {
    toast.error("Please log in before continuing");
  }

  return userInfo && userInfo.token ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
