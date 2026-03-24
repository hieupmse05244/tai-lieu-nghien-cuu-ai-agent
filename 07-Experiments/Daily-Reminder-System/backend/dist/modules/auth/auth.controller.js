"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_validator_1 = require("./auth.validator");
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(req, res) {
        const input = req.body;
        try {
            (0, auth_validator_1.validateRegisterInput)(input);
            const user = await this.authService.register(input.username, input.password, input.email);
            res.status(201).json({ success: true, data: user });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    async login(req, res) {
        const input = req.body;
        try {
            (0, auth_validator_1.validateLoginInput)(input);
            const token = await this.authService.login(input.username, input.password);
            res.json({ success: true, data: { token } });
        }
        catch (error) {
            res.status(401).json({ success: false, message: error.message });
        }
    }
}
exports.default = AuthController;
