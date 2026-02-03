"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "laporan",
      [
        {
          keluhan: "Sakit Kepala",
          userId: 1,
          obatId: 1,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("laporan", null, {});
  },
};
