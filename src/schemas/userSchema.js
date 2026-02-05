const { z } = require("zod");

const changeSchema = z.object({
  oldPassword: z.string().min(1, "Old password tidak boleh kosong"),
  newPassword: z.string().min(1, "New password tidak boleh kosong"),
  confirmNewPassword: z
    .string()
    .min(1, "Konfirmasi password tidak boleh kosong"),
});

const tokenSchema = z.object({
  refreshToken: z.string().min(1, "Token tidak boleh kosong"),
});

module.exports = { changeSchema, tokenSchema };
