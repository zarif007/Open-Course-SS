import envConfig from '../../../config/envConfig';
import { IUser } from './user.interface';
import { User } from './user.model';

const getUserByClerkId = async (clerkId: string): Promise<IUser | null> => {
  const clerkApiUrl = `https://api.clerk.dev/v1/users/${clerkId}`;
  const clerkHeaders = {
    Authorization: `Bearer ${envConfig.clerk_secret_key}`,
  };

  const clerkResponse = await fetch(clerkApiUrl, { headers: clerkHeaders });
  const clerkData = await clerkResponse.json();

  const user: IUser = {
    externalId: clerkData.id,
    attributes: {
      ...clerkData,
    },
  };
  return clerkData.errors ? null : user;
};

const upsertUser = async (payload: IUser): Promise<IUser | null> => {
  const user = await User.findOneAndUpdate(
    { externalId: payload.externalId },
    payload,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  return user;
};

export const UserService = {
  getUserByClerkId,
  upsertUser,
};
