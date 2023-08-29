'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = require('mongoose');
exports.UserSchema = new mongoose_1.Schema({
  externalId: {
    type: String,
    required: [true, 'External ID is required'],
  },
  attributes: {
    type: Object,
    default: {},
  },
  role: {
    type: String,
    default: 'user',
  },
  preferences: {
    type: [String],
    default: [],
  },
});
exports.User = (0, mongoose_1.model)('User', exports.UserSchema);
