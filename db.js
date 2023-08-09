const mysql = require('mysql2/promise');

// Use the promise interface for creating the database connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'users_db',
});

module.exports = db;
