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
      // define association here
      Laporan.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Laporan.belongsTo(models.Obat, {
        foreignKey: "obatId",
        as: "obat",
      });
    }
  }
  Laporan.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      keluhan: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tanggal: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tanggapan: {
        type: DataTypes.ENUM("ditangani", "ditolak", "dirujuk", "pending"),
        defaultValue: "pending",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Laporan",
      tableName: "laporan",
      timestamps: true,
    },
  );
  return Laporan;
};
