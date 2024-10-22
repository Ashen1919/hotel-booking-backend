import Booking from "../models/booking.js";
import { isValidAdmin, isValidCustomer } from "./userController.js";


export function createBooking(req,res){
    if(!isValidCustomer(req)){
        return res.status(403).json({
            message : "Unauthorized"
        })
    }
    const startingId = 1001;
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