const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
    required: [true, "Please provide your phone number"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (element) {
        return element === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  department: {
    type: String,
    enum: ["SWE", "CSE", "EEE"],
  },
  ssc_grade: {
    type: Number,
    validate: {
      validator: function (grade) {
        return grade > 1 || grade < 5;
      },
      message: "SSC grade must be between 1 and 5",
    },
  },
  hsc_grade: {
    type: Number,
    validate: {
      validator: function (grade) {
        return grade > 1 || grade < 5;
      },
      message: "SSC grade must be between 1 and 5",
    },
  },
  is_first_login: {
    type: Boolean,
    default: true,
    enum: [true, false],
  },
  current_semester: {
    type: Number,
    default: 1,
  },
  course_total_amount: {
    type: Number,
  },
  course_total_due_amount: {
    type: Number,
  },
  course_semesters: [
    {
      payable: { type: Number },
      level: { type: Number },
      cgpa: { type: Number },
      paid_amount: { type: Number },
      due_amount: { type: Number },
      discount_percentage: { type: Number },
      discount_amount: { type: Number },
      is_completed: { type: Boolean, default: false },
    },
  ],
});

studentSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

studentSchema.methods.correctPassword = async function (
  candidatePassword,
  studentPassword
) {
  return await bcrypt.compare(candidatePassword, studentPassword);
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
