import connection from "../db/mysql.js";

async function getUsers() {
  const result = await connection
    .promise()
    .query("SELECT id, username, activated FROM users");

  return result[0];
}

async function postUser(user) {
  console.log("userService");
  console.log("postUser called!");
  const result = await connection
    .promise()
    .query(
      "INSERT INTO users (username, password, activated) VALUES (?, ?, ?)",
      [user.username, user.password, user.activated]
    );

  console.log(result);

  return result;
}

export default { getUsers, postUser };
