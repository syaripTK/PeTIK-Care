'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('user', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    });
    
    await queryInterface.changeColumn('user', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    });
    
    await queryInterface.changeColumn('obat', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    });
    
    await queryInterface.changeColumn('obat', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('user', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false
    });
    
    await queryInterface.changeColumn('user', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false
    });
    
    await queryInterface.changeColumn('obat', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false
    });
    
    await queryInterface.changeColumn('obat', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false
    });
  }
};
