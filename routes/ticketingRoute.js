import express from 'express'
import { authenticateToken } from "../index.js";
import { createTicket, getAllTickets, updateTicket } from '../controllers/ticketingController.js';

const ticketingRouter = express.Router()

ticketingRouter.post("/", createTicket)
ticketingRouter.get("/", authenticateToken, getAllTickets)
ticketingRouter.put("/", updateTicket)

export default ticketingRouter