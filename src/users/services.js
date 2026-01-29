const {where} = require("sequelize");
const db = require("../db/models/index.js");
const {User} = db;
const bcrypt = require("bcrypt");

const tampilOrang = async () => {
    return await User.findAll();
};

const tambahUser = async (body) => {
    if (!body.password) {
        throw new Error("Password is required");
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    return await User.create({
        ...body,
        password: hashedPassword
    });
};

const cariId = async (id) => {
    return await User.findByPk(id);
};

const ubahUser = async (id, body) => {
    if (body.password) {
        if (typeof body.password !== 'string' || body.password.trim() === '') {
            throw new Error("Password must be a non-empty string");
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;
    }
    return User.update(body, {
        where: { id }
    });
};

const hapusUser = async (id) => {
    const result = await User.destroy({
        where: { id }
    });
    return result;
}

module.exports = {
    tampilOrang,
    tambahUser,
    cariId,
    ubahUser,
    hapusUser
}