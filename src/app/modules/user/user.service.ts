import { IUser } from './user.interface';
import { User } from './user.model';

const getUserByExternalId = async (
  externalId: string
): Promise<IUser | null> => {
  const user = await User.findOne({ externalId });
  return user;
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
  getUserByExternalId,
  upsertUser,
};
