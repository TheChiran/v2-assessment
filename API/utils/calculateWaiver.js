const { getPerSemesterAmount } = require("./getCourseAmounts");

module.exports = ({
  ssc_cgpa = 0,
  hsc_cgpa = 0,
  current_cgpa,
  department,
  admission_form_submission = false,
}) => {
  let [percentage, amount] = [0, 0];

  if (admission_form_submission) {
    if (ssc_cgpa === 5 && hsc_cgpa === 5) {
      percentage = 0.75;
      amount = Number(percentage * getPerSemesterAmount(department)).toFixed(2);
    }
  } else {
    if (ssc_cgpa === 5 && hsc_cgpa === 5 && current_cgpa >= 3.5) {
      percentage = 0.75;
      amount = Number(percentage * getPerSemesterAmount(department)).toFixed(2);
    } else if (current_cgpa >= 3.8) {
      percentage = 0.5;
      amount = Number(percentage * getPerSemesterAmount(department)).toFixed(2);
    }
  }

  return {
    percentage,
    amount,
  };
};
