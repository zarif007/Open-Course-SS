import { Model } from 'mongoose';

export type ICourseTopic = {
  _id?: string;
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
