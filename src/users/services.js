const { User, Laporan } = require("../db/models/index.js");

const createUser = async (body) => {
  return await User.create(body);
};

const getUser = async () => {
  return await User.findAll({
    attributes: {
      exclude: ["password"],
    },
    include: [
      {
        model: Laporan,
        as: "laporan",
        attributes: ["keluhan", "tanggapan"],
      },
    ],
  });
};

const findByEmail = async (email) => {
  return await User.findOne({
    where: { email },
  });
};

const findById = async (id) => {
  return await User.findByPk(id, {
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
  });
};

const findByRole = async (role) => {
  return await User.findAll({
    where: { role },
  });
};

const remove = async (id) => {
  return await User.destroy({
    where: { id },
  });
};

const editPassword = async (id, body) => {
  const user = await User.findByPk(id);
  await user.update(body);
  return user;
};

module.exports = {
  createUser,
  getUser,
  findByEmail,
  findById,
  findByRole,
  remove,
  editPassword,
};
