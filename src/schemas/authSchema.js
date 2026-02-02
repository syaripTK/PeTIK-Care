const { z } = require("zod");

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z
    .string()
    .min(6, "Password minimal berisi 6 karakter")
    .max(25, "Password terlalu panjang, maksimal 25 karakter"),
});

const registerSchema = z.object({
  username: z
    .string()
    .min(5, "Username minimal 5 karakter")
    .max(25, "Username terlalu panjang, maksimal 25 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

module.exports = {
  loginSchema,
  registerSchema,
};
