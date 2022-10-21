import React, { Fragment } from "react";
import { Card, Collapse } from "antd";
import { data } from "./../../data/demo-data.json";
import { styled } from "@mui/system";
import { connect } from "react-redux";

const { Panel } = Collapse;

const DueList = (props) => {
  let transactionsList = props?.student?.student?.dueSemesterList;

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Fragment>
      <h1>Due semester fee list</h1>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        {transactionsList.map((semester) => {
          return (
            <Panel header={`Semester: ${semester.level}`} key={semester._id}>
              <StyledParent>
                <Card>
                  <h1>Payable: BDT - {semester.payable}</h1>
                </Card>
                <Card>
                  <h1>Paid: BDT - {semester.paid_amount}</h1>
                </Card>
                <Card>
                  <h1>Due: BDT - {semester.due_amount}</h1>
                </Card>
                <Card>
                  <h1>Discount amount: BDT - {semester.discount_amount}</h1>
                </Card>
              </StyledParent>
            </Panel>
          );
        })}
      </Collapse>
    </Fragment>
  );
};

const StyledParent = styled("div")`
  display: flex;
  column-gap: 8px;
  row-gap: 8px;
  flex-wrap: wrap;

  .ant-card {
    width: calc(50% - 8px);

    @media (max-width: 501px) {
      width: 100%;
    }
  }
`;

function mapStateToProps(state) {
  return {
    student: state?.student,
  };
}
export default connect(mapStateToProps, {})(DueList);
