import express from 'express'
import { addCategory, authenticateToken, deleteCategory, getCategory, updateCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post('/', authenticateToken, addCategory);
categoryRouter.get('/', getCategory);
categoryRouter.put('/',authenticateToken, updateCategory)
categoryRouter.delete('/',authenticateToken, deleteCategory)

export default categoryRouter;