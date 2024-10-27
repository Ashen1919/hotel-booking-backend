import express from 'express'
import { authenticateToken } from "../index.js";
import { closeTicket, createTicket, getAllTickets, updateTicket } from '../controllers/ticketingController.js';

const ticketingRouter = express.Router()

ticketingRouter.post("/", createTicket)
ticketingRouter.get("/", authenticateToken, getAllTickets)
ticketingRouter.put("/", authenticateToken, updateTicket)
ticketingRouter.put("/:ticketId", authenticateToken, closeTicket)

export default ticketingRouter