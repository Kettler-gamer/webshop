import connection from "../db/mysql.js";

async function getItems() {
  const sql = "SELECT itemname, quantity, price, type, image FROM items";

  const result = await connection.promise().query(sql);

  return result;
}

async function searchItems(filters) {
  const sql = "SELECT itemname, quantity, price, type, image FROM items WHERE ";

  const filterSQLArr = [];
  const searchValues = [];
  filters.forEach((filter) => {
    filterSQLArr.push(`${filter.column} ${filter.operator}`);
    searchValues.push(filter.value);
  });

  const finalSQL = sql + filterSQLArr.join(" AND ");

  const result = await connection.promise().query(finalSQL, searchValues);

  return result;
}

async function addItem(item) {
  const sql = `INSERT INTO items (itemName, quantity, price, type${
    item.length === 5 ? ", image" : ""
  }) VALUES (?,?,?,?${item.length === 5 ? ", ?" : ""})`;

  const result = await connection.promise().query(sql, item);

  return result;
}

async function getItemsQuantity(items) {
  const sql = "SELECT itemname, quantity FROM items WHERE ";
  const itemNames = items.map((item) => item.itemname);
  const itemsSql = itemNames.map(() => "itemname = ?").join(" OR ");

  const finalSql = sql + itemsSql;
  const result = await connection.promise().query(finalSql, itemNames);
  return result[0];
}

async function purchaseItems(items, itemsFromDb, username) {
  const itemQtyUpdateTemplate = `UPDATE items SET quantity = ?qty? WHERE itemname = "?itemname?"`;

  const sql =
    itemsFromDb
      .map((item, index) =>
        itemQtyUpdateTemplate
          .replace("?qty?", `${item.quantity - items[index].quantity}`)
          .replace("?itemname?", `${item.itemname}`)
      )
      .join("; \n") + ";\n";

  const date = new Date().toLocaleString();

  const orderSql = `INSERT INTO orders (date) VALUES ("${date}");\n`;

  const userOrdersSql = `INSERT INTO userorders (userID, orderID) SELECT users.id, max(orders.id) FROM users INNER JOIN orders WHERE users.username = "${username}";\n`;

  const orderitemsSqltemplate = `INSERT INTO orderitems (orderID, itemID, amount) SELECT max(orders.id), items.id, ? FROM orders INNER JOIN items WHERE items.itemname = ?;\n`;

  const orderItemsSql = items.map(() => orderitemsSqltemplate).join("");

  const itemValues = items.map((item) => [item.quantity, item.itemname]).flat();

  const finalSQL = sql + orderSql + userOrdersSql + orderItemsSql;

  const result = await connection
    .promise()
    .query(finalSQL.replaceAll("\n", ""), itemValues);

  return result[0];
}

async function updateItemImage(itemname, image) {
  const sql = "UPDATE items SET image = ? WHERE itemname = ?";

  const result = await connection.promise().query(sql, [image, itemname]);

  return result;
}

export default {
  getItems,
  searchItems,
  addItem,
  getItemsQuantity,
  purchaseItems,
  updateItemImage,
};
