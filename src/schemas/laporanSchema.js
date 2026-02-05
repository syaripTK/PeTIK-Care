const { z } = require("zod");

const laporanSchema = z.object({
  keluhan: z.string().nonempty("Keluhan tidak boleh kosong"),
  obatId: z.coerce
    .number({
      invalid_type_error: "obatId harus berupa angka",
      required_error: "obatId wajib diisi",
    })
    .int("obatId harus bilangan bulat")
    .min(1, "obatId harus lebih dari 0"),
});

const updateLaporanSchema = z.object({
  tanggapan: z
    .string()
    .refine((val) => val.length > 0, {
      message: "Tanggapan tidak boleh kosong",
    })
    .refine(
      (val) => val.length === 0 || /^(ditangani|ditolak|dirujuk)$/.test(val),
      {
        message:
          "Tanggapan harus berisikan ditangani atau ditolak atau dirujuk!",
      },
    ),
});

module.exports = { laporanSchema, updateLaporanSchema };
