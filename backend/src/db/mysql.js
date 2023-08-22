import mysql from "mysql2";

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABSE,
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to database!");
  }
});

export default connection;
