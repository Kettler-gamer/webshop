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

  filters.push({
    column: "itemname",
    value: "%" + escapeSearchInput(itemname || "") + "%",
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

  if (image !== undefined) {
    if (!isImage(image))
      return res
        .status(400)
        .send({ message: "Image provided is not in a supported format!" });
    item.push(image);
  }

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

function purchaseItems(req, res) {
  const { items } = req.body;
  const { itemsFromDb } = req;
  const { jwtPayload } = req;

  itemService
    .purchaseItems(items, itemsFromDb, jwtPayload.username)
    .then(() => {
      res.status(201).send({ message: "Thank you for your order!" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "Something went wrong!" });
    });
}

function updateItemImage(req, res) {
  console.log("Update image route");
  const { itemName, image } = req.body;

  console.log(itemName, image);

  if (!isImage(image))
    return res
      .status(400)
      .send({ message: "Image file provided is not an image!" });

  itemService
    .updateItemImage(itemName, image)
    .then((result) => {
      if (result.changedRows === 1) {
        res.status(200).send({ message: "The image was updated!" });
      } else {
        res.status(400).send({
          message:
            "The image was not updated! Make sure the item exists in the shop!",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        message: "Something went wrong! Please try again!",
      });
    });
}

function isImage(image) {
  const dataPart = image.split(",")[0];

  return (
    dataPart === "data:image/png;base64" ||
    dataPart === "data:image/jpg;base64" ||
    dataPart === "data:image/jpeg;base64"
  );
}

function escapeSearchInput(searchInput) {
  return searchInput.replaceAll("%", "\\%").replaceAll("_", "\\_");
}

export default {
  getItems,
  searchItems,
  addItem,
  purchaseItems,
  updateItemImage,
};
