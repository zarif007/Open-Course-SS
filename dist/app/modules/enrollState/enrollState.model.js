"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollState = void 0;
const mongoose_1 = require("mongoose");
const EnrollStateSchema = new mongoose_1.Schema({
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'The course ID is required'],
    },
    userId: {
        type: String,
        required: true,
    },
    currentTopic: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'courseTopic',
        required: [true, 'The topic ID is required'],
    },
    finishedCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.EnrollState = (0, mongoose_1.model)('EnrollState', EnrollStateSchema);
