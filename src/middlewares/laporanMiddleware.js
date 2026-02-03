const db = require("../db/models");

const { Laporan, Obat } = db;

const { resGagal } = require("../helpers/payloads");

const validateCreateLaporan = (req, res, next) => {
  const { keluhan, obatId } = req.body;

  if (!keluhan || !obatId) {
    return resGagal(res, 400, "keluhan dan obatId wajib diisi");
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
  cekIptObatId,
};
