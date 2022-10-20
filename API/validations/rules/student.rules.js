const { body, validationResult } = require("express-validator");
const httpStatus = require("http-status");
const AppError = require("../../utils/appError");

const studentRegisterValidationRules = () => {
  return [
    body("phone")
      .not()
      .isEmpty()
      .withMessage("Please provide a phone number")
      .isLength(11)
      .withMessage("Phone number must be of at least 11 characters"),

    body("password")
      .not()
      .isEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be of minimum 8 characters"),

    body("passwordConfirm")
      .not()
      .isEmpty()
      .withMessage("Password confirm is required")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            "Password confirmation does not match password"
          );
        }

        return true;
      }),
  ];
};

const studentLoginValidationRules = () => {
  return [
    body("phone")
      .not()
      .isEmpty()
      .withMessage("Please provide a phone number")
      .isLength(11)
      .withMessage("Phone number must be of at least 11 characters"),

    body("password")
      .not()
      .isEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be of minimum 8 characters"),
  ];
};

module.exports = {
  studentRegisterValidationRules,
  studentLoginValidationRules,
};
