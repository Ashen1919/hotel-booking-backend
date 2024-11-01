import express from "express";
import { authenticateToken } from "../index.js"; 
import { getUser, postUser, putUser, deleteUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", authenticateToken, getUser);
router.post("/login", loginUser);
router.post("/", postUser);
router.put("/", authenticateToken, putUser);
router.delete("/", authenticateToken, deleteUser);

export default router;
