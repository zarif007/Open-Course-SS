import envConfig from '../../../config/envConfig';
import { IUser } from './user.interface';
import { User } from './user.model';

const getUserByExternalId = async (
  externalId: string
): Promise<IUser | null> => {
  const user = await User.findOne({ externalId });
  return user;
};

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
      username: clerkData.username as string,
      image_url: clerkData.image_url as string,
      last_name: clerkData.last_name as string,
      first_name: clerkData.first_name as string,
      created_at: clerkData.created_at as number,
      updated_at: clerkData.updated_at as number,
      external_id: clerkData.external_id as string,
      email_addresses: clerkData.email_addresses as [],
    },
  };
  return clerkData.errors ? null : user;
};

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const user = await User.findOneAndUpdate(
    { externalId: payload.externalId },
    payload,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return user;
};

const upsertUser = async (clerkId: string): Promise<IUser | null> => {
  const clerkData = await getUserByClerkId(clerkId);

  if (!clerkData) return null;
  const user = await User.findOneAndUpdate(
    { externalId: clerkData.externalId },
    clerkData,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  return user;
};

export const UserService = {
  getUserByExternalId,
  getUserByClerkId,
  createUser,
  upsertUser,
};
