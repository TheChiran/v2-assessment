const testRoute = require("./test.routes");
const studentRoute = require("./student.routes");
const admissionRoute = require("./admission.routes");
const paymentRoute = require("./payment.routes");
const semesterRoute = require("./semester.routes");

const express = require("express");

const router = express.Router();

const defaultRoutes = [
  { path: "/students", route: studentRoute },
  { path: "/admissions", route: admissionRoute },
  { path: "/payments", route: paymentRoute },
  { path: "/semesters", route: semesterRoute },
];

const devRoutes = [...defaultRoutes, ...[{ path: "/test", route: testRoute }]];

if (process.env.NODE_ENV === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
} else if (process.env.NODE_ENV === "production") {
  defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
