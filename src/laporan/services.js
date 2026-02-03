const db = require("../db/models/index.js");
const { Laporan, User, Obat } = db;

const tampilLaporan = async () => {
  return await Laporan.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
      {
        model: Obat,
        as: "obat",
        attributes: ["nama_obat", "kategori"],
      },
    ],
  });
};

const tampilLaporanId = async (id) => {
  return await Laporan.findByPk(id, {
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
      {
        model: Obat,
        as: "obat",
        attributes: ["nama_obat", "kategori"],
      },
    ],
  });
};

const tambahLaporan = async (body) => {
  return await Laporan.create(body);
};

const hapusLaporan = async (id) => {
  const data = await Laporan.findByPk(id);
  await data.destroy();
};

module.exports = {
  tampilLaporan,
  tampilLaporanId,
  tambahLaporan,
  hapusLaporan,
};
