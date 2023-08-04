'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.userSchema = void 0;
// user.interface.ts
const mongoose_1 = require('mongoose');
exports.userSchema = new mongoose_1.Schema({
  id: String,
  fullName: String,
  imageUrl: String,
  email: String,
});
