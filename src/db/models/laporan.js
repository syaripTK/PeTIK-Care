"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Laporan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Laporan.belongsTo(models.User, { 
        foreignKey: 'userId',
        as: 'user'
      });
      Laporan.belongsTo(models.Obat, { 
        foreignKey: 'obatId',
        as: 'obat'
      });
    }
  }
  Laporan.init({
    tgl: {
      type: DataTypes.DATE,
      allowNull: false
    },
    keluhan: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    obatId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tanggapan: {
      type: DataTypes.ENUM('ditangani', 'ditolak', 'dirujuk', 'pending'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Laporan',
    tableName: 'laporan'
  });
  return Laporan;
};
