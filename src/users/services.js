const { User } = require("../db/models/index.js");

const createUser = async (body) => {
  return await User.create(body);
};

const getUser = async () => {
  return await User.findAll({
    attributes: {
      exclude: ["password"],
    },
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
      exclude: ["password"],
    },
  });
};

const findByRole = async (role) => {
  return await User.findAll({
    where: { role },
  });
};

module.exports = {
  createUser,
  getUser,
  findByEmail,
  findById,
  findByRole,
};
