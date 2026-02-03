const { User, Laporan, Refresh_tokens } = require("../db/models/index.js");

const createUser = async (body) => {
  return await User.create(body);
};

const createRefresh = async (body) => {
  return await Refresh_tokens.create(body);
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

const findByToken = async (token) => {
  return await Refresh_tokens.findOne({
    where: { token },
  });
};

const remove = async (id) => {
  return await User.destroy({
    where: { id },
  });
};

const removeToken = async (token) => {
  return await Refresh_tokens.destroy({
    where: { token },
  });
};

const removeTokenByUser = async (userId) => {
  return await Refresh_tokens.destroy({
    where: { userId },
  });
};

const editPassword = async (id, body) => {
  const user = await findId(id);
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
  findId,
  createRefresh,
  findByToken,
  removeToken,
  removeTokenByUser,
};
