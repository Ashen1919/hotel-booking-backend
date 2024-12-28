import express from "express"
import { authenticateToken } from "../index.js";
import { cancelBooking, confirmBooking, createBooking, getBooking, getBookingByEmail, updateBooking } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/",createBooking)
bookingRouter.get("/", getBooking)
bookingRouter.get("/:email", getBookingByEmail)
bookingRouter.put("/", authenticateToken, cancelBooking)
bookingRouter.put("/:bookingId", authenticateToken, updateBooking)
bookingRouter.put("/:bookingId/:roomId", authenticateToken, confirmBooking)

export default bookingRouter;