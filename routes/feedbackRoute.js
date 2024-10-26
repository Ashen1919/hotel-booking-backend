import express from "express";
import { authenticateToken } from "../index.js";
import { approveFeedback, createFeedback, getApprovedFeedback } from "../controllers/feedBackController.js";

const feedbackRouter = express.Router()

feedbackRouter.post("/", createFeedback)
feedbackRouter.get("/", authenticateToken, getApprovedFeedback)
feedbackRouter.put("/", authenticateToken, approveFeedback)

export default feedbackRouter;