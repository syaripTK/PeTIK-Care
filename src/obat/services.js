const { Op } = require("sequelize");
const db = require("../db/models/index.js");
const { Obat } = db;

const tampilObatAdmin = async () => {
  return await Obat.findAll();
};

const tampilObatUser = async () => {
  return await Obat.findAll({
    attributes: ["id", "nama_obat", "stok"],
  });
};

const tampilObatNama = async (nama_obat) => {
  return await Obat.findOne({
    where: { nama_obat },
  });
};

const tambahObat = async (body) => {
  return await Obat.create(body);
};

const cariIdObat = async (id) => {
  return await Obat.findByPk(id);
};

const ubahObat = async (id, body) => {
  return await Obat.update(body, {
    where: { id },
  });
};

const hapusObat = async (id) => {
  return await Obat.destroy({
    where: { id },
  });
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
  tampilObatAdmin,
  tampilObatUser,
  tambahObat,
  cariIdObat,
  ubahObat,
  hapusObat,
  cariNamaObat,
  tampilObatNama,
};
