import { Model, ObjectId } from 'mongoose';

export type ICourseTopic = {
  _id?: string | ObjectId;
  id?: string | number;
  topicID?: number;
  versions: [
    {
      title: string;
      url: string;
      description: string;
      duration: number;
    }
  ];
};

export type ICourseTopicModel = Model<ICourseTopic, Record<string, unknown>>;
