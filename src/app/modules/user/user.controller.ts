import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const getUserByClerkId = catchAsync(async (req, res) => {
  const { clerkId } = req.params;
  const result = await UserService.getUserByClerkId(clerkId);
  sendResponse<IUser | null>(res, {
    statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
    success: result ? true : false,
    message: `UserByClerkId fetched ${!result && 'un'}successfully !`,
    data: result,
  });
});

const upsertUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await UserService.upsertUser(payload);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully !',
    data: result,
  });
});

export const UserController = {
  getUserByClerkId,
  upsertUser,
};
