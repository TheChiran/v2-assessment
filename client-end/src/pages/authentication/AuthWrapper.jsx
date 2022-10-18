import React from "react";
import { Grid, styled } from "@mui/material";

const AuthWrapper = ({ children }) => {
  // return <div className="auth-wrapper container">{children}</div>;

  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled("div")({
  maxWidth: "90%",
  margin: "0 auto",
  height: "100%",
});

export default AuthWrapper;
