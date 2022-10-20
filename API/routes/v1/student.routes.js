const express = require("express");
const authController = require("../../controllers/authController");
const {
  studentLoginValidationRules,
  studentRegisterValidationRules,
} = require("../../validations/rules/student.rules");
const { validateInputFields } = require("../../validations/validate");

const router = express.Router();

router.post(
  "/register",
  studentRegisterValidationRules(),
  validateInputFields,
  authController.signup
);

router.post(
  "/login",
  studentLoginValidationRules(),
  validateInputFields,
  authController.login
);

module.exports = router;
