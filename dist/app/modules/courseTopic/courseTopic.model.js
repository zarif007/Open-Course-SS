'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CourseTopic = void 0;
const mongoose_1 = require('mongoose');
const CourseTopicSchema = new mongoose_1.Schema(
  {
    topicID: {
      type: Number,
      required: [true, 'Topic ID is required'],
    },
    versions: [
      {
        title: {
          type: String,
          required: [true, 'Title is required'],
        },
        description: {
          type: String,
          default: '',
        },
        url: {
          type: String,
          required: [true, 'Link is required'],
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
exports.CourseTopic = (0, mongoose_1.model)('CourseTopic', CourseTopicSchema);
