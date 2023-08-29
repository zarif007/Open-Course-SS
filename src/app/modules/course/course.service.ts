import { Types } from 'mongoose';
import { CourseTopic } from '../courseTopic/courseTopic.model';
import { ICourse } from './course.interface';
import { Course } from './course.model';
import { UserService } from '../user/user.service';

// const getCreator = async (id: string): Promise<IUser | null> => {
//   return await UserService.getUserByClerkId(id as string);
// };

const getCourses = async (query: object): Promise<ICourse[] | null> => {
  const results = await Course.find(query)
    .populate('topics')
    .populate('creator');

  return results;
};

const getSingleCourse = async (id: string): Promise<ICourse | null> => {
  const result = await Course.findById(id)
    .populate('topics')
    .populate('creator');

  return result;
};

const getSingleCourseBySlug = async (slug: string): Promise<ICourse | null> => {
  const result = await Course.findOne({ slug })
    .populate('topics')
    .populate('creator');

  return result;
};

const createCourse = async (payload: ICourse): Promise<ICourse | null> => {
  const topicIds: Types.ObjectId[] = [];

  // Upsert User
  const user = await UserService.upsertUser(payload.creator as string);

  // Creating topics and storing _ids at the course
  for (const topic of payload.topics) {
    const res = await CourseTopic.create(topic);
    topicIds.push(new Types.ObjectId(res._id.toString()));
  }

  const result = await Course.create({
    ...payload,
    topics: topicIds,
    creator: user?._id ?? (payload.creator as string),
  });

  await result.populate('topics');
  await result.populate('creator');
  return result;
};

const updateCourse = async (
  id: string,
  payload: Partial<ICourse>
): Promise<ICourse | null> => {
  const result = await Course.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  if (result) {
    await result.populate('topics');
    await result.populate('creator');
  }
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
