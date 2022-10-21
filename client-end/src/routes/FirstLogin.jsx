import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const FirstLogin = (props) => {
  return props.student?.is_first_login === true ? (
    props.children
  ) : (
    <Navigate to={"/dashboard/course-infos"} />
  );
};

function mapStateToProps(state) {
  return {
    student: state?.student?.student,
  };
}
export default connect(mapStateToProps, {})(FirstLogin);
