import express from 'express'
import { addCategory, authenticateToken, getCategory, updateCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post('/', authenticateToken, addCategory);
categoryRouter.get('/', getCategory);
categoryRouter.put('/',authenticateToken, updateCategory)

export default categoryRouter;