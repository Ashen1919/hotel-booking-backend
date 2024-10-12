import Category from "../models/category.js";
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

export function addCategory(req,res){
    const user = req.user
    if(user == null){
        return res.status(403).json({
            message : "Login first to add category"
        })
    }
    if(user.type != "admin"){
        return res.status(403).json({
            message : "You don't have permission to add category"
        })
    }
    const category = req.body
    const newCategory = new Category(category);

    newCategory.save().then(()=>{
        res.status(200).json({
            message : "New category added successfully"
        })
    }).catch(()=>{
        res.status(500).json({
            message : "Failed to create new category"
        })
    })

}

export function getCategory(req,res){
    Category.find().then((categoryList)=>{
        res.status(200).json({
            list : categoryList
        })
    })
}

