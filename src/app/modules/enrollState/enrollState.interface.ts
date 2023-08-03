/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model, Types } from 'mongoose';

export type IEnrollState = {
  id?: Types.ObjectId | string;
  _id?: Types.ObjectId | string;
  courseId: Types.ObjectId | string;
  userId: string;
  currentTopic: Types.ObjectId | string;
  finishedCount: number;
  createdAt?: Date;
  updatedAt?: Date;
  _v?: number;
};

export type IEnrollStateModel = Model<IEnrollState, Record<string, unknown>>;
