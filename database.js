import mysql from "mysql2"

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "yashdhingra",
  database: "lawhub",
});

con.connect(function (err) {
  if (err) throw err;
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result.length);
  });
});