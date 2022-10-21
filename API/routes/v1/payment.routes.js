const express = require("express");
const authController = require("../../controllers/authController");
const paymentController = require("../../controllers/paymentController");
const {
  processPaymentRules,
} = require("./../../validations/rules/payment.rules");
const { validateInputFields } = require("../../validations/validate");

const router = express.Router();

router.use(authController.protect);

router.post(
  "/pay-semester-fee",
  processPaymentRules(),
  validateInputFields,
  paymentController.semesterFeePayment
);

module.exports = router;
