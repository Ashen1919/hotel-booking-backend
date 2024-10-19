import GalleryItem from "../models/galleryItems.js"
import { isValidAdmin } from "./userController.js"


export function createGalleryItem(req,res){
    if(!isValidAdmin(req)){
        return res.status(403).json({
            message : "Unauthorized"
        })
    }
    const galleryItem = req.body
    const newGalleryItem = new GalleryItem(galleryItem)

    newGalleryItem.save().then(()=>{
        res.json({
            message : "Gallery Item creation successfully"
        }).catch(()=>{
            res.status(500).json({
                message : "Gallery Item creation failed"
            })
        })
    })
}

export function getGalleryItem(req,res){
    GalleryItem.find().then((list)=>{
        res.json({
            list : list
        })
    })
}

export function updateGalleryItem(req,res){
    if(!isValidAdmin(req)){
        return res.status(403).json({
            message : "Unauthorized"
        })
    }
    const name = req.body.name
    const updatedFields = {};

    
    if (req.body.description) {
        updatedFields.description = req.body.description;
    }
    if (req.body.image) {
        updatedFields.image = req.body.image;
    }

    GalleryItem.updateOne({ name: name }, { $set: updatedFields }).then(()=>{
        res.status(200).json({
            message : "Gallery Item updated successfully"
        })
    }).catch(()=>{
        res.status(500).json({
            message : "Failed to update the Gallery Item"
        })
    })
}

export function deleteGalleryItem(req,res){
    if(!isValidAdmin(req)){
        return res.status(403).json({
            message : "Unauthorized"
        })
    }
    GalleryItem.deleteOne({name : name}).then(()=>{
        res.status(200).json({
            message : "Gallery Item deleted successfully"
        })
    }).catch(()=>{
        res.status(500).json({
            message : "Failed to delete Gallery Item"
        })
    })
}