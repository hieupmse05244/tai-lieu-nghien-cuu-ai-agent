"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/:taskId/rotate', auth_middleware_1.authMiddleware, (req, res) => controller_1.TaskController.rotateTask(req, res));
exports.default = router;
