import React from "react";
import { Input, Select, Button } from "antd";
import CardContent from "@mui/material/CardContent";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "antd";
import { useContext } from "react";
import { AppContext } from "../../App";
import { connect } from "react-redux";
import { onAdmissionCompletion } from "../../redux/actions/admissionActions";
const { Option } = Select;

const AdmissionFormSchema = Yup.object().shape({
  phone: Yup.string()
    .min(11, "Phone number must included 11 character")
    .max(11, "Phone number must not exceed 11 character")
    .required("Please provide phone number"),
  name: Yup.string().required("Please provide your name"),
  department: Yup.string().required("Please provided department name"),
  ssc_grade: Yup.number()
    .required("Please ssc grade point")
    .min(1, "Number must be above 1")
    .max(5, "Grade point must not exceed 5"),
  hsc_grade: Yup.number()
    .required("Please provided hsc grade point")
    .min(1, "Number must be above 1")
    .max(5, "Grade point must not exceed 5"),
});

const AdmissionForm = (props) => {
  const appContext = useContext(AppContext);

  const handleSubmit = async (
    { phone, name, department, ssc_grade, hsc_grade },
    { setFieldError }
  ) => {
    console.log("handle submit called");
    const response = await props.onAdmissionCompletion(
      { phone, name, department, ssc_grade, hsc_grade },
      props.token
    );

    if (response.status === 200) {
      alert("Admission completed");
      appContext.navigateURL("/dashboard/course-infos");
    }
  };

  return (
    <StyledSection>
      <Formik
        initialValues={{
          phone: props?.student?.phone,
          name: "",
          department: "SWE",
          hsc_grade: null,
          ssc_grade: null,
        }}
        validationSchema={AdmissionFormSchema}
        onSubmit={(values, errors) => {
          handleSubmit(values, errors);
        }}
      >
        {({ errors, touched, handleChange, handleSubmit, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <InputGroup>
                <InputWrapper className="input-wrapper">
                  <label>Full Name</label>
                  <Input
                    placeholder="Full Name"
                    value={values.name}
                    onChange={handleChange("name")}
                  />
                  {errors.name && touched.name ? (
                    <Alert message={errors.name} type="error" />
                  ) : null}
                </InputWrapper>
                <InputWrapper className="input-wrapper">
                  <label>Phone</label>
                  <Input
                    placeholder="phone"
                    value={values.phone}
                    onChange={handleChange("phone")}
                  />
                  {errors.phone && touched.phone ? (
                    <Alert
                      message="Error"
                      description={errors.phone}
                      type="error"
                    />
                  ) : null}
                </InputWrapper>
                <InputWrapper className="input-wrapper">
                  <label>Department</label>
                  <Select
                    defaultValue="SWE"
                    style={{ width: 120 }}
                    value={values.department}
                    onChange={handleChange("department")}
                    block="true"
                  >
                    <Option value="SWE">SWE</Option>
                    <Option value="CSE">CSE</Option>
                    <Option value="EEE">EEE</Option>
                  </Select>
                  {errors.department && touched.department ? (
                    <Alert
                      message="Error"
                      description={errors.department}
                      type="error"
                    />
                  ) : null}
                </InputWrapper>
              </InputGroup>
              <InputGroup>
                <InputWrapper className="input-wrapper">
                  <label>SSC Grade Point</label>
                  <Input
                    placeholder="exm: 4.25"
                    type="number"
                    value={values.ssc_grade}
                    onChange={handleChange("ssc_grade")}
                  />
                  {errors.ssc_grade && touched.ssc_grade ? (
                    <Alert
                      message="Error"
                      description={errors.ssc_grade}
                      type="error"
                    />
                  ) : null}
                </InputWrapper>
                <InputWrapper className="input-wrapper">
                  <label>HSC Grade point</label>
                  <Input
                    placeholder="ex: 4.80"
                    value={values.hsc_grade}
                    onChange={handleChange("hsc_grade")}
                    type="number"
                  />
                  {errors.hsc_grade && touched.hsc_grade ? (
                    <Alert
                      message="Error"
                      description={errors.hsc_grade}
                      type="error"
                    />
                  ) : null}
                </InputWrapper>
              </InputGroup>

              <Button block="true" type="primary" htmlType="submit">
                Confirm Admission
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
    width: calc(33.33% - 10px);

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
    student: state?.student?.student,
    token: state?.auth?.token,
  };
}
export default connect(mapStateToProps, { onAdmissionCompletion })(
  AdmissionForm
);
