"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "obat",
      [
        {
          nama_obat: "Paracetamol",
          stok: 22,
          kategori: "obat-bebas",
          foto_obat: "foto_obat-1769698569857-132090587.jpeg",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("obat", null, {});
  },
};
