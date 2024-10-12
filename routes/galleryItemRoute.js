import express from "express";
import { authenticateToken, createGalleryItem, getGalleryItem } from "../controllers/galleryItemController.js";



const galleryItemRouter = express.Router();

galleryItemRouter.post("/",authenticateToken, createGalleryItem);
galleryItemRouter.get("/",getGalleryItem);

export default galleryItemRouter;