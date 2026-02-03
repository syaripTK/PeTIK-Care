"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "obat",
      [
        {
          id: 1,
          nama_obat: "Paracetamol",
          stok: 22,
          kategori: "obat-bebas",
          foto_obat: "foto_obat-1770089898491-113919026.jpeg",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("obat", null, {});
  },
};
