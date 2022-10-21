import React, { Fragment } from "react";
import { Card, Collapse } from "antd";
import { data } from "./../../data/demo-data.json";
import { styled } from "@mui/system";
import { connect } from "react-redux";

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const Transactions = (props) => {
  let transactionsList = props?.student?.student?.course_semesters;

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Fragment>
      <h1>Transactions history</h1>
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

  .ant-card {
    width: calc(33.33% - 8px);
  }
`;

function mapStateToProps(state) {
  return {
    student: state?.student,
  };
}
export default connect(mapStateToProps, {})(Transactions);
