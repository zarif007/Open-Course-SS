// user.interface.ts
import { Schema } from 'mongoose';
import { IUser } from './user.interface';

export const userSchema = new Schema<IUser>({
  id: String,
  fullName: String,
  imageUrl: String,
  email: String,
});
