import express from 'express'
import { addCategory,deleteCategory, deleteCategoryByParams, getCategory, getCategoryByName, updateCategory } from "../controllers/categoryController.js";
import { authenticateToken } from "../index.js";

const categoryRouter = express.Router();

categoryRouter.post('/', authenticateToken, addCategory);
categoryRouter.get('/', getCategory);
categoryRouter.get('/:name',getCategoryByName)
categoryRouter.put('/:name',authenticateToken, updateCategory)
categoryRouter.delete('/:name',authenticateToken, deleteCategoryByParams)
categoryRouter.delete('/',authenticateToken, deleteCategory) 

export default categoryRouter;