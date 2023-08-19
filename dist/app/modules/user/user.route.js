'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserRoutes = void 0;
const express_1 = require('express');
const user_controller_1 = require('./user.controller');
const router = (0, express_1.Router)();
router.get(
  '/byClerkId/:clerkId',
  user_controller_1.UserController.getUserByClerkId
);
router.post('/', user_controller_1.UserController.upsertUser);
exports.UserRoutes = router;
