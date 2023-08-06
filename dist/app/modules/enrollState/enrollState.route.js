"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollStateRoutes = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = require("express");
const enrollState_controller_1 = require("./enrollState.controller");
const router = (0, express_1.Router)();
router.get('/', enrollState_controller_1.EnrollStateController.getEnrollState);
router.post('/', enrollState_controller_1.EnrollStateController.createEnrollState);
router.put('/', enrollState_controller_1.EnrollStateController.updateEnrollState);
exports.EnrollStateRoutes = router;
