import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const getUserByExternalId = catchAsync(async (req, res) => {
  const { externalId } = req.params;
  const result = await UserService.getUserByExternalId(externalId);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'UserByExternalId fetched successfully !',
    data: result,
  });
});

const upsertUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await UserService.upsertUser(payload);
  // eslint-disable-next-line no-console
  console.log(payload);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully !',
    data: result,
  });
});

export const UserController = {
  getUserByExternalId,
  upsertUser,
};
