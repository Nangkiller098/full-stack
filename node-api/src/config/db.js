var mysql = require(`mysql`);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "full_stack",
  port: 3306,
});
module.exports = db;
