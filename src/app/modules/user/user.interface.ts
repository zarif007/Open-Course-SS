import { Model } from 'mongoose';

type VerificationStatus = {
  status: string;
  attempts: number | null;
  strategy: string;
  expire_at: number | null;
};

type LinkedAccount = {
  id: string;
  type: string;
};

type EmailAddress = {
  id: string;
  object: string;
  reserved: boolean;
  linked_to: LinkedAccount[];
  verification: VerificationStatus;
  email_address: string;
};

type UserAttributes = {
  username: string | null;
  image_url: string;
  last_name: string | null;
  created_at: number;
  first_name: string;
  updated_at: number;
  external_id: string | null;
  email_addresses: EmailAddress[];
};

export type IUser = {
  id?: string;
  _id?: string;
  externalId: string;
  attributes: UserAttributes;
  role: 'super_admin' | 'admin' | 'user' | 'pro_User';
};

export type IUserModel = Model<IUser, Record<string, unknown>>;
