const {where} = require("sequelize");
const db = require("../db/models/index.js");
const {User} = db;

const tampilOrang = async () => {
    return await User.findAll();
};

const tambahUser = async () => {
    return await User.create(body);
};

const cariId = async (id) => {
    return await User.findByPk(id);
};

const ubahUser = async (id, body) => {
    const user = await cariId(id);
    return User.update(body);
};

const hapusUser = async () => {
    const result = await User.destroy({
        where: id
    })
}