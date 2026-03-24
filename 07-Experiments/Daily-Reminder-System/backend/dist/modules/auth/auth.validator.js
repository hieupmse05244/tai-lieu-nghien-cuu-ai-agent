"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginInput = exports.RegisterInput = void 0;
exports.validateRegisterInput = validateRegisterInput;
exports.validateLoginInput = validateLoginInput;
const zod_1 = require("zod");
exports.RegisterInput = zod_1.z.object({
    username: zod_1.z.string().min(3),
    password: zod_1.z.string().min(6),
    email: zod_1.z.string().email()
});
exports.LoginInput = zod_1.z.object({
    username: zod_1.z.string().min(3),
    password: zod_1.z.string().min(6)
});
function validateRegisterInput(input) {
    exports.RegisterInput.parse(input);
}
function validateLoginInput(input) {
    exports.LoginInput.parse(input);
}
