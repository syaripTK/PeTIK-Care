"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Obat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Obat.hasMany(models.Laporan, { 
        foreignKey: 'obatId',
        as: 'laporan'
      });
    }
  }
  Obat.init({
    nama_obat: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    stok: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kategori: {
      type: DataTypes.ENUM('obat-bebas', 'obat-terbatas', 'obat-keras', 'psikotropika'),
      allowNull: false
    },
    foto_obat: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Obat',
    tableName: 'obat'
  });
  return Obat;
};
