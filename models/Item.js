const db = require('../config/database');
const Sequelize = require('sequelize');

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: Sequelize.DATEONLY,
  updatedAt: Sequelize.DATEONLY
});

module.exports = Item;
