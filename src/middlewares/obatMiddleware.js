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

const validateUpdateStok = (req, res, next) => {
  if (!req.body) {
    return resGagal(res, 400, "Request body tidak boleh kosong");
  }

  const { stok } = req.body;

  if (stok === undefined) {
    return resGagal(res, 400, "stok wajib diisi");
  }

  const stokNumber = Number(stok);

  if (Number.isNaN(stokNumber) || stokNumber < 0) {
    return resGagal(res, 400, "stok harus berupa angka positif");
  }

  req.body.stok = stokNumber;
  next();
};

const validateObat = async (req, res, next) => {
  try {
    const { nama_obat, stok, kategori } = req.body;

    if (!nama_obat || stok === undefined || !kategori) {
      return resGagal(res, 400, "nama_obat, stok, dan kategori wajib diisi");
    }

    if (nama_obat.length > 50) {
      return resGagal(res, 400, "nama_obat maksimal 50 karakter");
    }

    const obatExist = await Obat.findOne({ where: { nama_obat } });

    if (obatExist) {
      return resGagal(res, 409, "Nama obat sudah terdaftar");
    }

    const stokNumber = typeof stok === "string" ? parseInt(stok) : stok;

    if (Number.isNaN(stokNumber) || stokNumber < 0) {
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
  validateUpdateStok,
};
