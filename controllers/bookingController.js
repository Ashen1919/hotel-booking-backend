import Booking from "../models/booking.js";
import { isValidAdmin, isValidCustomer } from "./userController.js";


export function createBooking(req,res){

    const startingId = 1001;
    const roomId = req.body.roomId

    Booking.findOne({roomId: roomId, status: "Confirmed"}).then((existBooking)=>{
        if(existBooking){
            return res.status(400).json({
                message: "This room is already Booked"
            })
        }
        Booking.countDocuments({}).then((count)=>{
            const newId = startingId + count + 1;
            const newBooking = new Booking({
                bookingId : newId,
                roomId : req.body.roomId,
                email : req.body.email,
                start : req.body.start,
                end : req.body.end
            })
            newBooking.save().then((result)=>{
                res.status(200).json({
                    message : "Booking created successfully",
                    result : result
                })
            }).catch((err)=>{
                res.status(500).json({
                    message : "Booking creation failed",
                    error : err
                })
            })
        }).catch((err)=>{
            res.status(500).json({
                message : "Booking creation failed",
                Error : err
            })
        })
    }).catch((err)=>{
        res.status(500).json({
            message: "Error checking room availability",
            Error: err
        })
    })
    
}

export function getBooking(req,res){
    Booking.find().then((getBooking)=>{
        res.status(200).json({
            List : getBooking
        })
    }).catch((err)=>{
        res.status(500).json({
            message : "Failed to get Booking List",
            Error : err
        })
    })

}

export function getBookingByEmail(req,res){
    const email = req.params.email

    Booking.find({email: email}).then((getBooking)=>{
        res.status(200).json({
            List : getBooking
        })
    }).catch((err)=>{
        res.status(500).json({
            message : "Failed to get Booking List",
            Error : err
        })
    })

}

export function cancelBooking(req,res){
    const bookingId = req.body.bookingId

    Booking.findOne({bookingId : bookingId}).then((booking)=>{
        if(!booking){
            res.status(404).json({
                message : "Booking Not Found"
            })
        }
        
        const updatedBooking = {status: "Cancel"}
        

        Booking.updateOne({bookingId: bookingId}, {$set: updatedBooking}).then((updateBooking)=>{
            res.status(200).json({
                message : "Booking cancelled succesfully",
                Booking : updateBooking
            })
        }).catch((err)=>{
            res.status(500).json({
                message : "Failed to cancel Booking",
                Error : err
            })
        })
    }).catch((err)=>{
        res.status(500).json({
            message : "Failed to Find",
            Error : err
        })
    })
}

export function updateBooking(req,res){
    const bookingId = req.params.bookingId
    Booking.findOne({bookingId: bookingId}).then((booking)=>{
        if(!booking){
            return res.status(404).json({
                message: "Booking Not Found"
            })
        }
        const updatedBooking = req.body
        Booking.updateOne({bookingId: bookingId}, {$set: updatedBooking}).then(()=>{
            res.status(200).json({
                message: "Booking updated successfully"
            })
        }).catch((err)=>{
            res.status(500).json({
                message: "Failed to cancel booking",
                Error: err
            })
        })
    }).catch((err)=>{
        res.status(404).json({
            message: "Failed to find",
            Error: err
        })
    })
}
export function confirmBooking(req,res){
    const {bookingId, roomId} = req.params
   
    Booking.findOne({ bookingId: bookingId, roomId: roomId} ).then((booking)=>{
        if(!booking){
            return res.status(404).json({
                message: "Booking Not Found"
            })
        }
        const updatedBooking = {status: "Confirmed"}
        Booking.updateOne({bookingId: bookingId}, {$set: updatedBooking}).then(()=>{
            res.status(200).json({
                message: "Booking confirmed successfully"
            })
        }).catch((err)=>{
            res.status(500).json({
                message: "Failed to confirm booking",
                Error: err
            })
        })
    }).catch((err)=>{
        res.status(404).json({
            message: "Failed to find",
            Error: err
        })
    })
}