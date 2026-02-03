const { resGagal } = require("../helpers/payloads.js");
const db = require("../db/models");
const { Obat } = db;

const checkIdObat = async (req, res, next) => {
  const id = req.params.id;
  const obat = await Obat.findByPk(id);

  if (!obat) {
    return resGagal(res, 404, "Data obat tidak ditemukan");
  }

  next();
};

const validateObat = (req, res, next) => {
  try {
    const { nama_obat, stok, kategori } = req.body;

    if (!nama_obat || !stok || !kategori) {
      return resGagal(res, 400, "nama_obat, stok, dan kategori wajib diisi");
    }

    if (nama_obat.length > 50) {
      return resGagal(res, 400, "nama_obat maksimal 50 karakter");
    }

    const stokNumber = typeof stok === "string" ? parseInt(stok) : stok;

    if (typeof stokNumber !== "number" || stokNumber < 0) {
      return resGagal(res, 400, "stok harus berupa angka positif");
    }

    const validCategories = [
      "obat-bebas",
      "obat-terbatas",
      "obat-keras",
      "psikotropika",
    ];
    if (!validCategories.includes(kategori)) {
      return resGagal(
        res,
        400,
        `kategori harus salah satu dari: ${validCategories.join(", ")}`,
      );
    }

    req.body.stok = stokNumber;

    next();
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

module.exports = {
  validateObat,
  checkIdObat,
};
