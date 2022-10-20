const Student = require("./../models/student.model");
const catchAsync = require("./../utils/catchAsync");
const calculateWaiver = require("./../utils/calculateWaiver");
const crudFactory = require("./../controllers/handleCRUDFactory");
const AppError = require("./../utils/appError");
const httpStatus = require("http-status");

exports.isAdmissionValid = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (student.is_first_login)
    return new AppError(
      "Admission form is accessible only on first login",
      httpStatus.BAD_REQUEST
    );
  next();
});

exports.processAdmission = crudFactory.updateOne(Student);
