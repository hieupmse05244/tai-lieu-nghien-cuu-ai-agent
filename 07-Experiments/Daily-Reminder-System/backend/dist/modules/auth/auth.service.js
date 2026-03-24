"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = require("../user/user.repository");
const env_1 = require("../../config/env");
const errors_1 = require("../../utils/errors");
class AuthService {
    async register(username, password, email) {
        const existingUser = await user_repository_1.UserRepository.findUserByUsername(username);
        if (existingUser)
            throw new errors_1.AppError('Username already exists', 400, 'USER_EXISTS');
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        // Assuming UserModel.create or similar
        // For now, minimal logic
        return { username, email };
    }
    async login(username, password) {
        const user = await user_repository_1.UserRepository.findUserByUsername(username);
        if (!user || !(await bcryptjs_1.default.compare(password, user.passwordHash))) {
            throw new errors_1.AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, username: user.username }, env_1.env.JWT_SECRET, {
            expiresIn: '24h'
        });
        return token;
    }
}
exports.default = AuthService;
