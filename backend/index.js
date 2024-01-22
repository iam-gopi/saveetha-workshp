const mysql = require("mysql");
const express = require("express");

const app = express();
app.use(express.json());

app.listen(4000, () => {
  console.log("connection established on port: 4000");
});

const connection = mysql.createConnection({
  host: "localhost",
  database: "saveetha",
  user: "root",
  password: "",
  port: 3306,
  multipleStatements: true,
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
    console.log("error occurred while connecting");
  } else {
    console.log("connection created with Mysql successfully");
  }
});

app.post("/register", (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;
  const i = `insert into user (name, email) values('${name}', '${email}')`;
  connection.query(i, function (err, result) {
    if (err) {
      console.log("An error occurred.");
    } else {
      console.log("1 record successfully inserted into db");
    }
  });
  res.send("registration successful");
});
