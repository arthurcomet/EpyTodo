const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  database: process.env.MYSQL_DATABASE || "EPYTODO_TABLE",
  password: process.env.MYSQL_PASSWORD || "ChatMilton33!"
})

module.exports = pool;
