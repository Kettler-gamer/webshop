import express from "express";
import userController from "../controllers/userController.js";
import userFilters from "../filters/userFilters.js";
import loginController from "../controllers/loginController.js";
import jwtFilter from "../filters/jwtFilter.js";
import itemController from "../controllers/itemController.js";
import purchaseFilter from "../filters/purchaseFilter.js";
import orderController from "../controllers/orderController.js";
import limiter from "../filters/rateLimit.js";

const router = express.Router();

router.post(
  "/createuser",
  userFilters.createUserFilter,
  userController.createUser
);
router.post("/auth/login", limiter, loginController.login);
router.get("/items/getitems", itemController.getItems);
router.get("/items/searchitems", itemController.searchItems);

router.use(limiter, jwtFilter.checkToken);

router.post(
  "/items/purchase",
  purchaseFilter.checkItemQuantity,
  itemController.purchaseItems
);

router.get("/getorders", orderController.getOrders);

router.use(jwtFilter.isAdmin);

router.get("/getusers", userController.getUsers);
router.post("/items/additem", itemController.addItem);
router.patch("/items/updateitemimage", itemController.updateItemImage);

export default router;
