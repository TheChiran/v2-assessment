const testRoute = require("./test.routes");
const studentRoute = require("./student.routes");

const express = require("express");

const router = express.Router();

const defaultRoutes = [{ path: "/students", route: studentRoute }];

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
