const { z } = require("zod");

const idParamsSchema = z.object({
  id: z
    .string()
    .regex(/^[0-9]+$/, "Id harus berupa angka!")
    .transform(Number),
});

module.exports = idParamsSchema;
