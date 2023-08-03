import { IUser } from './user.interface';
import clerk from '@clerk/clerk-sdk-node';

const getUserById = async (userId: string): Promise<IUser | null> => {
  const result = await clerk.users.getUser(userId);
  const user = {
    id: result?.id,
    fullName: result?.firstName ?? '' + result?.lastName,
    imageUrl: result?.imageUrl,
    email: result?.emailAddresses[0].emailAddress,
  };
  return user;
};

export const UserService = {
  getUserById,
};
