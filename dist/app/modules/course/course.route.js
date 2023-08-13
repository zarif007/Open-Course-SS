'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CourseRoutes = void 0;
const express_1 = require('express');
const course_controller_1 = require('./course.controller');
const router = (0, express_1.Router)();
router.get('/', course_controller_1.CourseController.getCourses);
router.get('/byId/:id', course_controller_1.CourseController.getSingleCourse);
router.get(
  '/bySlug/:slug',
  course_controller_1.CourseController.getSingleCourseBySlug
);
router.post('/', course_controller_1.CourseController.createCourse);
router.delete('/:id');
router.patch('/:id', course_controller_1.CourseController.updateCourse);
exports.CourseRoutes = router;
