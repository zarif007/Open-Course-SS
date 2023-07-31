import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { ICourseTopic } from '../courseTopic/courseTopic.interface';

export type ICourse = {
  id?: string;
  _id?: string;
  title: string;
  type: 'gn' | 'org';
  version: number;
  enabled: boolean;
  creator: IUser;
  contributors: IUser[] | [];
  enrolledUsers: IUser[] | [];
  categories: string[];
  description: string;
  banner?: string;
  topics: ICourseTopic[] | [] | Types.ObjectId[];
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
  _v?: number;
};

export type ICourseModel = Model<ICourse, Record<string, unknown>>;
