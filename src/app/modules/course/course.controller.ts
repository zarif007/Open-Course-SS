import httpStatus from 'http-status';
import { ICourse } from './course.interface';
import { CourseService } from './course.service';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';

const getCourses = catchAsync(async (req, res) => {
  const { id } = req.query;
  const result = await CourseService.getCourses(id ? { _id: id } : {});
  sendResponse<ICourse[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses fetched successfully !',
    data: result,
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

const createCourse = catchAsync(async (req, res) => {
  const course = req.body;
  const result = await CourseService.createCourse(course);
  sendResponse<ICourse>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course created successfully !',
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
  createCourse,
  updateCourse,
};
