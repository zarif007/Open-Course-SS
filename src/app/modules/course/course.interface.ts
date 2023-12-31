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
  creator: IUser | string;
  contributors: (IUser | string)[];
  enrolledUsers: (IUser | string)[];
  categories: string[];
  levels: string[];
  languages: string[];
  description: string;
  banner?: string;
  topics: ICourseTopic[] | [] | Types.ObjectId[];
  slug: string;
  tags: string[];
  status?: 'draft' | 'published';
  ratings: {
    user: string;
    rating: number;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
  _v?: number;
};

export type ICourseModel = Model<ICourse, Record<string, unknown>>;

export type ICourseFilters = {
  searchTerm?: string;
  tags?: string[];
  creator?: string;
  categories?: string[];
  levels?: string[];
  languages?: string[];
  ratings?: string[];
};
