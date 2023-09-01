"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const course_constants_1 = require("./course.constants");
const CourseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    type: {
        type: String,
        enum: course_constants_1.courseTypes,
        default: 'gn',
    },
    version: {
        type: Number,
        default: 1,
    },
    enabled: {
        type: Boolean,
        default: true,
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required'],
    },
    contributors: {
        type: [String],
        default: [],
    },
    enrolledUsers: {
        type: [String],
        default: [],
    },
    categories: {
        type: [String],
        default: [],
    },
    levels: {
        type: [String],
        default: [],
    },
    languages: {
        type: [String],
        default: [],
    },
    description: {
        type: String,
        default: '',
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
    },
    banner: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: course_constants_1.courseStatuses,
        default: 'published',
    },
    topics: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'CourseTopic',
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
    ratings: {
        type: [
            {
                user: String,
                rating: Number,
            },
        ],
        default: [],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// CourseSchema.pre('save', function (next) {
//   this.contributors = [this.creator];
//   next();
// });
exports.Course = (0, mongoose_1.model)('Course', CourseSchema);
