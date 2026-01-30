const {where} = require("sequelize");
const db = require("../db/models/index.js");
const {Obat} = db;

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
        where: { id }
    });
};

const hapusObat = async (id) => {
    const result = await Obat.destroy({
        where: { id }
    });
    return result;
}

module.exports = {
    tampilObat,
    tambahObat,
    cariIdObat,
    ubahObat,
    hapusObat
}