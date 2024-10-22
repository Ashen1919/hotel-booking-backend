import express from "express"
import { authenticateToken } from "../index.js";
import { cancelBooking, createBooking, getBooking } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", authenticateToken, createBooking)
bookingRouter.get("/", getBooking)
bookingRouter.put("/", authenticateToken, cancelBooking)

export default bookingRouter;