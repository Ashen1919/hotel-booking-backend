import Room from "../models/room.js";
import { isValidAdmin } from "./userController,js";


export function createRoom(req,res){
    if(!isValidAdmin(req)){
        return res.status(403).json({
            message : "Unauthorized"
        })
    }
    const newRoom = newRoom(req.body)
    newRoom.save().then((result)=>{
        res.status(200).json({
            message : "New Room created successfully",
            result : result
        })
    }).catch((err)=>{
        res.status(500).json({
            message : "Failed to create Room",
            error : err
        })
    })
}

export function deleteRoom(req,res){
    if(!isValidAdmin(req)){
        return res.status(403).json({
            message : "Unauthorized"
        })
    }
    const roomId = req.params.roomId
    Room.findOneAndDelete({roomId : roomId}).then(()=>{
        res.status(200).json({
            message : "Room deleted successfully"
        })
    }).catch(()=>{
        res.status(500).json({
            message : "Failed to delete room"
        })
    })
}

export function findRoomById(req,res){
    const roomId = req.params.roomId
    Room.findOne({roomId : roomId}).then((result)=>{
        if(result == null){
            return res.status(404).json({
                message : "Room not found"
            })
        }else{
            res.status(200).json({
                message : "Room found",
                result : result
            })
        }
    }).catch((err)=>{
        res.status(500).json({
            message : "Room search fail",
            error : err
        })
    })
}

export function getRooms(req,res){
    Room.find().then((result)=>{
        res.status(200).json({
            message : "Room Found",
            result : result
        })
    }).catch((err)=>{
        res.status(500).json({
            message : "Room not found",
            error : err
        })
    })
}

export function updateRoom(req,res){
    const roomId = req.params.roomId
    Room.findByIdAndUpdate({roomId : roomId},req.body).then((result)=>{
        res.status(200).json({
            message : "Updated Successfully",
            result : result
        })
    }).catch((err)=>{
        res.status(500).json({
            message : "Failed to update",
            error : err
        })
    })
}

