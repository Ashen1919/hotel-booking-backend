import Ticket from "../models/ticketing.js";
import { isValidAdmin, isValidCustomer } from "./userController.js";

export function createTicket(req, res) {

    if(!isValidCustomer(req)){
      return res.status(403).json({
        message : "Unauthorized"
      })
    }
    const ticket = req.body;
    const newTicket = new Ticket(ticket);
  
    newTicket.save().then(() =>{
         res.status(200).json({
             message: "Ticket created successfully" 
            })
        }).catch(err => {
            res.status(500).json({ 
                message: "Failed to create a ticket", 
                error: err 
            })
        })
}

export function getAllTickets(req, res) {
    if(!isValidAdmin(req)){
        return res.status(403).json({
            message : "Unauthorized"
        })
    }
    const filters = req.query;
  
    Ticket.find(filters)
      .then(tickets => res.status(200).json(tickets))
      .catch(err => res.status(500).json({ message: "Failed to retrieve tickets", error: err }));
  }

  export function updateTicket(req, res) {
    if(!isValidCustomer(req)){
      return res.status(403).json({
        message : "Unauthorized"
      })
    }
    const ticketId = req.body.ticketId;
    const updatedFields = req.body;
  
    Ticket.updateOne({ticketId : ticketId} ,{ $set: updatedFields })
      .then(ticket => {
        if (!ticket) {
          return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket updated successfully", ticket });
      })
      .catch(err => res.status(500).json({ message: "Failed to update ticket", error: err }));
  }
  
  export function closeTicket(req, res) {
    if(!isValidCustomer(req)){
      return res.status(403).json({
        message : "Unauthorized"
      })
    }
    const ticketId = req.params.ticketId;
    const updatedField = { status: "Closed" }
  
    Ticket.updateOne({ticketId: ticketId}, {$set: updatedField}).then(ticket => {
        if (!ticket) {
          return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket closed successfully", ticket });
      })
      .catch(err => res.status(500).json({ message: "Failed to close ticket", error: err }));
  }
  
  