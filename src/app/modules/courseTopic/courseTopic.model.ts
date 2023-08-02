import { Schema, model } from 'mongoose';
import { ICourseTopic, ICourseTopicModel } from './courseTopic.interface';

const CourseTopicSchema = new Schema<ICourseTopic, ICourseTopicModel>(
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
        duration: {
          type: Number,
          default: 0,
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

export const CourseTopic = model<ICourseTopic, ICourseTopicModel>(
  'CourseTopic',
  CourseTopicSchema
);
