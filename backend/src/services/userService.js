import connection from "../db/mysql.js";

async function getUsers() {
  const result = await connection
    .promise()
    .query("SELECT id, username, activated FROM users");

  return result[0];
}

async function postUser(user) {
  const result = await connection
    .promise()
    .query("INSERT INTO users (username, password, activated) values ?", user);

  return result;
}

export default { getUsers, postUser };
