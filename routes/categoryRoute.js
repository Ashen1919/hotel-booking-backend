import express from 'express'
import { addCategory,deleteCategory, getCategory, updateCategory } from "../controllers/categoryController.js";
import { authenticateToken } from "../index.js";

const categoryRouter = express.Router();

categoryRouter.post('/', authenticateToken, addCategory);
categoryRouter.get('/', getCategory);
categoryRouter.put('/',authenticateToken, updateCategory)
categoryRouter.delete('/',authenticateToken, deleteCategory)

export default categoryRouter;