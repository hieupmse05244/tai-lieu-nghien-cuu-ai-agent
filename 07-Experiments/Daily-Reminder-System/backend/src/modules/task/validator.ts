const z = require('zod').z;

// Use require if import fails in some environments, but export normally
export const taskRotationSchema = z.object({
  taskId: z.string().optional(),
});

export const validateTaskRotationInput = (data: any) => {
  return taskRotationSchema.parse(data);
};
