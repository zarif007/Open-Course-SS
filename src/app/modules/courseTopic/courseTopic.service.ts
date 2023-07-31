import { ICourseTopic } from './courseTopic.interface';
import { CourseTopic } from './courseTopic.model';

const getCourseTopicById = async (id: string): Promise<ICourseTopic | null> => {
  const result = await CourseTopic.findById(id);
  return result;
};

const createCourseTopic = async (
  payload: ICourseTopic
): Promise<ICourseTopic | null> => {
  const result = await CourseTopic.create(payload);
  return result;
};

export const CourseTopicService = {
  getCourseTopicById,
  createCourseTopic,
};
