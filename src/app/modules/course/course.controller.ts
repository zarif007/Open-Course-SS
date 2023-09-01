/* eslint-disable no-console */
import httpStatus from 'http-status';
import { ICourse } from './course.interface';
import { CourseService } from './course.service';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { courseFilterableFields } from './course.constants';
import { paginationFields } from '../../../constants/pagination';

const getCourses = catchAsync(async (req, res) => {
  const filters = pick(req.query, courseFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CourseService.getCourses(filters, paginationOptions);
  sendResponse<ICourse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses fetched successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CourseService.getSingleCourse(id);
  sendResponse<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully !',
    data: result,
  });
});

const getSingleCourseBySlug = catchAsync(async (req, res) => {
  const slug = req.params.slug;
  const result = await CourseService.getSingleCourseBySlug(slug);
  sendResponse<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched successfully !',
    data: result,
  });
});

const createCourse = catchAsync(async (req, res) => {
  const course = req.body;
  const result = await CourseService.createCourse(course);
  sendResponse<ICourse | null>(res, {
    statusCode: result ? httpStatus.CREATED : httpStatus.FORBIDDEN,
    success: result ? true : false,
    message: result
      ? `Course created successfully !`
      : 'Course creation failed !',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const course = req.body;
  const { id } = req.params;
  const result = await CourseService.updateCourse(id, course);
  sendResponse<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully !',
    data: result,
  });
});

export const CourseController = {
  getCourses,
  getSingleCourse,
  getSingleCourseBySlug,
  createCourse,
  updateCourse,
};
