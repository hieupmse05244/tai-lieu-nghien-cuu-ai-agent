"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTaskRotationInput = exports.taskRotationSchema = void 0;
const z = require('zod').z;
// Use require if import fails in some environments, but export normally
exports.taskRotationSchema = z.object({
    taskId: z.string().optional(),
});
const validateTaskRotationInput = (data) => {
    return exports.taskRotationSchema.parse(data);
};
exports.validateTaskRotationInput = validateTaskRotationInput;
