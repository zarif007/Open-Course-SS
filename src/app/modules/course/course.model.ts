import { Schema, model } from 'mongoose';
import { ICourse, ICourseModel } from './course.interface';
import { courseStatuses, courseTypes } from './course.constants';

const CourseSchema = new Schema<ICourse, ICourseModel>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    type: {
      type: String,
      enum: courseTypes,
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
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
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
    slug: {
      type: String,
      required: [true, 'Slug is required'],
    },
    banner: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: courseStatuses,
      default: 'published',
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
    ratings: {
      type: [
        {
          user: String,
          rating: Number,
        },
      ],
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

// CourseSchema.pre('save', function (next) {
//   this.contributors = [this.creator];
//   next();
// });

export const Course = model<ICourse, ICourseModel>('Course', CourseSchema);
