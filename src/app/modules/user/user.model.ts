import { Schema, model } from 'mongoose';
import { IUser, IUserModel } from './user.interface';

export const UserSchema = new Schema<IUser, IUserModel>({
  externalId: {
    type: String,
    required: [true, 'External ID is required'],
  },
  attributes: {
    type: Object,
    default: {},
  },
  role: {
    type: String,
    default: 'user',
  },
  preferences: {
    type: [String],
    default: [],
  },
  bio: {
    type: String,
    default: '',
  },
  userName: {
    type: String,
    default: '',
  },
});

export const User = model<IUser, IUserModel>('User', UserSchema);
