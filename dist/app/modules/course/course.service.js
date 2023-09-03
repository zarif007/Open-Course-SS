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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const mongoose_1 = require("mongoose");
const courseTopic_model_1 = require("../courseTopic/courseTopic.model");
const course_model_1 = require("./course.model");
const course_constants_1 = require("./course.constants");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
// const getCreator = async (id: string): Promise<IUser | null> => {
//   return await UserService.getUserByClerkId(id as string);
// };
const getCourses = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: course_constants_1.courseSearchableFields.map(field => ({
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
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield course_model_1.Course.find(whereConditions)
        .populate('topics')
        .populate('creator')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield course_model_1.Course.countDocuments(whereConditions)
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
});
const getSingleCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findById(id)
        .populate('topics')
        .populate('creator');
    return result;
});
const getSingleCourseBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findOne({ slug })
        .populate('topics')
        .populate('creator');
    return result;
});
const createCourse = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const topicIds = [];
    // Creating topics and storing _ids at the course
    for (const topic of payload.topics) {
        const res = yield courseTopic_model_1.CourseTopic.create(topic);
        topicIds.push(new mongoose_1.Types.ObjectId(res._id.toString()));
    }
    const result = yield course_model_1.Course.create(Object.assign(Object.assign({}, payload), { topics: topicIds }));
    yield result.populate('topics');
    yield result.populate('creator');
    return result;
});
const updateCourse = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    if (result) {
        yield result.populate('topics');
        yield result.populate('creator');
    }
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
