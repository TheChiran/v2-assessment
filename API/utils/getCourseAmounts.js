const courseList = {
  SWE: {
    credit: 175,
    cost_per_credit: 5000,
  },
  CSE: {
    credit: 190,
    cost_per_credit: 5000,
  },
  EEE: {
    credit: 200,
    cost_per_credit: 5000,
  },
};

const getTotalAmount = (department) =>
  courseList[department].credit * courseList[department].cost_per_credit;

const getPerSemesterAmount = (department) => getTotalAmount(department) / 12;

module.exports = {
  getTotalAmount,
  getPerSemesterAmount,
};
