import { Model } from 'mongoose';
import { IUser } from '../user/user.interface';

export type ICourseTopic = {
  title: string;
  url: string;
  description: string;
};

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
  topics: ICourseTopic[];
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
  _v?: number;
};

export type ICourseModel = Model<ICourse, Record<string, unknown>>;
