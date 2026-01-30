"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('laporan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tgl: {
        type: Sequelize.DATE,
        allowNull: false
      },
      keluhan: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      obatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'obat',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tanggapan: {
        type: Sequelize.ENUM('ditangani', 'ditolak', 'dirujuk', 'pending'),
        allowNull: false
      },
      tanggal: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
        allowNull: false,
      },
      obatId: {
        type: Sequelize.INTEGER,
        references: {
          model: "obat",
          key: "id",
        },
        allowNull: false,
      },
      tanggapan: {
        type: Sequelize.ENUM("ditangani", "ditolak", "dirujuk", "pending"),
        allowNull: false,
        defaultValue: "pending",
      },
      tanggal: {
        type: Sequelize.DATE,
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      tanggapan: {
        type: Sequelize.ENUM("ditangani", "ditolak", "dirujuk", "pending"),
        defaultValue: "pending",
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      obatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "obat",
          key: "id",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("laporan");
  },
};
