'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CourseService = void 0;
const mongoose_1 = require('mongoose');
const courseTopic_model_1 = require('../courseTopic/courseTopic.model');
const course_model_1 = require('./course.model');
const user_service_1 = require('../user/user.service');
// const getCreator = async (id: string): Promise<IUser | null> => {
//   return await UserService.getUserByClerkId(id as string);
// };
const getCourses = query =>
  __awaiter(void 0, void 0, void 0, function* () {
    const results = yield course_model_1.Course.find(query)
      .populate('topics')
      .populate('creator');
    return results;
  });
const getSingleCourse = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findById(id)
      .populate('topics')
      .populate('creator');
    return result;
  });
const getSingleCourseBySlug = slug =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findOne({ slug })
      .populate('topics')
      .populate('creator');
    return result;
  });
const createCourse = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const topicIds = [];
    // Upsert User
    const user = yield user_service_1.UserService.upsertUser(payload.creator);
    // Creating topics and storing _ids at the course
    for (const topic of payload.topics) {
      const res = yield courseTopic_model_1.CourseTopic.create(topic);
      topicIds.push(new mongoose_1.Types.ObjectId(res._id.toString()));
    }
    const result = yield course_model_1.Course.create(
      Object.assign(Object.assign({}, payload), {
        topics: topicIds,
        creator:
          (_a = user === null || user === void 0 ? void 0 : user._id) !==
            null && _a !== void 0
            ? _a
            : payload.creator,
      })
    );
    yield result.populate('topics');
    yield result.populate('creator');
    return result;
  });
const updateCourse = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findOneAndUpdate(
      { _id: id },
      payload,
      {
        new: true,
      }
    );
    if (result) {
      yield result.populate('topics');
      yield result.populate('creator');
    }
    return result;
  });
const deleteCourse = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findByIdAndDelete({ _id: id });
    return result;
  });
exports.CourseService = {
  getCourses,
  getSingleCourse,
  getSingleCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
};
