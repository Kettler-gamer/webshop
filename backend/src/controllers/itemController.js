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

function addItem(req, res) {
  const { itemName, quantity, price, type } = req.body;

  if (!itemName || !quantity || !price || !type) {
    res.status(400).send({ message: "Bad parameters!" });
  }

  const item = [itemName, quantity, price, type];

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

export default { getItems, addItem };
