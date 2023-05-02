const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Transfer = db.define('transfers', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
    type: DataTypes.INTEGER,
  },

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  senderUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  receiverUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Transfer;
