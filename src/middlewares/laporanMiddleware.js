const db = require("../db/models");
const { Laporan } = db;
const { resGagal } = require("../helpers/payloads");

const validateCreateLaporan = (req, res, next) => {
  const { keluhan, userId, obatId } = req.body;

  if (!keluhan || !userId || !obatId) {
    return resGagal(res, 400, "keluhan, userId, dan obatId wajib diisi");
  }

  next();
};

const checkIdLaporan = async (req, res, next) => {
  const id = req.params.id;
  const laporan = await Laporan.findByPk(id);

  if (!laporan) {
    return resGagal(res, 404, "Data laporan tidak ditemukan");
  }

  req.laporan = laporan;
  next();
};

module.exports = {
  validateCreateLaporan,
  checkIdLaporan,
};
