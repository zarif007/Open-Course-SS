/* eslint-disable @typescript-eslint/no-unused-vars */
import { EnrollStateService } from './enrollState.service';
import { IEnrollState } from './enrollState.interface';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';

const getEnrollState = catchAsync(async (req, res) => {
  const { user, course } = req.query;
  let result = null;
  if (typeof user === 'string' && typeof course === 'string') {
    result = await EnrollStateService.getEnrollState(user, course);
  }
  sendResponse<IEnrollState>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'State fetched successfully !',
    data: result,
  });
});

const createEnrollState = catchAsync(async (req, res) => {
  const enrollState = req.body;
  const result = await EnrollStateService.createEnrollState(enrollState);
  sendResponse<IEnrollState>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'State created successfully !',
    data: result,
  });
});

const updateEnrollState = catchAsync(async (req, res) => {
  const enrollState = req.body;
  const result = await EnrollStateService.updateEnrollState(enrollState);
  sendResponse<IEnrollState>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully !',
    data: result,
  });
});

export const EnrollStateController = {
  getEnrollState,
  createEnrollState,
  updateEnrollState,
};
