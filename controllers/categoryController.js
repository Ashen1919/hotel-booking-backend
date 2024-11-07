import Category from "../models/category.js";
import dotenv from 'dotenv';
import { isValidAdmin } from "./userController.js";
dotenv.config();


export function addCategory(req,res){
    if(!isValidAdmin){
        return res.status(403).json({
            message : "Unauthorized"
            
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
    if(!isValidAdmin){
        return res.status(403).json({
            message : "Unauthorized"
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

export function deleteCategoryByParams(req,res){
    if(!isValidAdmin){
        return res.status(403).json({
            message : "Unauthorized"
        })
    }

    const name = req.params.name

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

export function deleteCategory(req,res){
    if(!isValidAdmin(req)){
        return res.status(403).json({
            message : "Unauthorized"
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
            categories : categoryList
        })
    }).catch((err)=>{
        res.status(500).json({
            message : "Failed to get categories"
        })
    })
}

export function getCategoryByName(req, res) {
    const name = req.params.name;
    Category.findOne({ name: name }).then((result) => {
        if (result == null) {
            res.status(404).json({
                message: "Category not found"
            });
        } else {
            res.status(200).json({
                category: result
            });
        }
    }).catch(() => {
        res.status(500).json({
            message: "Failed to get category"
        });
    });
}




