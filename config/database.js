const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
module.exports = new Sequelize('shopping_list', 'postgres', 'Milky5way$', {
  host: 'localhost',
  dialect: 'postgres',
  protocol: 'postgres'
});
