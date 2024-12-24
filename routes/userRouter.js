import express from "express";
import { authenticateToken } from "../index.js"; 
import { getUser, postUser, putUser, deleteUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUser);
router.post("/login", loginUser);
router.post("/signup", postUser);
router.put("/", authenticateToken, putUser);
router.delete("/", authenticateToken, deleteUser);

export default router;
