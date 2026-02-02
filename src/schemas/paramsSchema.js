const { z } = require("zod");

module.exports = z.object({
  id: z
    .string()
    .min(1, "Id harus diisi")
    .regex(/^[0-9]+$/, "Id harus berupa angka!")
    .transform(Number),
});
