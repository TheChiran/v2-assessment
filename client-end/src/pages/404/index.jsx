import { Button, Result } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../App";

const PageNotFound = () => {
  const appContext = useContext(AppContext);

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you'r trying to visit does not exist."
      extra={
        <Button type="primary" onClick={() => appContext.navigateURL("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default PageNotFound;
