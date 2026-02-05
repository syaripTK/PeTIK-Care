const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string("Email harus berupa string!")
    .refine((val) => val.length > 0, {
      message: "Email tidak boleh kosong. ",
    })
    .refine(
      (val) => val.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      {
        message: "Email tidak valid",
      },
    ),
  password: z
    .string()
    .min(1, "Password tidak boleh kosong")
    .max(25, "Password terlalu panjang, maksimal 25 karakter"),
});

const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Username tidak boleh kosong")
    .max(25, "Username terlalu panjang, maksimal 25 karakter"),
  email: z
    .string()
    .refine((val) => val.length > 0, {
      message: "Email tidak boleh kosong. ",
    })
    .refine(
      (val) => val.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      {
        message: "Email tidak valid",
      },
    ),
  password: z.string().nonempty("Password tidak boleh kosong"),
});

module.exports = {
  loginSchema,
  registerSchema,
};
