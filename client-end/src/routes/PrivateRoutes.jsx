import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  return props?.token ? props.children : <Navigate to={"/auth/login"} />;
};

function mapStateToProps(state) {
  return {
    token: state?.auth?.token,
  };
}

export default connect(mapStateToProps, {})(PrivateRoute);
