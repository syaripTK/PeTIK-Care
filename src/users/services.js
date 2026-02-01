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
const findId = async (id) => {
  return await User.findByPk(id);
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

const editPassword = async (email, body) => {
  const user = await findByEmail(email);
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
  findId
};
