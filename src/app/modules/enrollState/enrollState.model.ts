import { Schema, model } from 'mongoose';
import { IEnrollState, IEnrollStateModel } from './enrollState.interface';

const EnrollStateSchema = new Schema<IEnrollState, IEnrollStateModel>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'The course ID is required'],
    },
    userId: {
      type: String,
      required: true,
    },
    currentTopic: {
      type: Schema.Types.ObjectId,
      ref: 'courseTopic',
      required: [true, 'The topic ID is required'],
    },
    finishedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const EnrollState = model<IEnrollState, IEnrollStateModel>(
  'EnrollState',
  EnrollStateSchema
);
