//łączymy się z bazą danych! :D

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    database: "blog",
    user: "root",
    password: "tu_twoje_haslo!"
});

module.exports = pool;

