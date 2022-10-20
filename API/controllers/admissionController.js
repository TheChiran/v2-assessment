const Student = require("./../models/student.model");
const catchAsync = require("./../utils/catchAsync");
const calculateWaiver = require("./../utils/calculateWaiver");
const crudFactory = require("./../controllers/handleCRUDFactory");
const AppError = require("./../utils/appError");
const httpStatus = require("http-status");

exports.isAdmissionValid = (req, res, next) => {
  if (!req.user.is_first_login)
    return next(
      new AppError(
        "Admission form is accessible only on first login",
        httpStatus.BAD_REQUEST
      )
    );

  next();
};

exports.processAdmission = crudFactory.updateOne(Student);
