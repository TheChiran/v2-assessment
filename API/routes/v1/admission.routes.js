const express = require("express");
const authController = require("../../controllers/authController");
const admissionController = require("../../controllers/admissionController");
const semesterController = require("../../controllers/semesterController");
const studentController = require("../../controllers/studentController");

const {
  processAdmissionRules,
} = require("./../../validations/rules/admission.rules");
const { validateInputFields } = require("../../validations/validate");

const router = express.Router();

router.use(authController.protect);

router.post(
  "/confirm",
  processAdmissionRules(),
  validateInputFields,
  studentController.bindStudentIdToParam,
  admissionController.isAdmissionValid,
  semesterController.generateSemesters,
  admissionController.processAdmission
);

module.exports = router;
