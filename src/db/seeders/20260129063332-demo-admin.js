"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bcrypt = require("bcrypt");
    const hashPw = await bcrypt.hash("bismillah", 10);
    const pwUser = await bcrypt.hash("password", 10);
    await queryInterface.bulkInsert(
      "user",
      [
        {
          username: "User Dummy",
          password: pwUser,
          email: "userdummy1@gmail.com",
          role: "user",
        },
        {
          username: "Admin",
          password: hashPw,
          email: "admin@gmail.com",
          role: "admin",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user", null, {});
  },
};
