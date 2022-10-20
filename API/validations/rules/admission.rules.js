const { body, validationResult } = require("express-validator");
const httpStatus = require("http-status");
const AppError = require("../../utils/appError");

const DEPARTMENTS = {
  SWE: "SWE",
  CSE: "CSE",
  EEE: "EEE",
};

const processAdmissionRules = () => {
  return [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Please provide your name")
      .isLength(2)
      .withMessage("Phone number must be of at least 11 characters"),

    body("department")
      .not()
      .isEmpty()
      .withMessage("Please provide department name")
      .custom((value) => {
        if (!DEPARTMENTS[value]) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            `Please provide valid department, valid departments: ${Object.keys(
              DEPARTMENTS
            )}`
          );
        }

        return true;
      }),
    body("ssc_grade")
      .not()
      .isEmpty()
      .withMessage("Please provide your ssc grade point")
      .custom((value) => {
        if (value < 1 && value > 5) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            `Please provide valid grade point, valid grades are between 1 and 5`
          );
        }

        return true;
      }),
    body("hsc_grade")
      .not()
      .isEmpty()
      .withMessage("Please provide your hsc grade point")
      .custom((value) => {
        if (value < 1 && value > 5) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            `Please provide valid grade point, valid grades are between 1 and 5`
          );
        }

        return true;
      }),
  ];
};

module.exports = {
  processAdmissionRules,
};
