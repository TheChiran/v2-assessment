import React from "react";
import styled from "@emotion/styled";
import { Card } from "antd";
import { Grid } from "@mui/material";

const CourseInfos = () => {
  return (
    <StyledCourses>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={6}>
          <Card className="gri-item">
            <h1>Current Semester: 1</h1>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card className="gri-item">
            <h1>Waiver percentage: 0</h1>
            <h1>Waiver amount: 0</h1>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card className="gri-item">
            <h1>Due amount for current Semester: 0</h1>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card className="gri-item">
            <h1>Total due amount: 0</h1>
          </Card>
        </Grid>
      </Grid>
    </StyledCourses>
  );
};

const StyledCourses = styled.div`
  .ant-card {
    background: #1890ff;
    border-radius: 8px;
  }
`;

export default CourseInfos;
