const catchAsync = require("../utils/catchAsync");
const Student = require("./../models/student.model");

exports.semesterFeePayment = catchAsync(async (req, res, next) => {
  const { cgpa, semester, amount } = req.body;
  const upcomingSemester = semester + 1;

  const student = await Student.findById(req.user.id);

  const current_semester = student.course_semesters.indexOf({
    level: semester,
  });

  student.course_semesters[current_semester].paid_amount = amount;
  student.course_semesters[current_semester].due_amount -= amount;
  student.course_semesters[current_semester].is_completed = true;
  student.current_semester = upcomingSemester;

  // 2) calculate upcoming semester
  const { percentage, amount: discountAmount } = await calculateWaiver({
    ssc_cgpa: student.ssc_grade,
    hsc_cgpa: student.hsc_grade,
    current_cgpa: cgpa,
    department: student.department,
  });

  student.course_semesters[upcomingSemester].discount_percentage = percentage;
  student.course_semesters[upcomingSemester].discount_amount = discountAmount;
  student.course_semesters[upcomingSemester].due_amount =
    student.course_semesters[upcomingSemester].total_amount - discountAmount;

  const updatedStudent = await student.save();

  res.status(httpStatus.OK).json({
    status: "success",
    data: {
      updatedStudent,
    },
  });
});

exports.clearDuePayment = catchAsync(async (req, res, next) => {});
