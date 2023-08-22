import connection from "../db/mysql.js";

async function getItems() {
  const sql = "SELECT itemname, quantity, price, type FROM items";

  const result = await connection.promise().query(sql);

  return result;
}

async function addItem(item) {
  const sql =
    "INSERT INTO items (itemName, quantity, price, type) VALUES (?,?,?,?)";

  const result = await connection.promise().query(sql, item);

  return result;
}

export default { getItems, addItem };
