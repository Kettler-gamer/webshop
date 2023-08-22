import connection from "../db/mysql.js";

async function addItem(item) {
  const sql =
    "INSERT INTO items (itemName, quantity, price, type) VALUES (?,?,?,?)";

  const result = await connection.promise().query(sql, item);

  return result;
}

export default { addItem };
