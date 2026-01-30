"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bcrypt = require("bcrypt");
    const hashPw = await bcrypt.hash("bismillah", 10)
    await queryInterface.bulkInsert(
      "user",
      [
        {
          username: "Admin",
          password: hashPw,
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
