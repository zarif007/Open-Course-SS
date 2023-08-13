'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = require('express');
const course_route_1 = require('../modules/course/course.route');
const enrollState_route_1 = require('../modules/enrollState/enrollState.route');
const router = (0, express_1.Router)();
const moduleRoutes = [
  {
    path: '/course',
    route: course_route_1.CourseRoutes,
  },
  {
    path: '/enrollState',
    route: enrollState_route_1.EnrollStateRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
