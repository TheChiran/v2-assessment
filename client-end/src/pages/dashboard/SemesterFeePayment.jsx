import React from "react";
import { Input, Button } from "antd";
import styled from "@emotion/styled";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "antd";

const FormSchema = Yup.object().shape({
  cgpa: Yup.number()
    .required("grade point is required")
    .min(1, "Grade point must be above 1")
    .max(5, "Grade point must not exceed 5"),
  amount: Yup.number()
    .required("Please provide payment amount")
    .min(1, "Number must be above 1"),
});

const SemesterFeePayment = () => {
  const handleSubmit = ({ cgpa, amount }, { setFieldError }) => {
    console.log("handle submit called");
  };

  return (
    <StyledSection>
      <Formik
        initialValues={{
          cgpa: null,
          amount: "",
        }}
        validationSchema={FormSchema}
        onSubmit={(values, errors) => {
          handleSubmit(values, errors);
        }}
      >
        {({ errors, touched, handleChange, handleSubmit, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <InputGroup>
                <InputWrapper className="input-wrapper">
                  <label>Semester CGPA</label>
                  <Input
                    placeholder="CGPA"
                    value={values.cgpa}
                    onChange={handleChange("cgpa")}
                  />
                  {errors.cgpa && touched.cgpa ? (
                    <Alert message={errors.cgpa} type="error" />
                  ) : null}
                </InputWrapper>
                <InputWrapper className="input-wrapper">
                  <label>Payment Amount</label>
                  <Input
                    placeholder="payment amount"
                    value={values.amount}
                    onChange={handleChange("amount")}
                  />
                  {errors.amount && touched.amount ? (
                    <Alert
                      message="Error"
                      description={errors.amount}
                      type="error"
                    />
                  ) : null}
                </InputWrapper>
              </InputGroup>
              <Button block="true" type="primary" htmlType="submit">
                Pay
              </Button>
            </form>
          );
        }}
      </Formik>
    </StyledSection>
  );
};

const InputGroup = styled.div`
  display: flex;
  column-gap: 10px;

  .input-wrapper {
    width: calc(50% - 10px);

    .ant-select {
      width: 100% !important;
    }
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const StyledSection = styled.div`
  padding-top: 50px;
  height: 100%;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    row-gap: 8px;

    button {
      margin-top: 16px;
    }
  }
`;

export default SemesterFeePayment;
