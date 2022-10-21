const catchAsync = require("../utils/catchAsync");
const Student = require("./../models/student.model");
const calculateWaiver = require("./../utils/calculateWaiver");
const httpStatus = require("http-status");
const AppError = require("../utils/appError");
const { getDueList } = require("./../controllers/semesterController");

exports.semesterFeePayment = catchAsync(async (req, res, next) => {
  const { cgpa, semester, amount } = req.body;

  const student = await Student.findById(req.user.id);

  // check if previous semester due is completed and amount is paid

  let [current_semester_index, next_semester_index] = [semester - 1, semester];

  if (
    semester !== 1 &&
    !student.course_semesters[current_semester_index - 1].is_completed
  ) {
    return next(
      new AppError(
        "Please complete previous semester first",
        httpStatus.UNPROCESSABLE_ENTITY
      )
    );
  }

  student.course_semesters[current_semester_index].paid_amount = amount;
  student.course_semesters[current_semester_index].due_amount = (
    student.course_semesters[current_semester_index].due_amount - amount
  ).toFixed(2);
  student.course_semesters[current_semester_index].is_completed = true;

  student.course_total_due_amount -= amount;

  // 2) calculate upcoming semester

  // check if last semester
  if (semester !== 12) {
    student.current_semester = semester + 1;

    const { percentage, amount: discountAmount } = calculateWaiver({
      ssc_cgpa: student.ssc_grade,
      hsc_cgpa: student.hsc_grade,
      current_cgpa: cgpa,
      department: student.department,
    });

    student.course_semesters[next_semester_index].discount_percentage =
      percentage;
    student.course_semesters[next_semester_index].discount_amount =
      discountAmount;
    student.course_semesters[next_semester_index].due_amount = Number(
      student.course_semesters[next_semester_index].payable - discountAmount
    );
  }

  const updatedStudent = await student.save({ validateBeforeSave: false });

  if (semester === 12) {
    const dueSemesterList = student.course_semesters.filter((semester) => {
      return semester.due_amount !== 0;
    });

    return res.status(httpStatus.OK).json({
      status: "success",
      data: {
        updatedStudent: {
          ...updatedStudent._doc,
          dueSemesterList,
        },
      },
    });
  }

  res.status(httpStatus.OK).json({
    status: "success",
    data: {
      updatedStudent,
    },
  });
});

exports.clearDuePayment = catchAsync(async (req, res, next) => {});
