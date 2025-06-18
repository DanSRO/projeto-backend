import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/categoryControllers.js';
import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

export const categoryRoutes = express.Router();

categoryRoutes.get('/', getAllCategories);
categoryRoutes.get('/search', getAllCategories);
categoryRoutes.get('/:id', getCategoryById);
categoryRoutes.post('/', verifyToken, createCategory)
categoryRoutes.put('/:id', verifyToken, updateCategory);
categoryRoutes.delete('/:id', verifyToken, deleteCategory);

