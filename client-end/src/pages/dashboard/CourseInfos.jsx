import React from "react";
import styled from "@emotion/styled";
import { Card } from "antd";
import { Grid } from "@mui/material";
import { connect } from "react-redux";

const CourseInfos = (props) => {
  let student = props?.student?.student;

  return (
    <StyledCourses>
      <Card className="gri-item">
        <h1>Current Semester: {student?.current_semester}</h1>
      </Card>
      <Card className="gri-item">
        <h1>
          Current semester waiver percentage:{" "}
          {Number(
            student?.course_semesters[student.current_semester - 1]
              ?.discount_percentage * 100
          )}
          %
        </h1>
        <h1>
          Current semester waiver amount: BDT-
          {
            student?.course_semesters[student.current_semester - 1]
              ?.discount_amount
          }
        </h1>
      </Card>
      <Card className="gri-item">
        <h1>
          Due amount for current Semester: BDT-
          {student?.course_semesters[student.current_semester - 1]?.due_amount}
        </h1>
      </Card>
      <Card className="gri-item">
        <h1>Course total due amount: BDT-{student?.course_total_amount | 0}</h1>
      </Card>
      <Card className="gri-item">
        <h1>Course total amount: BDT-{student?.course_total_due_amount | 0}</h1>
      </Card>
    </StyledCourses>
  );
};

const StyledCourses = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;

  .ant-card {
    background: #1890ff;
    border-radius: 8px;
    width: calc(50% - 10px);

    h1 {
      font-size: 16px;
      color: #fff;
    }

    @media (max-width: 769px) {
      width: 100%;
    }
  }
`;

function mapStateToProps(state) {
  return {
    student: state?.student,
  };
}
export default connect(mapStateToProps, {})(CourseInfos);
