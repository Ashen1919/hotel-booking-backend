import GalleryItem from "../models/galleryItems.js"
import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    jwt.verify(token, "secret", (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = user;  
        next();  
    });
}

export function createGalleryItem(req,res){
    const user = req.user
    if(user == null){
        res.status(403).json({
            message : "Login First to add gallery item"
        })
        return
    }
    
    if(user.type != "admin"){
        res.status(403).json({
            message : "You don't have permission to create gallery item"
        })
        return
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