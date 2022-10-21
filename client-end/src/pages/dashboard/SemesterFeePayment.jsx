import React, { useState } from "react";
import { Input, Button } from "antd";
import styled from "@emotion/styled";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "antd";
import { connect } from "react-redux";
import { onPayment } from "../../redux/actions/paymentActions";
import { Navigate, useNavigate } from "react-router-dom";

const FormSchema = Yup.object().shape({
  cgpa: Yup.number()
    .required("grade point is required")
    .min(1, "Grade point must be above 1")
    .max(5, "Grade point must not exceed 5"),
  semester: Yup.number()
    .required("semester is required")
    .min(1, "semester must be above or equal 1")
    .max(12, "semester must not exceed 12"),
  amount: Yup.number()
    .required("Please provide payment amount")
    .min(1, "Number must be above 1"),
});

const SemesterFeePayment = (props) => {
  const navigate = useNavigate();
  let student = props?.student?.student;
  console.log("student", student);

  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleSubmit = async (
    { cgpa, amount, semester },
    { resetForm, setFieldError }
  ) => {
    const response = await props.onPayment(
      {
        cgpa: Number(cgpa),
        amount: Number(amount),
        semester: Number(semester),
      },
      props.token
    );
    console.log(response);
    if (response.status === 200) {
      resetForm();
      setAlertType("success");
      setAlertMessage(response.message);

      // check if semester is 12 and has due semester fees
      if (student?.current_semester === 12) {
        console.log("student", student);

        console.log("due semester", response?.data?.dueSemesterList);
        if (response?.data?.dueSemesterList?.length > 1) {
          navigate("/dashboard/due-list");
        } else {
          navigate("/dashboard/complete");
        }
      } else {
        setTimeout(() => {
          return <Navigate to="/dashboard" />;
        }, 500);
      }
    }
  };

  return (
    <StyledSection>
      <Formik
        initialValues={{
          cgpa: null,
          amount: null,
          semester: student?.current_semester,
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
                  <label>Semester (1-12)</label>
                  <Input
                    placeholder="semester "
                    value={values.semester}
                    onChange={handleChange("semester")}
                  />
                  {errors.semester && touched.semester ? (
                    <Alert message={errors.semester} type="error" />
                  ) : null}
                </InputWrapper>
                <InputWrapper className="input-wrapper">
                  <label>Semester CGPA</label>
                  <Input
                    placeholder="CGPA"
                    value={values.cgpa}
                    onChange={handleChange("cgpa")}
                    type="number"
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
                    type="number"
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
      <br />
      {alertType !== null && (
        <Alert message={alertMessage} type={alertType} closable />
      )}
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

function mapStateToProps(state) {
  return {
    student: state?.student,
    token: state?.auth?.token,
    loading: state?.auth?.loading,
  };
}
export default connect(mapStateToProps, { onPayment })(SemesterFeePayment);
