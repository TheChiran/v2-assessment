const testRoute = require('./test.routes');
const userRoute = require('./user.routes');
const videoRoute = require('./video.routes');

const express = require('express');

const router = express.Router();

const defaultRoutes = [
  { path: '/users', route: userRoute },
  { path: '/videos', route: videoRoute },
];

const devRoutes = [...defaultRoutes, ...[{ path: '/test', route: testRoute }]];

if (process.env.NODE_ENV === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
} else if (process.env.NODE_ENV === 'production') {
  defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
