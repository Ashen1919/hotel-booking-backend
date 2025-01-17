import express from "express";
import {createGalleryItem, deleteGalleryItem, getGalleryItem, updateGalleryItem } from "../controllers/galleryItemController.js";
import { authenticateToken } from "../index.js";


const galleryItemRouter = express.Router();

galleryItemRouter.post("/",authenticateToken, createGalleryItem);
galleryItemRouter.get("/",getGalleryItem);
galleryItemRouter.put("/:name",authenticateToken, updateGalleryItem);
galleryItemRouter.delete("/:name",authenticateToken, deleteGalleryItem);

export default galleryItemRouter;