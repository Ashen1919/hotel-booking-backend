import express from 'express'
import { addCategory, authenticateToken, getCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post('/', authenticateToken, addCategory);
categoryRouter.get('/', getCategory);

export default categoryRouter;