const { createPool } = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_tracker",
});

connection.connect();

connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});

connection.end();
