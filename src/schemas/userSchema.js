const { z } = require("zod");

const changeSchema = z.object({
  email: z.string().email("Email tidak valid"),
  passwordLama: z.string().min(1, "Password tidak boleh kosong"),
  passwordBaru: z
    .string()
    .min(6, "Password minimal berisi 6 karakter")
    .max(25, "Password terlalu panjang, maksimal 25 karakter"),
});

const tokenSchema = z.object({
  refreshToken: z.string().min(1, "Token tidak boleh kosong"),
});

module.exports = { changeSchema, tokenSchema };
