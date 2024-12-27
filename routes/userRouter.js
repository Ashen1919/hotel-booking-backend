import express from "express";
import { authenticateToken } from "../index.js"; 
import { getUser, postUser, putUser, deleteUser, loginUser, findByEmail } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUser);
router.get("/:email", findByEmail);
router.post("/login", loginUser);
router.post("/signup", postUser);
router.put("/", authenticateToken, putUser);
router.delete("/:email", deleteUser);

export default router;
