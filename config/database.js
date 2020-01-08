const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
module.exports = new Sequelize('shopping_list', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  protocol: 'postgres'
});

// 'shopping_list', 'postgres', 'postgres'
// process.env.DATABASE_URL
// localhost