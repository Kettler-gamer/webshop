import connection from "../db/mysql.js";

async function getUser(username) {
  const sql =
    "SELECT username, password, activated, role FROM users WHERE username = ? LIMIT 1";

  const result = await connection.promise().query(sql, [username]);

  return result[0];
}

export default { getUser };
