import express from 'express'
import { createRoom, deleteRoom, findRoomByCategory, findRoomById, getRooms, updateRoom } from '../controllers/roomController.js';
import { authenticateToken } from '../index.js';

const roomRouter = express.Router();

roomRouter.post("/", authenticateToken, createRoom)
roomRouter.delete("/:roomId",authenticateToken, deleteRoom)
roomRouter.get("/", getRooms)
roomRouter.get("/byCategory/:category", findRoomByCategory)
roomRouter.get("/:roomId", findRoomById)
roomRouter.put("/:roomId", authenticateToken, updateRoom)

export default roomRouter;
