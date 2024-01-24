// var mysql = require(`mysql`);

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "full_stack",
//   port: 3306,
// });
// module.exports = db;

const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "full_stack",
  port: 3306,
  connectionLimit: 10,
  namedPlaceholders: true,
});
module.exports = db;
