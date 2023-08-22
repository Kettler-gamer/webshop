import express from "express";
import userController from "../controllers/userController.js";
import userFilters from "../filters/userFilters.js";
import loginController from "../controllers/loginController.js";
import jwtFilter from "../filters/jwtFilter.js";
import itemController from "../controllers/itemController.js";

const router = express.Router();

router.post(
  "/createuser",
  userFilters.createUserFilter,
  userController.createUser
);
router.post("/auth/login", loginController.login);

router.use(jwtFilter.checkToken);

router.use(jwtFilter.isAdmin);
router.get("/getusers", userController.getUsers);
router.post("/items/additem", itemController.addItem);

export default router;
