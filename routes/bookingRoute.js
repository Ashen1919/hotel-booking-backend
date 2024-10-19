import express from "express"
import { authenticateToken } from "../index.js";
import { createBooking } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", authenticateToken, createBooking )

export default bookingRouter;