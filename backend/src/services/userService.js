import connection from "../db/mysql.js";

function getUsers() {
  console.log(connection);
}

export default { getUsers };
