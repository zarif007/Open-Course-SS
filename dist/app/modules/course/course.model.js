'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Course = void 0;
const mongoose_1 = require('mongoose');
const CourseSchema = new mongoose_1.Schema(
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
      type: [mongoose_1.Schema.Types.ObjectId],
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
exports.Course = (0, mongoose_1.model)('Course', CourseSchema);
