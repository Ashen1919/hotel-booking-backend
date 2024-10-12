import express from "express";
import { getUser, postUser, putUser, deleteUser, loginUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getUser);

userRouter.post("/", postUser);

userRouter.put("/", putUser);

userRouter.delete("/", deleteUser);

userRouter.post("/login", loginUser)

export default userRouter;
