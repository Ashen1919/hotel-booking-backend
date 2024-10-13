import Category from "../models/category.js";
import dotenv from 'dotenv';
dotenv.config();


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

export function updateCategory(req,res){
    const user = req.user
    if(user == null){
        return res.status(403).json({
            message : "Login first to update category"
        })
    }
    if(user.type != "admin"){
        return res.status(403).json({
            message : "You don't have permission to update category"
        })
    }
    const name = req.body.name
    const updatedFields = {};

    
    if (req.body.description) {
        updatedFields.description = req.body.description;
    }
    if (req.body.price) {
        updatedFields.price = req.body.price;
    }

    Category.updateOne({ name: name }, { $set: updatedFields }).then(()=>{
        res.status(200).json({
            message : "Category updated successfully"
        })
    }).catch(()=>{
        res.status(500).json({
            message : "Failed to update the category"
        })
    })

}

export function deleteCategory(req,res){
    const user = req.user
    if(user == null){
        return res.status(403).json({
            message : "Login first to delete category"
        })
    }
    if(user.type != "admin"){
        return res.status(403).json({
            message : "You don't have permission to delete category"
        })
    }

    const name = req.body.name

    Category.deleteOne({name : name}).then(()=>{
        res.status(200).json({
            message : "Category deleted successfully"
        })
    }).catch(()=>{
        res.status(500).json({
            message : "Failed to delete category"
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



