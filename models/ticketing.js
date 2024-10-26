import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
    unique: true
  },
  bookingId: {
    type: String,
    required: true,
    ref: "Booking"
  },
  issueType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: "Open"
  },
  priority: {
    type: String,
    required: true,
    enum: ["Low", "Medium", "High"]
  },
  assignedTo: {
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    default: Date.now
  }
});

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
