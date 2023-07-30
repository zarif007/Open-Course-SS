import { ICourse } from './course.interface';
import { Course } from './course.model';

const getCourses = async (query: object): Promise<ICourse[] | null> => {
  const results = await Course.find(query);
  return results;
};

const getSingleCourse = async (id: string): Promise<ICourse | null> => {
  const results = await Course.findById(id);
  return results;
};

const createCourse = async (payload: ICourse): Promise<ICourse | null> => {
  const result = await Course.create(payload);
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
  createCourse,
  updateCourse,
  deleteCourse,
};