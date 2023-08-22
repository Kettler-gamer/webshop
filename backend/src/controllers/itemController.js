import itemService from "../services/itemService.js";

function getItems(req, res) {
  itemService
    .getItems()
    .then((result) => {
      res.send(result[0]);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "Something went wrong!" });
    });
}

function searchItems(req, res) {
  const { itemname, priceGreater, priceLower, type, inStock } = req.query;

  const filters = [];

  if (itemname)
    filters.push({
      column: "itemname",
      value: itemname + "%",
      operator: "LIKE ?",
    });

  if (type) {
    filters.push({ column: "type", value: type, operator: "= ?" });
  }

  if (priceGreater) {
    filters.push({ column: "price", value: priceGreater, operator: "> ?" });
  }

  if (priceLower) {
    filters.push({ column: "price", value: priceLower, operator: "< ?" });
  }

  if (inStock) {
    filters.push({ column: "quantity", value: "", operator: "> 0" });
  }

  itemService
    .searchItems(filters)
    .then((result) => {
      res.send(result[0]);
    })
    .catch((error) => {
      console.log(error);
    });
}

function addItem(req, res) {
  const { itemName, quantity, price, type, image } = req.body;

  if (
    itemName === undefined ||
    quantity === undefined ||
    price === undefined ||
    type === undefined
  )
    return res.status(400).send({ message: "Bad parameters!" });

  const item = [itemName, quantity, price, type];

  if (image !== undefined) item.push(image);

  itemService
    .addItem(item)
    .then((result) => {
      if (result[0].affectedRows === 1) {
        res.status(201).send({ message: "The item was added!" });
      } else {
        throw new Error("Something went wrong!");
      }
    })
    .catch((error) => {
      console.log(error);
      switch (error.code) {
        case "WARN_DATA_TRUNCATED":
          res.status(400).send({ message: "Bad parameters!" });
          break;
        case "ER_DUP_ENTRY":
          res
            .status(400)
            .send({ message: "An item with that item name already exists!" });
          break;
        default:
          res.status(500).send({ message: "Something went wrong!" });
      }
    });
}

export default { getItems, searchItems, addItem };
