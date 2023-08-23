import mysql from "mysql2";

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  multipleStatements: true,
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to database!");
    connection.query(`use ${process.env.DATABASE}`, (error, result) => {
      if (error) {
        console.log(error);
      }
    });
  }
});

export default connection;
