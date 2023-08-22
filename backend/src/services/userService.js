import connection from "../db/mysql.js";

async function getUsers() {
  const test = await connection
    .promise()
    .query("SELECT id, username, activated FROM users");

  return test[0];
}

export default { getUsers };
