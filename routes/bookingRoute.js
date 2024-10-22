import express from "express"
import { authenticateToken } from "../index.js";
import { createBooking, getBooking } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", authenticateToken, createBooking )
bookingRouter.get("/", getBooking)

export default bookingRouter;