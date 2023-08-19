"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const courseTopic_model_1 = require("../courseTopic/courseTopic.model");
const course_model_1 = require("./course.model");
const user_service_1 = require("../user/user.service");
const getCourses = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield course_model_1.Course.find(query).populate('topics');
    return results;
});
const getSingleCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield course_model_1.Course.findById(id).populate('topics');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const creator = yield user_service_1.UserService.getUserByClerkId(results === null || results === void 0 ? void 0 : results.creator);
    const course = Object.assign(Object.assign({}, results === null || results === void 0 ? void 0 : results.toObject()), { creator: creator });
    return course;
});
const getSingleCourseBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield course_model_1.Course.findOne({ slug }).populate('topics');
    return results;
});
const createCourse = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const topicIds = [];
    // Creating topics and storing _ids at the course
    for (const topic of payload.topics) {
        const res = yield courseTopic_model_1.CourseTopic.create(topic);
        topicIds.push(res._id);
    }
    const result = yield course_model_1.Course.create(Object.assign(Object.assign({}, payload), { topics: topicIds }));
    yield result.populate('topics');
    return result;
});
const updateCourse = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
