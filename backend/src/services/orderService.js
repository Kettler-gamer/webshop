import connection from "../db/mysql.js";

async function getOrders(username) {
  const sql = `select orders.id, userorders.userID, orders.date, items.itemName, orderitems.amount, items.price from orders 
  inner join userorders 
  inner join orderItems
  inner join items
  where userorders.orderID = orders.id and userorders.userID = (select id from users where username = ?)
  and userorders.orderID = orderItems.orderID and orderItems.itemID = items.id;`;

  const result = await connection.promise().query(sql, username);

  return result[0];
}

export default { getOrders };
