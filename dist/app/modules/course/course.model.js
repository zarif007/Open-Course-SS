'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Course = void 0;
const mongoose_1 = require('mongoose');
const user_model_1 = require('../user/user.model');
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
      type: user_model_1.userSchema,
      required: [true, 'Creator is required'],
    },
    contributors: {
      type: [user_model_1.userSchema],
      default: [],
    },
    enrolledUsers: {
      type: [user_model_1.userSchema],
      default: [],
    },
    categories: {
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
