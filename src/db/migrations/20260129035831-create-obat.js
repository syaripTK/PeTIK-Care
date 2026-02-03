'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('obat', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_obat: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      stok: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      kategori: {
        type: Sequelize.ENUM('obat-bebas', 'obat-terbatas', 'obat-keras', 'psikotropika'),
        allowNull: false
      },
      foto_obat: {
<<<<<<< HEAD
        type: Sequelize.STRING
=======
        type: Sequelize.STRING,
>>>>>>> main
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('obat');
  }
};