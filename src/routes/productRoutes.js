import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productControllers.js';
import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

export const productRoutes = express.Router();

productRoutes.get('/', getAllProducts);
productRoutes.get('/search', getAllProducts);
productRoutes.get('/:id', getProductById);
productRoutes.post('/', verifyToken, createProduct)
productRoutes.put('/:id', verifyToken, updateProduct);
productRoutes.delete('/:id', verifyToken, deleteProduct);

