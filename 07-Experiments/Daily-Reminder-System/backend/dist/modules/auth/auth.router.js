"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const auth_service_1 = __importDefault(require("./auth.service"));
const router = (0, express_1.Router)();
const authService = new auth_service_1.default();
const authController = new auth_controller_1.default(authService);
router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));
exports.default = router;
