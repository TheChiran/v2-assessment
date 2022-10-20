const express = require("express");
const authController = require("../../controllers/authController");
const semesterController = require("../../controllers/semesterController");

const router = express.Router();

router.use(authController.protect);

router.get("/", semesterController.getAll);
router.get("/due-list", semesterController.getDueList);

module.exports = router;
