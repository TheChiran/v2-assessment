const { body, validationResult } = require("express-validator");
const httpStatus = require("http-status");
const AppError = require("../../utils/appError");

const processPaymentRules = () => {
  return [
    body("cgpa")
      .not()
      .isEmpty()
      .withMessage("Please provide your current cgpa")
      .custom((value) => {
        if (typeof value !== "number")
          throw new Error("Please provide cgpa in number format");

        return true;
      })
      .custom((value) => {
        if (value < 1 || value > 4) {
          throw new Error(
            "Please provide valid point, valid grades are between 1 and 4"
          );
        }

        return true;
      }),
    body("semester")
      .not()
      .isEmpty()
      .withMessage("Please provide your current semester")
      .custom((value) => {
        if (typeof value !== "number")
          throw new Error("Please provide semester in number format");

        return true;
      })
      .custom((value) => {
        if (value < 1 || value > 12) {
          throw new Error(
            "Please provide valid semester, valid grades are between 1 and 12"
          );
        }

        return true;
      }),
    body("amount")
      .not()
      .isEmpty()
      .withMessage("Please provide your amount to pay"),
  ];
};

module.exports = {
  processPaymentRules,
};
