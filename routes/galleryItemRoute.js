import express from "express";
import {createGalleryItem, getGalleryItem } from "../controllers/galleryItemController.js";
import { authenticateToken } from "../index.js";


const galleryItemRouter = express.Router();

galleryItemRouter.post("/",authenticateToken, createGalleryItem);
galleryItemRouter.get("/",getGalleryItem);

export default galleryItemRouter;