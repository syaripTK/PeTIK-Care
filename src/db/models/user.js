'use strict';
const {
  Model
} = require('sequelize');
const laporan = require('./laporan');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Laporan, { 
        foreignKey: 'userId',
      as: laporan });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50)
    },
    role: {
      type: DataTypes.ENUM('admin', 'user')
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user'
  });
  return User;
};