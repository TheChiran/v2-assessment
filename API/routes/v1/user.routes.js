const express = require('express');
const authController = require('../../controllers/authController');
const videoRouter = require('./../../routes/v1/video.routes');
const {
  userRegisterValidationRules,
} = require('./../../validations/rules/user.rules');
const { validateInputFields } = require('./../../validations/validate');

const router = express.Router();

router.post(
  '/signup',
  userRegisterValidationRules(),
  validateInputFields,
  authController.signup
);

router.post('/login', authController.login);

module.exports = router;
