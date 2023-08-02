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
exports.CourseTopicService = void 0;
const courseTopic_model_1 = require('./courseTopic.model');
const getCourseTopicById = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield courseTopic_model_1.CourseTopic.findById(id);
    return result;
  });
const createCourseTopic = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield courseTopic_model_1.CourseTopic.create(payload);
    return result;
  });
exports.CourseTopicService = {
  getCourseTopicById,
  createCourseTopic,
};
