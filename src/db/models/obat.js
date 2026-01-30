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
      // define association here
      Obat.hasMany(models.Laporan, {
        foreignKey: "obatId",
        as: "laporan",
      });
    }
  }
  Obat.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nama_obat: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      stok: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      kategori: {
        type: DataTypes.ENUM(
          "obat_bebas",
          "obat_bebas_terbatas",
          "obat_keras",
          "psikotropika",
        ),
        allowNull: false,
      },
      foto_obat: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Obat",
      tableName: "obat",
      timestamps: true,
    },
  );
  return Obat;
};
