"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Refresh_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Refresh_tokens.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Refresh_tokens",
      tableName: "refresh_token",
      timestamps: false,
    },
  );
  return Refresh_tokens;
};
