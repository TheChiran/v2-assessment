const Student = require("./../models/student.model");
const catchAsync = require("./../utils/catchAsync");
const calculateWaiver = require("./../utils/calculateWaiver");
const {
  getPerSemesterAmount,
  getTotalAmount,
} = require("./../utils/getCourseAmounts");

exports.generateSemesters = catchAsync(async (req, res, next) => {
  let [total, per_semester_total, course_semesters] = [
    getTotalAmount(req.body.department),
    getPerSemesterAmount(req.body.department),
    [],
  ];

  const { percentage: discountPercentage, amount: discountAmount } =
    calculateWaiver({
      ssc_cgpa: req.body.ssc_cgpa,
      hsc_cgpa: req.body.hsc_cgpa,
      department: req.body.department,
      admission_form_submission: true,
    });

  for (let i = 0; i < 11; i++) {
    course_semesters.push({
      payable: per_semester_total,
      level: i + 1,
      cgpa: 0,
      paid_amount: 0,
      due_amount:
        i === 0 ? per_semester_total - discountAmount : per_semester_total,
      discount_percentage: i === 0 ? discountPercentage : 0,
      discount_amount: i === 0 ? discountAmount : 0,
      is_completed: false,
    });
  }

  req.body.course_semesters = course_semesters;
  req.body.total_amount = total;
  req.body.total_due_amount = total;
  next();
});

exports.getAll = catchAsync(async (req, res, next) => {
  const semesters = await Student.findById(req.user.id).select({
    course_semesters: 1,
  });

  res.status(httpStatus.OK).json({
    status: "success",
    results: semesters.length,
    data: {
      semesters,
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
