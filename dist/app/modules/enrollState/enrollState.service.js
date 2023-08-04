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
const enrollState_model_1 = require("./enrollState.model");
const getEnrollStateByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield enrollState_model_1.EnrollState.findOne({ userId }).populate('currentTopic');
    return result;
});
const getEnrollStateByCourseId = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield enrollState_model_1.EnrollState.findOne({ courseId }).populate('currentTopic');
    return result;
});
const createEnrollState = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield enrollState_model_1.EnrollState.create(payload);
    yield result.populate('currentTopic');
    return result;
});
const updateEnrollStateByUserId = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield enrollState_model_1.EnrollState.findOneAndUpdate({ userId }, payload, {
        new: true,
    });
    return result;
});
exports.EnrollStateService = {
    getEnrollStateByUserId,
    getEnrollStateByCourseId,
    createEnrollState,
    updateEnrollStateByUserId,
};
