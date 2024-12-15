import express from "express";
import { authenticateToken } from "../index.js";
import { approveFeedback, createFeedback, deleteFeedbackByParams, getApprovedFeedback } from "../controllers/feedBackController.js";

const feedbackRouter = express.Router()

feedbackRouter.post("/", createFeedback)
feedbackRouter.get("/", getApprovedFeedback)
feedbackRouter.put("/", authenticateToken, approveFeedback)
feedbackRouter.delete("/:feedbackId", authenticateToken, deleteFeedbackByParams)

export default feedbackRouter;