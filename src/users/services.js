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

module.exports = {
  createUser, getUser
};
