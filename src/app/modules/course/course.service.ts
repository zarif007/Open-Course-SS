import { SortOrder, Types } from 'mongoose';
import { CourseTopic } from '../courseTopic/courseTopic.model';
import { ICourse, ICourseFilters } from './course.interface';
import { Course } from './course.model';
import { UserService } from '../user/user.service';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { courseSearchableFields } from './course.constants';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';

// const getCreator = async (id: string): Promise<IUser | null> => {
//   return await UserService.getUserByClerkId(id as string);
// };

const getCourses = async (
  filters: ICourseFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICourse[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: courseSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // Filters needs $and to full fill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Course.find(whereConditions)
    .populate('topics')
    .populate('creator')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Course.countDocuments(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
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
  const user = await UserService.getUserByExternalId(payload.creator as string);

  if (!user) return null;

  // Creating topics and storing _ids at the course
  for (const topic of payload.topics) {
    const res = await CourseTopic.create(topic);
    topicIds.push(new Types.ObjectId(res._id.toString()));
  }

  const result = await Course.create({
    ...payload,
    topics: topicIds,
    creator: user?._id,
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
