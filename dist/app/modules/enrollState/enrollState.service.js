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
exports.EnrollStateService = void 0;
const course_model_1 = require("../course/course.model");
const enrollState_model_1 = require("./enrollState.model");
const getEnrollState = (user, course) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield enrollState_model_1.EnrollState.findOne({ user, course }).populate('currentTopic');
    return result;
});
const createEnrollState = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.Course.findById(payload.course);
    const result = yield enrollState_model_1.EnrollState.create(Object.assign(Object.assign({}, payload), { currentTopic: course === null || course === void 0 ? void 0 : course.topics[0]._id }));
    yield course_model_1.Course.updateOne({ _id: course === null || course === void 0 ? void 0 : course._id }, { $push: { enrolledUsers: payload.user } });
    // await result.populate('currentTopic');
    return result;
});
const updateEnrollState = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield enrollState_model_1.EnrollState.findOneAndUpdate({ user: payload.user, course: payload.course }, payload, {
        new: true,
    });
    return result;
});
exports.EnrollStateService = {
    getEnrollState,
    createEnrollState,
    updateEnrollState,
};
