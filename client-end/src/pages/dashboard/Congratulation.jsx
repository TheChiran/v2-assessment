import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Congratulation = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="success"
      title="Congratulations! You've completed 12th semester"
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={() => navigate("/dashboard/course-infos")}
        >
          Go To Course Info
        </Button>,
      ]}
    />
  );
};
export default Congratulation;
