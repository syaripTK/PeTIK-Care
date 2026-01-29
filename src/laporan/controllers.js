const {
  tampilLaporan,
  tampilLaporanId,
  tambahLaporan,
  hapusLaporan,
} = require("./services.js");

const { resSukses, resGagal } = require("../helpers/payloads.js");

const createLaporan = async (req, res) => {
  try {
    const { keluhan, userId, obatId } = req.body;
    const body = { keluhan, userId, obatId };
    const data = await tambahLaporan(body);
    return resSukses(res, 201, "Data laporan berhasil ditambahkan", data);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const getLaporan = async (req, res) => {
  try {
    const data = await tampilLaporan();
    return resSukses(res, 200, "Data Laporan", data);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const getLaporanById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await tampilLaporanId(id);
    return resSukses(res, 200, "Data Laporan By Id", data);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const deleteLaporan = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await hapusLaporan(id);
    return resSukses(res, 200, "Data laporan berhasil di hapus", data);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

module.exports = { createLaporan, getLaporan, getLaporanById, deleteLaporan };
