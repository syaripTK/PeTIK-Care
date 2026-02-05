const db = require("../db/models/index.js");
const { Laporan } = db;

const ubahLaporan = async (id, body) => {
  const data = await Laporan.findByPk(id);
  await data.update(body);
  return data;
};

const tampilId = async (id) => {
  return await Laporan.findByPk(id);
};

module.exports = { ubahLaporan, tampilId };
