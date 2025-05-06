const knex = require('knex');
const config = require('./configuration');

const db = knex({
  client: 'mysql2',
  connection: {
    host: config.db.host,
    port: config.db.port || 3306,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  }
});

module.exports = db;
