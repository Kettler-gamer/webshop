import express from "express";
import userController from "../controllers/userController.js";
import userFilters from "../filters/userFilters.js";

const router = express.Router();

router.post(
  "/createuser",
  userFilters.createUserFilter,
  userController.createUser
);

router.post("/auth/login");

router.get("/getusers", userController.getUsers);

export default router;
