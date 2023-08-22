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

  console.log(finalSQL);

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

export default { getItems, searchItems, addItem };
