import { Types } from 'mongoose';
import { CourseTopic } from '../courseTopic/courseTopic.model';
import { ICourse } from './course.interface';
import { Course } from './course.model';
import { UserService } from '../user/user.service';

const getCourses = async (query: object): Promise<ICourse[] | null> => {
  const results = await Course.find(query).populate('topics');

  return results;
};

const getSingleCourse = async (id: string): Promise<ICourse | null> => {
  const results = await Course.findById(id).populate('topics');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const creator = await UserService.getUserByClerkId(
    results?.creator as string
  );
  return results;
};

const getSingleCourseBySlug = async (slug: string): Promise<ICourse | null> => {
  const results = await Course.findOne({ slug }).populate('topics');
  return results;
};

const createCourse = async (payload: ICourse): Promise<ICourse | null> => {
  const topicIds: Types.ObjectId[] = [];

  // Creating topics and storing _ids at the course
  for (const topic of payload.topics) {
    const res = await CourseTopic.create(topic);
    topicIds.push(res._id);
  }

  const result = await Course.create({ ...payload, topics: topicIds });

  await result.populate('topics');
  return result;
};

const updateCourse = async (
  id: string,
  payload: Partial<ICourse>
): Promise<ICourse | null> => {
  const result = await Course.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCourse = async (id: string): Promise<ICourse | null> => {
  const result = await Course.findByIdAndDelete({ _id: id });
  return result;
};

export const CourseService = {
  getCourses,
  getSingleCourse,
  getSingleCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
};
