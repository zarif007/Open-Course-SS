import { Types } from 'mongoose';
import { CourseTopic } from '../courseTopic/courseTopic.model';
import { ICourse } from './course.interface';
import { Course } from './course.model';
import { UserService } from '../user/user.service';
import { IUser } from '../user/user.interface';

const getCreator = async (id: string): Promise<IUser | null> => {
  return await UserService.getUserByClerkId(id as string);
};

const getCourses = async (query: object): Promise<ICourse[] | null> => {
  const results = await Course.find(query).populate('topics');

  const courses: ICourse[] = [];

  for (const course of results) {
    courses.push({
      ...course.toObject(),
      creator: (await getCreator(course.creator as string)) as IUser,
      id: course._id,
    });
  }

  return courses;
};

const getSingleCourse = async (id: string): Promise<ICourse | null> => {
  const result = await Course.findById(id).populate('topics');

  const course = {
    ...result?.toObject(),
    creator: await getCreator(result?.creator as string),
    id: result?._id,
  };

  return course as ICourse;
};

const getSingleCourseBySlug = async (slug: string): Promise<ICourse | null> => {
  const result = await Course.findOne({ slug }).populate('topics');

  const course = {
    ...result?.toObject(),
    creator: await getCreator(result?.creator as string),
    id: result?._id,
  };

  return course as ICourse;
};

const createCourse = async (payload: ICourse): Promise<ICourse | null> => {
  const topicIds: Types.ObjectId[] = [];

  // Creating topics and storing _ids at the course
  for (const topic of payload.topics) {
    const res = await CourseTopic.create(topic);
    topicIds.push(new Types.ObjectId(res._id.toString()));
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
