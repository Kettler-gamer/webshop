import express from "express";
import userController from "../controllers/userController.js";
import jwtUtil from "../utils/jwtUtil.js";

const router = express.Router();

router.get("/test", (req, res) => res.send("Hello World!"));

router.get("/getusers", userController.getUsers);

export default router;
