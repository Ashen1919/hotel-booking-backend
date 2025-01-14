import mongoose from "mongoose";


const bookingSchema = mongoose.Schema({
    bookingId : {
        type : Number,
        required : true,
        unique : true
    },
    roomId : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true,
        default : "Pending"
    },
    reason : {
        type : String,
        default : ""
    },
    start : {
        type : Date,
        required : true
    },
    end : {
        type : Date,
        required : true
    },
    notes : {
        type : String,
        default : ""
    },
    timeStamp : {
        type : Date,
        default : Date.now
    },
    maxGuests : {
        type : Number
    }
})

const Booking = mongoose.model("booking", bookingSchema)

export default Booking;