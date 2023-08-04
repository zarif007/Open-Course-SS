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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollStateController = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const enrollState_service_1 = require("./enrollState.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const getEnrollState = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, course } = req.query;
    let result = null;
    if (typeof user === 'string' && typeof course === 'string') {
        result = yield enrollState_service_1.EnrollStateService.getEnrollState(user, course);
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'State fetched successfully !',
        data: result,
    });
}));
const createEnrollState = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const enrollState = req.body;
    const result = yield enrollState_service_1.EnrollStateService.createEnrollState(enrollState);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'State created successfully !',
        data: result,
    });
}));
exports.EnrollStateController = {
    getEnrollState,
    createEnrollState
};
