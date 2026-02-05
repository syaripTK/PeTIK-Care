const { z } = require("zod");

const createObatSchema = z.object({
  nama_obat: z.string().nonempty("Nama obat tidak boleh kosong"),
  stok: z.coerce
    .number("Stok harus berupa angka")
    .int("Stok harus bilangan bulat")
    .min(1, "Stok tidak boleh kosong"),
  kategori: z
    .string()
    .refine((val) => val.length > 0, {
      message: "Kategori tidak boleh kosong. ",
    })
    .refine(
      (val) =>
        val.length === 0 ||
        /^(obat-bebas|obat-terbatas|obat-keras|psikotropika)$/.test(val),
      {
        message: "Kategori tidak valid",
      },
    ),
});

const updateObatSchema = z.object({
  stok: z.coerce
    .number({
      invalid_type_error: "Stok harus berupa angka",
    })
    .int("Stok harus bilangan bulat")
    .min(1, "Stok tidak valid"),
});

module.exports = {
  createObatSchema,
  updateObatSchema,
};
