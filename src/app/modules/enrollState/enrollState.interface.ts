/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model, Types } from 'mongoose';
import { ICourseTopic } from '../courseTopic/courseTopic.interface';

export type IEnrollState = {
  id?: Types.ObjectId | string;
  _id?: Types.ObjectId | string;
  course: Types.ObjectId | string;
  user: string;
  currentTopic: Types.ObjectId | string | ICourseTopic;
  finishedTopics: string[];
  createdAt?: Date;
  updatedAt?: Date;
  _v?: number;
};

export type IEnrollStateModel = Model<IEnrollState, Record<string, unknown>>;
