import React, { Fragment, useState } from "react";
import AuthWrapper from "./AuthWrapper";
import { connect } from "react-redux";
import { Button, TextField } from "@mui/material";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Alert as ErrorAlert } from "antd";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { onLogin } from "../../redux/actions/authActions";

const LoginSchema = Yup.object().shape({
  phone: Yup.string()
    .min(11, "Phone number must included 11 character")
    .max(11, "Phone number must not exceed 11 character")
    .required("Please provide phone number"),
  password: Yup.string()
    .min(8, "Please provided password at least 8 characters")
    .required("Please provided password"),
});

const Login = (props) => {
  const navigate = useNavigate();

  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleSubmit = async ({ phone, password }, { setFieldError }) => {
    const response = await props.onLogin({ phone, password });

    if (response?.name === "AxiosError") {
      setAlertType("error");
      setAlertMessage(response?.response?.data?.message);
    }

    if (response.status === 200) {
      navigate("/dashboard");
    }
  };

  return (
    <AuthWrapper>
      <StyledSection>
        <Card className="custom-card">
          <CardContent>
            <Formik
              initialValues={{ phone: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={(values, errors) => {
                handleSubmit(values, errors);
              }}
            >
              {({ errors, touched, handleChange, handleSubmit }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="header">
                      <LockOpenOutlinedIcon />
                      <p>Login</p>
                    </div>
                    <InputWrapper>
                      <TextField
                        label="Phone Number"
                        variant="outlined"
                        onChange={handleChange("phone")}
                        autoComplete={false}
                        fullWidth
                      />
                      {errors.phone && touched.phone ? (
                        <Alert severity="error">
                          <AlertTitle>Error</AlertTitle>
                          {errors.phone}
                        </Alert>
                      ) : null}
                    </InputWrapper>
                    <InputWrapper>
                      <TextField
                        label="Password"
                        variant="outlined"
                        onChange={handleChange("password")}
                        type="password"
                        fullWidth
                      />
                      {errors.password && touched.password ? (
                        <Alert severity="error">
                          <AlertTitle>Error</AlertTitle>
                          {errors.password}
                        </Alert>
                      ) : null}
                    </InputWrapper>
                    <div className="register-section">
                      <p>Don't have account?</p>
                      <a onClick={() => navigate("/auth/register")}>Register</a>
                    </div>
                    {alertType !== null && (
                      <Fragment>
                        <br />
                        <ErrorAlert
                          message={`${alertMessage}`}
                          type={`${alertType}`}
                          closable
                        />
                        <br />
                      </Fragment>
                    )}

                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      fullWidth
                    >
                      Login
                      {props.loading === true && (
                        <LoadingOutlined
                          style={{
                            fontSize: 24,
                          }}
                          spin
                        />
                      )}
                    </Button>
                  </form>
                );
              }}
            </Formik>
          </CardContent>
        </Card>
      </StyledSection>
    </AuthWrapper>
  );
};

const InputWrapper = styled.div``;

const StyledSection = styled.div`
  padding-top: 50px;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    row-gap: 8px;

    .header {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      align-items: center;

      p {
        text-align: center;
        margin: 0;
        padding: 0;
      }
    }

    .register-section {
      display: flex;
      justify-content: space-between;

      p {
        margin: 0;
        padding: 0;
      }
    }
  }
`;

function mapStateToProps(state) {
  return {
    token: state.auth?.token,
    loading: state.auth?.loading,
  };
}

export default connect(mapStateToProps, { onLogin })(Login);
