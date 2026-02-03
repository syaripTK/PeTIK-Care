const db = require("../db/models");
const { Laporan, User, Obat } = db;
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

const cekIptUserId = async (req, res, next) => {
  const { userId } = req.body;
  const data = await User.findByPk(userId);
  if (data === null) {
    return resGagal(res, 404, "Maaf, userId tidak ditemukan");
  }
  next();
};

const cekIptObatId = async (req, res, next) => {
  const { obatId } = req.body;
  const data = await Obat.findByPk(obatId);
  if (data === null) {
    return resGagal(res, 404, "Maaf, obatId tidak ditemukan");
  }
  next();
};

module.exports = {
  validateCreateLaporan,
  checkIdLaporan,
  cekIptUserId,
  cekIptObatId,
};
