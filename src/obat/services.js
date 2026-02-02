const { where, Op } = require("sequelize");
const db = require("../db/models/index.js");
const { Obat } = db;

const tampilObat = async () => {
  return await Obat.findAll();
};

const tambahObat = async (body) => {
  return await Obat.create(body);
};

const cariIdObat = async (id) => {
  return await Obat.findByPk(id);
};

const ubahObat = async (id, body) => {
  return Obat.update(body, {
    where: { id },
  });
};

const hapusObat = async (id) => {
  const result = await Obat.destroy({
    where: { id },
  });
  return result;
};

const cariNamaObat = async (nama) => {
  return await Obat.findAll({
    where: {
      nama_obat: {
        [Op.like]: `%${nama}%`,
      },
    },
  });
};

module.exports = {
  tampilObat,
  tambahObat,
  cariIdObat,
  ubahObat,
  hapusObat,
  cariNamaObat,
};
