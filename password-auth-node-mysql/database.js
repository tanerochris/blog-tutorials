// database.js
const mysql = require('mysql2');
// create the connection pool
const promisePool = mysql.createPool({
  host: 'localhost',
  user: 'root', // user
  database: 'node_sql_login', // database name
  password: 'root' // mariadb password
});

module.exports = { promisePool: promisePool.promise() }