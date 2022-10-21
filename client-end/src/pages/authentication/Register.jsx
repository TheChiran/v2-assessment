import React, { useState } from "react";
import AuthWrapper from "./AuthWrapper";
import { Button, TextField } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CustomCard from "../../components/CustomCard";
import { onSignup } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { Spin, Alert as ErrorAlert } from "antd";

const RegisterSchema = Yup.object().shape({
  phone: Yup.string()
    .min(11, "Phone number must included 11 character")
    .max(11, "Phone number must not exceed 11 character")
    .required("Please provide phone number"),
  password: Yup.string()
    .min(8, "Please provided password at least 8 characters")
    .required("Please provided password"),
  passwordConfirm: Yup.string()
    .min(8, "Please provided password confirm at least 8 characters")
    .required("Please provided password confirm"),
});

const Register = (props) => {
  const navigate = useNavigate();

  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleSubmit = async (
    { phone, password, passwordConfirm },
    { setFieldError }
  ) => {
    // console.log(phone, password, passwordConfirm);
    if (password !== passwordConfirm) {
      setFieldError(
        "passwordConfirm",
        "Password confirm must match with password"
      );
    } else {
      const response = await props.onSignup({
        phone,
        password,
        passwordConfirm,
      });
      // console.log(response);

      if (response?.name === "AxiosError") {
        setAlertType("error");
        setAlertMessage(response?.response?.data?.message);
      }

      if (response.status === 201) {
        navigate("/dashboard");
      }
    }
  };

  return (
    <AuthWrapper>
      <StyledSection>
        <CustomCard>
          <CardContent>
            <Formik
              initialValues={{ phone: "", password: "", passwordConfirm: "" }}
              validationSchema={RegisterSchema}
              onSubmit={(values, errors) => {
                handleSubmit(values, errors);
              }}
            >
              {({ errors, touched, handleChange, handleSubmit }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className="header">
                      <p>Register</p>
                    </div>
                    <InputWrapper>
                      <TextField
                        label="Phone Number"
                        variant="outlined"
                        autoComplete={false}
                        onChange={handleChange("phone")}
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
                    <InputWrapper>
                      <TextField
                        label="Password Confirm"
                        variant="outlined"
                        onChange={handleChange("passwordConfirm")}
                        type="password"
                        fullWidth
                      />
                      {errors.passwordConfirm && touched.passwordConfirm ? (
                        <Alert severity="error">
                          <AlertTitle>Error</AlertTitle>
                          {errors.passwordConfirm}
                        </Alert>
                      ) : null}
                    </InputWrapper>
                    <div className="register-section">
                      <p>Already have an account?</p>
                      <a onClick={() => navigate("/auth/login")}>Login</a>
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
                      Register
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
        </CustomCard>
      </StyledSection>
    </AuthWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

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
      margin-top: 20px;

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

export default connect(mapStateToProps, { onSignup })(Register);
