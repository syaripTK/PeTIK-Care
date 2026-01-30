"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("obat", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_obat: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      stok: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kategori: {
        type: Sequelize.ENUM(
          "obat-bebas",
          "obat-bebas-terbatas",
          "obat-keras",
          "psikotropika",
        ),
        allowNull: false,
      },
      foto_obat: {
        type: Sequelize.STRING,
      },
      stok: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      kategori: {
        type: Sequelize.ENUM(
          "obat_bebas",
          "obat_bebas_terbatas",
          "obat_keras",
          "psikotropika",
        ),
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("obat");
  },
};
