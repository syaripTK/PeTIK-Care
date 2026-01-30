const db = require("../db/models/index.js");
const { Laporan } = db;

const ubahLaporan = async (id, body) => {
  const data = await Laporan.findByPk(id);
  await data.update(body);
  return data;
};

module.exports = { ubahLaporan };
