import connection from "../db/mysql.js";

async function getUser(username, role) {
  const sql =
    "SELECT id, username, password FROM users WHERE username = ? AND activated = 1 AND role = ? LIMIT 1";
  const result = await connection.promise().query(sql, [username, role]);

  return result[0];
}

async function getUsers() {
  const sql = "SELECT id, username, activated FROM users";
  const result = await connection.promise().query(sql);

  return result[0];
}

async function postUser(user) {
  const sql =
    "INSERT INTO users (username, password, activated) VALUES (?, ?, ?)";
  const result = await connection.promise().query(sql, Object.values(user));

  return result;
}

async function updateUserPassword(username, newPassword) {
  const sql = "UPDATE users SET password = ? WHERE username = ?";
  const result = await connection.promise().query(sql, [newPassword, username]);

  return result;
}

export default { getUser, getUsers, postUser, updateUserPassword };
