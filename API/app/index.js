const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const httpStatus = require("http-status");
const bodyParser = require("body-parser");

// Start express app
const app = express();

const AppError = require("./../utils/appError");
const globalErrorHandler = require("./../controllers/errorHandler");
const routesV1 = require("../routes/v1");

// GLOBAL MIDDLEWARE
app.use(helmet());
app.use(cors());

// development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// limits request from same ip address
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 60,
  message: "Too many request from this IP, please try again in an hour!",
});

app.use("/api", limiter);

app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);

app.use(mongoSanitize());
app.use(xss());
app.use(hpp({ whitelist: [] }));

// ROUTES
app.use("/api/v1", routesV1);

// ROUTE HANDLER
app.all("*", (req, res, next) => {
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this server`,
      httpStatus.NOT_FOUND
    )
  );
});

// GLOBAL ERROR HANDLE MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
