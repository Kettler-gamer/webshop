import itemService from "../services/itemService.js";

async function checkItemQuantity(req, res, next) {
  const { items } = req.body;

  if (items === undefined || !Array.isArray(items) || items.length === 0)
    return res.status(400).send({ message: "No items in the basket!" });

  for (let item of items) {
    if (isNaN(Number(item.quantity))) {
      return res.status(400).send({ message: "Quantity is not a number!" });
    }
  }

  const itemsFromDb = await itemService.getItemsQuantity(items);

  if (itemsFromDb.length !== items.length)
    return res
      .status(400)
      .send({ message: "You tried to purchase items that do not exist!" });

  for (let i = 0; i < items.length; i++) {
    if (items[i].quantity > itemsFromDb[i].quantity) {
      return res.status(400).send({
        message: `You tried to purchase ${items[i].quantity} copies of ${items[i].itemname} but there are only ${itemsFromDb[i].quantity} left in stock.`,
      });
    }
  }

  req.itemsFromDb = itemsFromDb;

  next();
}

export default { checkItemQuantity };
