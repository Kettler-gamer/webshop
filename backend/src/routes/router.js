import express from "express";
import userController from "../controllers/userController.js";
import userFilters from "../filters/userFilters.js";
import loginController from "../controllers/loginController.js";
import jwtFilter from "../filters/jwtFilter.js";
import itemController from "../controllers/itemController.js";
import purchaseFilter from "../filters/purchaseFilter.js";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router.post(
  "/createuser",
  userFilters.createUserFilter,
  userController.createUser
);
router.post("/auth/login", loginController.login);
router.get("/items/getitems", itemController.getItems);
router.get("/items/searchitems", itemController.searchItems);

router.use(jwtFilter.checkToken);

router.post(
  "/items/purchase",
  purchaseFilter.checkItemQuantity,
  itemController.purchaseItems
);

router.get("/getorders", orderController.getOrders);

router.use(jwtFilter.isAdmin);

router.get("/getusers", userController.getUsers);
router.post("/items/additem", itemController.addItem);

export default router;
