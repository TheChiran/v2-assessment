import React from "react";
import AuthWrapper from "./AuthWrapper";
import {
  CardHeader,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const LoginSchema = Yup.object().shape({
  phone: Yup.string()
    .min(11, "Phone number must included 11 character")
    .max(11, "Phone number must not exceed 11 character")
    .required("Please provide phone number"),
  password: Yup.string()
    .min(8, "Please provided password at least 8 characters")
    .required("Please provided password"),
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = ({ phone, password }, { setFieldError }) => {
    console.log(phone, password);
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
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      fullWidth
                    >
                      Login
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

export default Login;