import { Schema, model } from 'mongoose';
import { ICourse, ICourseModel } from './course.interface';

const CourseSchema = new Schema<ICourse, ICourseModel>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    type: {
      type: String,
      default: 'gn',
    },
    version: {
      type: Number,
      default: 1,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    creator: {
      type: String,
      required: [true, 'Creator is required'],
    },
    contributors: {
      type: [String],
      default: [],
    },
    enrolledUsers: {
      type: [String],
      default: [],
    },
    categories: {
      type: [String],
      default: [],
    },
    levels: {
      type: [String],
      default: [],
    },
    languages: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: '',
    },
    banner: {
      type: String,
      default: '',
    },
    topics: {
      type: [Schema.Types.ObjectId],
      ref: 'CourseTopic',
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

CourseSchema.pre('save', function (next) {
  this.contributors = [this.creator];
  next();
});

export const Course = model<ICourse, ICourseModel>('Course', CourseSchema);
