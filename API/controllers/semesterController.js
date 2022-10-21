const Student = require("./../models/student.model");
const catchAsync = require("./../utils/catchAsync");
const calculateWaiver = require("./../utils/calculateWaiver");
const {
  getPerSemesterAmount,
  getTotalAmount,
} = require("./../utils/getCourseAmounts");
const httpStatus = require("http-status");

exports.generateSemesters = (req, res, next) => {
  let [total, per_semester_total, course_semesters] = [
    getTotalAmount(req.body.department),
    getPerSemesterAmount(req.body.department),
    [],
  ];

  const { percentage: discountPercentage, amount: discountAmount } =
    calculateWaiver({
      ssc_cgpa: req.body.ssc_grade,
      hsc_cgpa: req.body.hsc_grade,
      department: req.body.department,
      admission_form_submission: true,
    });

  for (let i = 0; i < 12; i++) {
    course_semesters.push({
      payable: per_semester_total.toFixed(2),
      level: i + 1,
      cgpa: 0,
      paid_amount: 0,
      due_amount:
        i === 0
          ? (per_semester_total - discountAmount).toFixed(2)
          : per_semester_total.toFixed(2),
      discount_percentage: i === 0 ? discountPercentage : 0,
      discount_amount: i === 0 ? discountAmount.toFixed(2) : 0,
      is_completed: false,
    });
  }

  req.body.course_semesters = course_semesters;
  req.body.course_total_amount = total;
  req.body.course_total_due_amount = total;
  req.body.is_first_login = false;

  next();
};

exports.getAll = catchAsync(async (req, res, next) => {
  const semesters = await Student.findById(req.user.id).select({
    course_semesters: 1,
    current_semester: 1,
  });

  res.status(httpStatus.OK).json({
    status: "success",
    results: semesters.course_semesters.length,
    data: {
      current_semester: semesters.current_semester,
      semesters: semesters.course_semesters,
    },
  });
});

exports.getDueList = catchAsync(async (req, res, next) => {
  const student = await Student.findById(req.user.id);
  const dueSemesterList = student.course_semesters.filter((semester) => {
    return semester.due_amount !== 0;
  });

  res.status(httpStatus.OK).json({
    status: "success",
    data: {
      dueSemesterList,
    },
  });
});
